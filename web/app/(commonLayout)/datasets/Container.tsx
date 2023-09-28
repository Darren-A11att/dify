'use client'

// Libraries
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

// Components
import Datasets from './Datasets'
import DatasetFooter from './DatasetFooter'
import ApiServer from './ApiServer'
import Doc from './Doc'
import TabSlider from '@/app/components/base/tab-slider'

// Services
import { fetchDatasetApiBaseUrl } from '@/service/datasets'

const Container = () => {
  const { t } = useTranslation()

  const options = [
    { value: 'dataset', text: t('dataset.datasets') },
    { value: 'api', text: t('dataset.datasetsApi') },
  ]

  const [activeTab, setActiveTab] = useState('dataset')
  const containerRef = useRef<HTMLDivElement>(null)
  const { data } = useSWR(activeTab === 'dataset' ? null : '/datasets/api-base-info', fetchDatasetApiBaseUrl)

  return (
    <div ref={containerRef} className='flex flex-col overflow-auto bg-gray-100 shrink-0 grow'>
      <div className='sticky top-0 flex justify-between pt-4 px-12 pb-2 h-14 bg-gray-100 z-10'>
        <TabSlider
          value={activeTab}
          onChange={newActiveTab => setActiveTab(newActiveTab)}
          options={options}
        />
        {activeTab === 'api' && data && <ApiServer apiBaseUrl={data.api_base_url || ''} />}
      </div>

      {activeTab === 'dataset'
        ? (
          <>
            <Datasets containerRef={containerRef} />
            <DatasetFooter />
          </>
        )
        : (
          activeTab === 'api' && data && <Doc apiBaseUrl={data.api_base_url || ''} />
        )}
    </div>

  )
}

export default Container
