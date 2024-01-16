import type { FC } from 'react'
import { useCallback } from 'react'
import DebugItem from './debug-item'
import {
  DebugWithMultipleModelContextProvider,
  useDebugWithMultipleModelContext,
} from './context'
import type { DebugWithMultipleModelContextType } from './context'
import { useEventEmitterContextContext } from '@/context/event-emitter'
import ChatInput from '@/app/components/base/chat/chat-input'
import type { VisionFile } from '@/app/components/base/chat/types'
import { useDebugConfigurationContext } from '@/context/debug-configuration'

const DebugWithMultipleModel = () => {
  const {
    mode,
    speechToTextConfig,
    visionConfig,
  } = useDebugConfigurationContext()
  const { multipleModelConfigs } = useDebugWithMultipleModelContext()
  const { eventEmitter } = useEventEmitterContextContext()

  const handleSend = useCallback((message: string, files?: VisionFile[]) => {
    eventEmitter?.emit({
      type: 'app-chat-with-multiple-model',
      payload: {
        message,
        files,
      },
    } as any)
  }, [eventEmitter])

  const twoLine = multipleModelConfigs.length === 2
  const threeLine = multipleModelConfigs.length === 3
  const fourLine = multipleModelConfigs.length === 4

  return (
    <div className='flex flex-col h-full'>
      <div
        className={`
          mb-3 overflow-auto
          ${(twoLine || threeLine) && 'flex gap-2'}
        `}
        style={{ height: 'calc(100% - 60px)' }}
      >
        {
          (twoLine || threeLine) && multipleModelConfigs.map(modelConfig => (
            <DebugItem
              key={modelConfig.id}
              modelAndParameter={modelConfig}
              className={`
                h-full min-h-[200px]
                ${twoLine && 'w-1/2'}
                ${threeLine && 'w-1/3'}
              `}
            />
          ))
        }
        {
          fourLine && (
            <>
              <div
                className='flex space-x-2  mb-2 min-h-[200px]'
                style={{ height: 'calc(50% - 4px)' }}
              >
                {
                  multipleModelConfigs.slice(0, 2).map(modelConfig => (
                    <DebugItem
                      key={modelConfig.id}
                      modelAndParameter={modelConfig}
                      className='w-1/2 h-full'
                    />
                  ))
                }
              </div>
              <div
                className='flex space-x-2 min-h-[200px]'
                style={{ height: 'calc(50% - 4px)' }}
              >
                {
                  multipleModelConfigs.slice(2, 4).map(modelConfig => (
                    <DebugItem
                      key={modelConfig.id}
                      modelAndParameter={modelConfig}
                      className='w-1/2 h-full'
                    />
                  ))
                }
              </div>
            </>
          )
        }
      </div>
      {
        mode === 'chat' && (
          <div className='shrink-0'>
            <ChatInput
              onSend={handleSend}
              speechToTextConfig={speechToTextConfig}
              visionConfig={visionConfig}
            />
          </div>
        )
      }
    </div>
  )
}

const DebugWithMultipleModelWrapper: FC<DebugWithMultipleModelContextType> = ({
  onMultipleModelConfigsChange,
  multipleModelConfigs,
  onDebugWithMultipleModelChange,
}) => {
  return (
    <DebugWithMultipleModelContextProvider
      onMultipleModelConfigsChange={onMultipleModelConfigsChange}
      multipleModelConfigs={multipleModelConfigs}
      onDebugWithMultipleModelChange={onDebugWithMultipleModelChange}
    >
      <DebugWithMultipleModel />
    </DebugWithMultipleModelContextProvider>
  )
}

export default DebugWithMultipleModelWrapper
