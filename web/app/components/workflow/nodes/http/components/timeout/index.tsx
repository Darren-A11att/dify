'use client'
import type { FC } from 'react'
import React from 'react'

import { useTranslation } from 'react-i18next'
import type { Timeout as TimeoutPayloadType } from '../../types'
import nodeDefault from '../../default'
import Input from '@/app/components/base/input'

type Props = {
  readonly: boolean
  nodeId: string
  payload: TimeoutPayloadType
  onChange: (payload: TimeoutPayloadType) => void
}

const InputField: FC<{
  title: string
  description: string
  placeholder: string
  value?: number
  onChange: (value: number) => void
  readOnly?: boolean
}> = ({ title, description, placeholder, value, onChange, readOnly }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center h-[18px] space-x-2">
        <span className="text-[13px] font-medium text-gray-900">{title}</span>
        <span className="text-xs font-normal text-gray-500">{description}</span>
      </div>
      <Input
        value={value?.toString()}
        onChange={v => onChange(parseInt(v))}
        placeholder={placeholder}
        type="number"
        readOnly={readOnly}
      />
    </div>
  )
}

const Timeout: FC<Props> = ({ readonly, payload, onChange }) => {
  const { t } = useTranslation()
  const { connect, read, write } = {
    ...nodeDefault.defaultValue.timeout,
    ...payload,
  }

  return (
    <>
      <div className="space-y-3">
        <InputField
          title={t('workflow.nodes.http.timeout.connectLabel')!}
          description={t('workflow.nodes.http.timeout.connectPlaceholder')!}
          placeholder={t('workflow.nodes.http.timeout.connectPlaceholder')!}
          readOnly={readonly}
          value={connect}
          onChange={v => onChange?.({ ...payload, connect: v })}
        />
        <InputField
          title={t('workflow.nodes.http.timeout.readLabel')!}
          description={t('workflow.nodes.http.timeout.readPlaceholder')!}
          placeholder={t('workflow.nodes.http.timeout.connectPlaceholder')!}
          readOnly={readonly}
          value={read}
          onChange={v => onChange?.({ ...payload, read: v })}
        />
        <InputField
          title={t('workflow.nodes.http.timeout.writeLabel')!}
          description={t('workflow.nodes.http.timeout.writePlaceholder')!}
          placeholder={t('workflow.nodes.http.timeout.connectPlaceholder')!}
          readOnly={readonly}
          value={write}
          onChange={v => onChange?.({ ...payload, write: v })}
        />
      </div>
    </>
  )
}
export default React.memo(Timeout)
