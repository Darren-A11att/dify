from typing import List, Dict, Any

from core.tools.entities.tool_entities import ToolProviderType, \
      ToolParameter, ToolProviderCredentials, ToolDescription, ToolProviderIdentity
from core.tools.provider.tool_provider import ToolProviderController
from core.tools.errors import ToolNotFoundError
from core.tools.tool.model_tool import ModelTool
from core.tools.tool.tool import Tool
from core.tools.entities.tool_entities import ToolIdentity, ModelToolPropertyKey
from core.tools.utils.configuration import ModelToolConfigurationManager
from core.tools.entities.common_entities import I18nObject
from core.model_runtime.entities.model_entities import ModelType, ModelFeature
from core.entities.model_entities import ModelStatus
from core.provider_manager import ProviderManager, ProviderConfiguration, ProviderModelBundle
from core.model_manager import ModelInstance
from core.errors.error import ProviderTokenNotInitError

class ModelToolProviderController(ToolProviderController):
    configuration: ProviderConfiguration = None
    is_active: bool = False

    def __init__(self, configuration: ProviderConfiguration = None, **kwargs):
        """
            init the provider

            :param data: the data of the provider
        """
        super().__init__(**kwargs)
        self.configuration = configuration

    @staticmethod
    def from_db(configuration: ProviderConfiguration = None) -> 'ModelToolProviderController':
        """
            init the provider from db

            :param configuration: the configuration of the provider
        """
        # check if all models are active
        if configuration is None:
            return None
        is_active = True
        models = configuration.get_provider_models()
        for model in models:
            if model.status != ModelStatus.ACTIVE:
                is_active = False
                break

        # get the provider configuration
        model_tool_configuration = ModelToolConfigurationManager.get_configuration(configuration.provider.provider)
        if model_tool_configuration is None:
            raise RuntimeError(f'no configuration found for provider {configuration.provider.provider}')

        # override the configuration
        if model_tool_configuration.label:
            if model_tool_configuration.label.en_US:
                configuration.provider.label.en_US = model_tool_configuration.label.en_US
            if model_tool_configuration.label.zh_Hans:
                configuration.provider.label.zh_Hans = model_tool_configuration.label.zh_Hans

        return ModelToolProviderController(
            is_active=is_active,
            identity=ToolProviderIdentity(
                author='Dify',
                name=configuration.provider.provider,
                description=I18nObject(
                    zh_Hans=f'{configuration.provider.label.zh_Hans} 模型能力提供商', 
                    en_US=f'{configuration.provider.label.en_US} model capability provider'
                ),
                label=I18nObject(
                    zh_Hans=configuration.provider.label.zh_Hans,
                    en_US=configuration.provider.label.en_US
                ),
                icon=configuration.provider.icon_small.en_US,
            ),
            configuration=configuration,
            credentials_schema={},
        )
    
    @staticmethod
    def is_configuration_valid(configuration: ProviderConfiguration) -> bool:
        """
            check if the configuration has a model can be used as a tool
        """
        models = configuration.get_provider_models()
        for model in models:
            if model.model_type == ModelType.LLM and ModelFeature.VISION in (model.features or []):
                return True
        return False

    def _get_model_tools(self, tenant_id: str = None) -> List[ModelTool]:
        """
            returns a list of tools that the provider can provide

            :return: list of tools
        """
        tenant_id = tenant_id or 'ffffffff-ffff-ffff-ffff-ffffffffffff'
        provider_manager = ProviderManager()
        if self.configuration is None:
            configurations = provider_manager.get_configurations(tenant_id=tenant_id).values()
            self.configuration = next(filter(lambda x: x.provider == self.identity.name, configurations), None)
        # get all tools
        tools: List[ModelTool] = []
        # get all models
        if not self.configuration:
            return tools
        configuration = self.configuration

        provider_configuration = ModelToolConfigurationManager.get_configuration(configuration.provider.provider)
        if provider_configuration is None:
            raise RuntimeError(f'no configuration found for provider {configuration.provider.provider}')

        for model in configuration.get_provider_models():
            model_configuration = ModelToolConfigurationManager.get_model_configuration(self.configuration.provider.provider, model.model)
            if model_configuration is None:
                continue

            if model.model_type == ModelType.LLM and ModelFeature.VISION in (model.features or []):
                provider_instance = configuration.get_provider_instance()
                model_type_instance = provider_instance.get_model_instance(model.model_type)
                provider_model_bundle = ProviderModelBundle(
                    configuration=configuration,
                    provider_instance=provider_instance,
                    model_type_instance=model_type_instance
                )

                try:
                    model_instance = ModelInstance(provider_model_bundle, model.model)
                except ProviderTokenNotInitError:
                    model_instance = None
                
                tools.append(ModelTool(
                    identity=ToolIdentity(
                        author='Dify',
                        name=model.model,
                        label=model_configuration.label,
                    ),
                    parameters=[
                        ToolParameter(
                            name=ModelToolPropertyKey.IMAGE_PARAMETER_NAME.value,
                            label=I18nObject(zh_Hans='图片ID', en_US='Image ID'),
                            human_description=I18nObject(zh_Hans='图片ID', en_US='Image ID'),
                            type=ToolParameter.ToolParameterType.STRING,
                            form=ToolParameter.ToolParameterForm.LLM,
                            required=True,
                            default=Tool.VARIABLE_KEY.IMAGE.value
                        )
                    ],
                    description=ToolDescription(
                        human=I18nObject(zh_Hans='图生文工具', en_US='Convert image to text'),
                        llm='Vision tool used to extract text and other visual information from images, can be used for OCR, image captioning, etc.',
                    ),
                    is_team_authorization=model.status == ModelStatus.ACTIVE,
                    tool_type=ModelTool.ModelToolType.VISION,
                    model_instance=model_instance,
                    model=model.model,
                ))

        self.tools = tools
        return tools
    
    def get_credentials_schema(self) -> Dict[str, ToolProviderCredentials]:
        """
            returns the credentials schema of the provider

            :return: the credentials schema
        """
        return {}

    def get_tools(self, user_id: str, tenant_id: str) -> List[ModelTool]:
        """
            returns a list of tools that the provider can provide

            :return: list of tools
        """
        return self._get_model_tools(tenant_id=tenant_id)
    
    def get_tool(self, tool_name: str) -> ModelTool:
        """
            get tool by name

            :param tool_name: the name of the tool
            :return: the tool
        """
        if self.tools is None:
            self.get_tools(user_id='', tenant_id=self.configuration.tenant_id)

        for tool in self.tools:
            if tool.identity.name == tool_name:
                return tool

        raise ValueError(f'tool {tool_name} not found')

    def get_parameters(self, tool_name: str) -> List[ToolParameter]:
        """
            returns the parameters of the tool

            :param tool_name: the name of the tool, defined in `get_tools`
            :return: list of parameters
        """
        tool = next(filter(lambda x: x.identity.name == tool_name, self.get_tools()), None)
        if tool is None:
            raise ToolNotFoundError(f'tool {tool_name} not found')
        return tool.parameters

    @property
    def app_type(self) -> ToolProviderType:
        """
            returns the type of the provider

            :return: type of the provider
        """
        return ToolProviderType.MODEL
    
    def validate_credentials(self, credentials: Dict[str, Any]) -> None:
        """
            validate the credentials of the provider

            :param tool_name: the name of the tool, defined in `get_tools`
            :param credentials: the credentials of the tool
        """
        pass

    def _validate_credentials(self, credentials: Dict[str, Any]) -> None:
        """
            validate the credentials of the provider

            :param tool_name: the name of the tool, defined in `get_tools`
            :param credentials: the credentials of the tool
        """
        pass