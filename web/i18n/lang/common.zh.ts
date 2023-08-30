const translation = {
  api: {
    success: '成功',
    saved: '已保存',
    create: '已创建',
    remove: '已移除',
  },
  operation: {
    create: '创建',
    confirm: '确认',
    cancel: '取消',
    clear: '清空',
    save: '保存',
    edit: '编辑',
    add: '添加',
    refresh: '重新开始',
    reset: '重置',
    search: '搜索',
    change: '更改',
    remove: '移除',
    send: '发送',
    copy: '复制',
    lineBreak: '换行',
    sure: '我确定',
    download: '下载',
    delete: '删除',
    settings: '设置',
    setup: '设置',
    getForFree: '免费获取',
    reload: '刷新',
    ok: '好的',
  },
  placeholder: {
    input: '请输入',
    select: '请选择',
  },
  unit: {
    char: '个字符',
  },
  actionMsg: {
    noModification: '暂无修改',
    modifiedSuccessfully: '修改成功',
    modificationFailed: '修改失败',
    copySuccessfully: '复制成功',
    paySucceeded: '已支付成功',
    payCancelled: '已取消支付',
  },
  model: {
    params: {
      temperature: '多样性',
      temperatureTip:
        '较高的 Temperature 设置将导致更多样和创造性的输出，而较低的 Temperature 将产生更保守的输出并且类似于训练数据。',
      top_p: '采样范围',
      top_pTip:
        'Top P值越低，输出与训练文本越相似，Top P值越高，输出越有创意和变化。它可用于使输出更适合特定用例。',
      presence_penalty: '词汇控制',
      presence_penaltyTip:
        'Presence penalty 是根据新词是否出现在目前的文本中来对其进行惩罚。正值将降低模型谈论新话题的可能性。',
      frequency_penalty: '重复控制',
      frequency_penaltyTip:
        'Frequency penalty 是根据重复词在目前文本中的出现频率来对其进行惩罚。正值将不太可能重复常用单词和短语。',
      max_tokens: '最大 Token',
      max_tokensTip:
        '生成的最大令牌数取决于模型。提示和完成共享令牌数限制。一个令牌约等于 1 个英文或 半个中文字符。',
      maxTokenSettingTip: '您设置的最大 tokens 数较大，可能会导致 prompt、用户问题、数据集内容没有 token 空间进行处理，建议设置到 2/3 以下。',
      setToCurrentModelMaxTokenTip: '最大令牌数更新为当前模型最大的令牌数 {{maxToken}} 的 80%。',
    },
    tone: {
      Creative: '创意',
      Balanced: '平衡',
      Precise: '精确',
      Custom: '自定义',
    },
  },
  menus: {
    status: 'beta',
    explore: '探索',
    apps: '构建应用',
    plugins: '插件',
    pluginsTips: '集成第三方插件或创建与 ChatGPT 兼容的 AI 插件。',
    datasets: '数据集',
    datasetsTips: '即将到来: 上传自己的长文本数据，或通过 Webhook 集成自己的数据源',
    newApp: '创建应用',
    newDataset: '创建数据集',
  },
  userProfile: {
    settings: '设置',
    workspace: '工作空间',
    createWorkspace: '创建工作空间',
    helpCenter: '帮助文档',
    about: '关于',
    logout: '登出',
  },
  settings: {
    accountGroup: '账户',
    workplaceGroup: '工作空间',
    account: '我的账户',
    members: '成员',
    integrations: '集成',
    language: '语言',
    provider: '模型供应商',
    dataSource: '数据来源',
    plugin: '插件',
  },
  account: {
    avatar: '头像',
    name: '用户名',
    email: '邮箱',
    password: '密码',
    passwordTip: '如果您不想使用验证码登录，可以设置永久密码',
    setPassword: '设置密码',
    resetPassword: '重置密码',
    currentPassword: '原密码',
    newPassword: '新密码',
    notEqual: '两个密码不相同',
    confirmPassword: '确认密码',
    langGeniusAccount: 'Dify 账号',
    langGeniusAccountTip: '您的 Dify 账号和相关的用户数据。',
    editName: '编辑名字',
    showAppLength: '显示 {{length}} 个应用',
  },
  members: {
    team: '团队',
    invite: '添加',
    name: '姓名',
    lastActive: '上次活动时间',
    role: '角色',
    pending: '待定...',
    owner: '所有者',
    admin: '管理员',
    adminTip: '能够建立应用程序和管理团队设置',
    normal: '正常人',
    normalTip: '只能使用应用程序，不能建立应用程序',
    inviteTeamMember: '添加团队成员',
    inviteTeamMemberTip: '对方在登录后可以访问你的团队数据。',
    email: '邮箱',
    emailInvalid: '邮箱格式无效',
    emailPlaceholder: '输入邮箱',
    sendInvite: '发送邀请',
    invitedAsRole: '邀请为{{role}}用户',
    invitationSent: '邀请已发送',
    invitationSentTip: '邀请已发送，对方登录 Dify 后即可访问你的团队数据。',
    invitationLink: '邀请链接',
    failedinvitationEmails: '邀请以下邮箱失败',
    ok: '好的',
    removeFromTeam: '移除团队',
    removeFromTeamTip: '将取消团队访问',
    setAdmin: '设为管理员',
    setMember: '设为普通成员',
    disinvite: '取消邀请',
    deleteMember: '删除成员',
    you: '（你）',
  },
  integrations: {
    connected: '登录方式',
    google: 'Google',
    googleAccount: 'Google 账号登录',
    github: 'GitHub',
    githubAccount: 'GitHub 账号登录',
    connect: '绑定',
  },
  language: {
    displayLanguage: '界面语言',
    timezone: '时区',
  },
  provider: {
    apiKey: 'API 密钥',
    enterYourKey: '输入你的 API 密钥',
    invalidKey: '无效的 OpenAI API 密钥',
    validatedError: '校验失败：',
    validating: '验证密钥中...',
    saveFailed: 'API 密钥保存失败',
    apiKeyExceedBill: '此 API KEY 已没有可用配额，请阅读',
    addKey: '添加 密钥',
    comingSoon: '即将推出',
    editKey: '编辑',
    invalidApiKey: '无效的 API 密钥',
    azure: {
      apiBase: 'API Base',
      apiBasePlaceholder: '输入您的 Azure OpenAI API Base 地址',
      apiKey: 'API Key',
      apiKeyPlaceholder: '输入你的 API 密钥',
      helpTip: '了解 Azure OpenAI Service',
    },
    openaiHosted: {
      openaiHosted: '托管 OpenAI',
      onTrial: '体验',
      exhausted: '超出限额',
      desc: '托管 OpenAI 由 Dify 提供的托管 OpenAI 服务，你可以使用 GPT-3.5 等模型，在体验额度消耗完毕前你需要设置其它模型供应商。',
      callTimes: '调用次数',
      usedUp: '试用额度已用完，请在下方添加自己的模型供应商',
      useYourModel: '当前正在使用你自己的模型供应商。',
      close: '关闭',
    },
    anthropicHosted: {
      anthropicHosted: 'Anthropic Claude',
      onTrial: '体验',
      exhausted: '超出限额',
      desc: '功能强大的模型，擅长执行从复杂对话和创意内容生成到详细指导的各种任务。',
      callTimes: '调用次数',
      usedUp: '试用额度已用完，请在下方添加自己的模型供应商',
      useYourModel: '当前正在使用你自己的模型供应商。',
      close: '关闭',
    },
    anthropic: {
      using: '嵌入能力正在使用',
      enableTip: '要启用 Anthropic 模型，您需要先绑定 OpenAI 或 Azure OpenAI 服务。',
      notEnabled: '未启用',
      keyFrom: '从 Anthropic 获取您的 API 密钥',
    },
    encrypted: {
      front: '密钥将使用 ',
      back: ' 技术进行加密和存储。',
    },
  },
  modelProvider: {
    selectModel: '选择您的模型',
    setupModelFirst: '请先设置您的模型',
    systemReasoningModel: {
      key: '系统推理模型',
      tip: '设置创建应用使用的默认推理模型，以及对话名称生成、下一步问题建议等功能也会使用该默认推理模型。',
    },
    embeddingModel: {
      key: 'Embedding 模型',
      tip: '设置数据集文档嵌入处理的默认模型，检索和导入数据集均使用该Embedding模型进行向量化处理，切换后将导致已导入的数据集与问题之间的向量维度不一致，从而导致检索失败。为避免检索失败，请勿随意切换该模型。',
    },
    speechToTextModel: {
      key: '语音转文本模型',
      tip: '设置对话中语音转文字输入的默认使用模型。',
    },
    quota: '额度',
    searchModel: '搜索模型',
    noModelFound: '找不到模型 {{model}}',
    models: '模型列表',
    showMoreModelProvider: '显示更多模型提供商',
    selector: {
      tip: '该模型已被删除。请添模型或选择其他模型。',
    },
    card: {
      quota: '额度',
      onTrial: '试用中',
      paid: '已购买',
      quotaExhausted: '配额已用完',
      callTimes: '调用次数',
      tokens: 'Tokens',
      buyQuota: '购买额度',
      priorityUse: '优先使用',
      removeKey: '删除 API 密钥',
      tip: '已付费额度将优先考虑。 试用额度将在付费额度用完后使用。',
    },
    item: {
      deleteDesc: '{{modelName}} 被用作系统推理模型。删除后部分功能将无法使用。请确认。',
      freeQuota: '免费额度',
    },
    addApiKey: '添加您的 API 密钥',
    invalidApiKey: 'Invalid API key',
    encrypted: {
      front: '您的密钥将使用',
      back: '技术进行加密和存储。',
    },
    freeQuota: {
      howToEarn: '如何获取',
    },
  },
  dataSource: {
    add: '添加数据源',
    connect: '绑定',
    notion: {
      title: 'Notion',
      description: '使用 Notion 作为数据集的数据源。',
      connectedWorkspace: '已绑定工作空间',
      addWorkspace: '添加工作空间',
      connected: '已绑定',
      disconnected: '未绑定',
      changeAuthorizedPages: '更改授权页面',
      pagesAuthorized: '已授权页面',
      sync: '同步',
      remove: '删除',
      selector: {
        pageSelected: '已选页面',
        searchPages: '搜索页面...',
        noSearchResult: '无搜索结果',
        addPages: '添加页面',
        preview: '预览',
      },
    },
  },
  plugin: {
    serpapi: {
      apiKey: 'API Key',
      apiKeyPlaceholder: '输入你的 API 密钥',
      keyFrom: '从 SerpAPI 帐户页面获取您的 SerpAPI 密钥',
    },
  },
  about: {
    changeLog: '更新日志',
    updateNow: '现在更新',
    nowAvailable: 'Dify {{version}} 现已可用。',
    latestAvailable: 'Dify {{version}} 已是最新版本。',
  },
  appMenus: {
    overview: '概览',
    promptEng: '提示词编排',
    apiAccess: '访问 API',
    logAndAnn: '日志与标注',
  },
  environment: {
    testing: '测试环境',
    development: '开发环境',
  },
  appModes: {
    completionApp: '文本生成型应用',
    chatApp: '对话型应用',
  },
  datasetMenus: {
    documents: '文档',
    hitTesting: '命中测试',
    settings: '设置',
    emptyTip: ' 数据集尚未关联，请前往应用程序或插件完成关联。',
    viewDoc: '查看文档',
    relatedApp: '个关联应用',
  },
  voiceInput: {
    speaking: '现在讲...',
    converting: '正在转换为文本...',
    notAllow: '麦克风未授权',
  },
  modelName: {
    'gpt-3.5-turbo': 'GPT-3.5-Turbo',
    'gpt-3.5-turbo-16k': 'GPT-3.5-Turbo-16K',
    'gpt-4': 'GPT-4',
    'gpt-4-32k': 'GPT-4-32K',
    'text-davinci-003': 'Text-Davinci-003',
    'text-embedding-ada-002': 'Text-Embedding-Ada-002',
    'whisper-1': 'Whisper-1',
    'claude-instant-1': 'Claude-Instant',
    'claude-2': 'Claude-2',
  },
}

export default translation
