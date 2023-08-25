import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import InvitationLink from './invitation-link'
import s from './index.module.css'
import Modal from '@/app/components/base/modal'
import Button from '@/app/components/base/button'
import { IS_CE_EDITION } from '@/config'
import type { InvitationResult } from '@/models/common'
import Tooltip from '@/app/components/base/tooltip'

type IInvitedModalProps = {
  invitationResults: InvitationResult[]
  onCancel: () => void
}
const InvitedModal = ({
  invitationResults,
  onCancel,
}: IInvitedModalProps) => {
  const { t } = useTranslation()

  return (
    <div className={s.wrap}>
      <Modal isShow onClose={() => {}} className={s.modal}>
        <div className='flex justify-between mb-3'>
          <div className='
            w-12 h-12 flex items-center justify-center rounded-xl
            bg-white border-[0.5px] border-gray-100
            shadow-xl
          '>
            <CheckCircleIcon className='w-[22px] h-[22px] text-[#039855]' />
          </div>
          <XMarkIcon className='w-4 h-4 cursor-pointer' onClick={onCancel} />
        </div>
        <div className='mb-1 text-xl font-semibold text-gray-900'>{t('common.members.invitationSent')}</div>
        {!IS_CE_EDITION && (
          <div className='mb-10 text-sm text-gray-500'>{t('common.members.invitationSentTip')}</div>
        )}
        {IS_CE_EDITION && (
          <>
            <div className='mb-5 text-sm text-gray-500'>{t('common.members.invitationSentTip')}</div>
            <div className='flex flex-col gap-2 mb-9'>
              {
                !!invitationResults?.filter(item => item.status === 'success').length
                  && <>
                    <div className='py-2 text-sm font-Medium text-gray-900'>{t('common.members.invitationLink')}</div>
                    {invitationResults.map(item => item.status === 'success'
                      && <InvitationLink key={item.email} value={item.url} />)}
                  </>
              }
              {
                !!invitationResults?.filter(item => item.status !== 'success').length
                  && <>
                    <div className='py-2 text-sm font-Medium text-gray-900'>{t('common.members.failedinvitationEmails')}</div>
                    <div className='flex flex-wrap justify-between gap-2'>
                      {
                        invitationResults.map(item => item.status !== 'success'
                        && <div key={item.email} className='flex justify-center border hover:border-red-700 border-red-300 border-dashed rounded-md px-1'>
                          <Tooltip
                            selector={`invitation-tag-${item.email}`}
                            htmlContent={item.message}
                          >
                            <div tabIndex={0} className='flex justify-center items-center text-sm'>{item.email}</div>
                          </Tooltip>
                        </div>,
                        )
                      }
                    </div>
                  </>
              }
            </div>
          </>
        )}
        <div className='flex justify-end'>
          <Button
            className='w-[96px] text-sm font-medium'
            onClick={onCancel}
            type='primary'
          >
            {t('common.members.ok')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default InvitedModal
