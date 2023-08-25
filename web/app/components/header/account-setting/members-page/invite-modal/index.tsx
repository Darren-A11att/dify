'use client'
import { useState } from 'react'
import { useContext } from 'use-context-selector'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { ReactMultiEmail } from 'react-multi-email'
import s from './index.module.css'
import Modal from '@/app/components/base/modal'
import Button from '@/app/components/base/button'
import { inviteMember } from '@/service/common'
import { emailRegex } from '@/config'
import { ToastContext } from '@/app/components/base/toast'
import type { InvitationResult } from '@/models/common'

import 'react-multi-email/dist/style.css'

type IInviteModalProps = {
  onCancel: () => void
  onSend: (invitationResults: InvitationResult[]) => void
}
const InviteModal = ({
  onCancel,
  onSend,
}: IInviteModalProps) => {
  const { t } = useTranslation()
  const [emails, setEmails] = useState<string[]>([])
  const { notify } = useContext(ToastContext)

  const handleSend = async () => {
    if (emails.map(email => emailRegex.test(email)).every(Boolean)) {
      try {
        const res = await inviteMember({ url: '/workspaces/current/members/invite-email', body: { emails, role: 'admin' } })

        if (res.result === 'success') {
          onCancel()
          onSend(res.invitation_results)
        }
      }
      catch (e) {}
    }
    else {
      notify({ type: 'error', message: t('common.members.emailInvalid') })
    }
  }

  return (
    <div className={s.wrap}>
      <Modal isShow onClose={() => {}} className={s.modal}>
        <div className='flex justify-between mb-2'>
          <div className='text-xl font-semibold text-gray-900'>{t('common.members.inviteTeamMember')}</div>
          <XMarkIcon className='w-4 h-4 cursor-pointer' onClick={onCancel} />
        </div>
        <div className='mb-7 text-[13px] text-gray-500'>{t('common.members.inviteTeamMemberTip')}</div>
        <div>
          <div className='mb-2 text-sm font-medium text-gray-900'>{t('common.members.email')}</div>
          <div className='mb-8'>
            <ReactMultiEmail
              className='
                w-full py-2 px-3 bg-gray-50 outline-none border-none
                appearance-none text-sm text-gray-900 rounded-lg
              '
              autoFocus
              emails={emails}
              onChange={setEmails}
              getLabel={(email, index, removeEmail) => {
                return (
                  <div data-tag key={index}>
                    <div data-tag-item>{email}</div>
                    <span data-tag-handle onClick={() => removeEmail(index)}>
                      ×
                    </span>
                  </div>
                )
              }}
              placeholder={t('common.members.emailPlaceholder') || ''}
            />
          </div>
          <Button
            tabIndex={0}
            className='w-full text-sm font-medium'
            onClick={handleSend}
            type='primary'
          >
            {t('common.members.sendInvite')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default InviteModal
