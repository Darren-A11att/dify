const translation = {
  title: '工具',
  createCustomTool: '创建自定义工具',
  type: {
    all: '全部',
    builtIn: '内置',
    custom: '自定义',
  },
  contribute: {
    line1: '我有兴趣为 ',
    line2: 'Dify 贡献工具。',
    viewGuide: '查看指南',
  },
  author: '作者',
  auth: {
    unauthorized: '未经授权',
    authorized: '已授权',
    setup: '要使用请先授权',
    setupModalTitle: '设置授权',
    setupModalTitleDescription: '配置凭据后，工作区中的所有成员都可以在编排应用程序时使用此工具。',
  },
  includeToolNum: '包含 {{num}} 个工具',
  addTool: '添加工具',
  createTool: {
    title: '创建自定义工具',
    name: '名称',
    toolNamePlaceHolder: '输入工具名称',
    schema: 'Schema',
    schemaPlaceHolder: '在此处输入您的 OpenAPI schema',
    viewSchemaSpec: '查看 OpenAPI-Swagger 规范',
    importFromUrl: '从 URL 中导入',
    importFromUrlPlaceHolder: 'https://...',
    urlError: '请输入有效的 URL',
    examples: '例子',
    exampleOptions: {
      json: '天气(JSON)',
      yaml: '宠物商店(YAML)',
      blankTemplate: '空白模版',
    },
    availableTools: {
      title: '可用工具',
      name: '名称',
      description: '描述',
      method: '方法',
      path: '路径',
      action: '操作',
      test: '测试',
    },
    authMethod: {
      title: '鉴权方法',
      type: '鉴权类型',
      types: {
        none: '无',
        api_key: 'API Key',
      },
    },
    privacyPolicy: '隐私协议',
    privacyPolicyPlaceholder: '请输入隐私协议',
  },
}

export default translation
