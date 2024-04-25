import { BlockEnum } from '../../types'
import type { NodeDefault } from '../../types'
import { AuthorizationType, BodyType, type HttpNodeType, Method } from './types'
import { ALL_CHAT_AVAILABLE_BLOCKS, ALL_COMPLETION_AVAILABLE_BLOCKS } from '@/app/components/workflow/constants'

const nodeDefault: NodeDefault<HttpNodeType> = {
  defaultValue: {
    variables: [],
    method: Method.get,
    url: '',
    authorization: {
      type: AuthorizationType.none,
      config: null,
    },
    headers: '',
    params: '',
    body: {
      type: BodyType.none,
      data: '',
    },
    timeout: {
      connect: 10,
      read: 60,
      write: 20,
    },
  },
  getAvailablePrevNodes(isChatMode: boolean) {
    const nodes = isChatMode
      ? ALL_CHAT_AVAILABLE_BLOCKS
      : ALL_COMPLETION_AVAILABLE_BLOCKS.filter(type => type !== BlockEnum.End)
    return nodes
  },
  getAvailableNextNodes(isChatMode: boolean) {
    const nodes = isChatMode ? ALL_CHAT_AVAILABLE_BLOCKS : ALL_COMPLETION_AVAILABLE_BLOCKS
    return nodes
  },
  checkValid(payload: HttpNodeType, t: any) {
    let errorMessages = ''

    if (!errorMessages && !payload.url)
      errorMessages = t('workflow.errorMsg.fieldRequired', { field: t('workflow.nodes.http.api') })

    if (!errorMessages && !payload.url.startsWith('http://') && !payload.url.startsWith('https://'))
      errorMessages = t('workflow.nodes.http.notStartWithHttp')

    return {
      isValid: !errorMessages,
      errorMessage: errorMessages,
    }
  },
}

export default nodeDefault
