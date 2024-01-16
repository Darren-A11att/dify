import type { FC } from 'react'
import type { ModelAndParameter } from '../types'
import { Chat } from '@/app/components/base/chat'
import { useChat } from '@/app/components/base/chat/hooks'
import { useDebugConfigurationContext } from '@/context/debug-configuration'
import type {
  ChatConfig,
  OnSend,
} from '@/app/components/base/chat/types'
import { useEventEmitterContextContext } from '@/context/event-emitter'
import { useProviderContext } from '@/context/provider-context'
import {
  fetchConvesationMessages,
  fetchSuggestedQuestions,
  stopChatMessageResponding,
} from '@/service/debug'
import { promptVariablesToUserInputsForm } from '@/utils/model-config'
import Avatar from '@/app/components/base/avatar'
import { useAppContext } from '@/context/app-context'
import { ModelFeatureEnum } from '@/app/components/header/account-setting/model-provider-page/declarations'

type ChatItemProps = {
  modelAndParameter: ModelAndParameter
}
const ChatItem: FC<ChatItemProps> = ({
  modelAndParameter,
}) => {
  const { userProfile } = useAppContext()
  const {
    isAdvancedMode,
    modelConfig,
    appId,
    inputs,
    promptMode,
    speechToTextConfig,
    introduction,
    suggestedQuestionsAfterAnswerConfig,
    citationConfig,
    moderationConfig,
    externalDataToolsConfig,
    chatPromptConfig,
    completionPromptConfig,
    dataSets,
    datasetConfigs,
    visionConfig,
    annotationConfig,
  } = useDebugConfigurationContext()
  const { textGenerationModelList } = useProviderContext()
  const contextVar = modelConfig.configs.prompt_variables.find(item => item.is_context_var)?.key
  const config: ChatConfig = {
    pre_prompt: !isAdvancedMode ? modelConfig.configs.prompt_template : '',
    prompt_type: promptMode,
    chat_prompt_config: isAdvancedMode ? chatPromptConfig : {},
    completion_prompt_config: isAdvancedMode ? completionPromptConfig : {},
    user_input_form: promptVariablesToUserInputsForm(modelConfig.configs.prompt_variables),
    dataset_query_variable: contextVar || '',
    opening_statement: introduction,
    more_like_this: {
      enabled: false,
    },
    suggested_questions_after_answer: suggestedQuestionsAfterAnswerConfig,
    speech_to_text: speechToTextConfig,
    retriever_resource: citationConfig,
    sensitive_word_avoidance: moderationConfig,
    external_data_tools: externalDataToolsConfig,
    agent_mode: {
      enabled: true,
      tools: [...dataSets.map(({ id }) => ({
        dataset: {
          enabled: true,
          id,
        },
      }))],
    },
    dataset_configs: datasetConfigs,
    file_upload: {
      image: visionConfig,
    },
    annotation_reply: annotationConfig,
  }
  const {
    chatList,
    isResponsing,
    handleSend,
    suggestedQuestions,
    handleRestart,
  } = useChat(
    config,
    [],
    taskId => stopChatMessageResponding(appId, taskId),
  )

  const doSend: OnSend = (message, files) => {
    const currentProvider = textGenerationModelList.find(item => item.provider === modelAndParameter.provider)
    const currentModel = currentProvider?.models.find(model => model.model === modelAndParameter.model)
    const supportVision = currentModel?.features?.includes(ModelFeatureEnum.vision)

    const configData = {
      ...config,
      model: {
        provider: modelAndParameter.provider,
        name: modelAndParameter.model,
        mode: currentModel?.model_properties.mode,
        completion_params: modelAndParameter.parameters,
      },
    }

    const data: any = {
      query: message,
      inputs,
      model_config: configData,
    }

    if (visionConfig.enabled && files?.length && supportVision)
      data.files = files

    handleSend(
      `apps/${appId}/chat-messages`,
      data,
      {
        onGetConvesationMessages: (conversationId, getAbortController) => fetchConvesationMessages(appId, conversationId, getAbortController),
        onGetSuggestedQuestions: (responseItemId, getAbortController) => fetchSuggestedQuestions(appId, responseItemId, getAbortController),
      },
    )
  }

  const { eventEmitter } = useEventEmitterContextContext()
  eventEmitter?.useSubscription((v: any) => {
    if (v.type === 'app-chat-with-multiple-model')
      doSend(v.payload.message, v.payload.files)
    if (v.type === 'app-chat-with-multiple-model-restart')
      handleRestart()
  })

  return (
    <Chat
      config={config}
      chatList={chatList}
      isResponsing={isResponsing}
      noChatInput
      className='p-4'
      suggestedQuestions={suggestedQuestions}
      onSend={doSend}
      showPromptLog
      questionIcon={<Avatar name={userProfile.name} size={40} />}
    />
  )
}

export default ChatItem
