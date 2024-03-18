import type { FC } from 'react'
import {
  memo,
  useEffect,
  useMemo,
} from 'react'
import { setAutoFreeze } from 'immer'
import { useKeyPress } from 'ahooks'
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useOnViewportChange,
} from 'reactflow'
import type { Viewport } from 'reactflow'
import 'reactflow/dist/style.css'
import './style.css'
import type {
  Edge,
  Node,
} from './types'
import { WorkflowContextProvider } from './context'
import {
  useEdgesInteractions,
  useNodesInteractions,
  useNodesSyncDraft,
  useWorkflow,
  useWorkflowInit,
} from './hooks'
import Header from './header'
import CustomNode from './nodes'
import Operator from './operator'
import CustomEdge from './custom-edge'
import CustomConnectionLine from './custom-connection-line'
import Panel from './panel'
import Features from './features'
import HelpLine from './help-line'
import { useStore } from './store'
import {
  initialEdges,
  initialNodes,
} from './utils'
import Loading from '@/app/components/base/loading'
import { FeaturesProvider } from '@/app/components/base/features'
import type { Features as FeaturesData } from '@/app/components/base/features/types'

const nodeTypes = {
  custom: CustomNode,
}
const edgeTypes = {
  custom: CustomEdge,
}

type WorkflowProps = {
  nodes: Node[]
  edges: Edge[]
  viewport?: Viewport
}
const Workflow: FC<WorkflowProps> = memo(({
  nodes,
  edges,
  viewport,
}) => {
  const showFeaturesPanel = useStore(state => state.showFeaturesPanel)
  const runningStatus = useStore(s => s.runningStatus)
  const nodeAnimation = useStore(s => s.nodeAnimation)
  const { handleSyncWorkflowDraft } = useNodesSyncDraft()

  useEffect(() => {
    setAutoFreeze(false)

    return () => {
      setAutoFreeze(true)
    }
  }, [])

  const {
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragStop,
    handleNodeEnter,
    handleNodeLeave,
    handleNodeClick,
    handleNodeConnect,
    handleNodeConnectStart,
    handleNodeConnectEnd,
  } = useNodesInteractions()
  const {
    handleEdgeEnter,
    handleEdgeLeave,
    handleEdgeDelete,
    handleEdgesChange,
  } = useEdgesInteractions()
  const { isValidConnection } = useWorkflow()

  useOnViewportChange({
    onEnd: () => handleSyncWorkflowDraft(),
  })

  useKeyPress('Backspace', handleEdgeDelete)

  return (
    <div
      id='workflow-container'
      className={`
        relative w-full min-w-[960px] h-full bg-[#F0F2F7]
        ${runningStatus && 'workflow-panel-animation'}
        ${nodeAnimation && 'workflow-node-animation'}
      `}
    >
      <Header />
      <Panel />
      <Operator />
      {
        showFeaturesPanel && <Features />
      }
      <HelpLine />
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
        onNodeMouseEnter={handleNodeEnter}
        onNodeMouseLeave={handleNodeLeave}
        onNodeClick={handleNodeClick}
        onConnect={handleNodeConnect}
        onConnectStart={handleNodeConnectStart}
        onConnectEnd={handleNodeConnectEnd}
        onEdgeMouseEnter={handleEdgeEnter}
        onEdgeMouseLeave={handleEdgeLeave}
        onEdgesChange={handleEdgesChange}
        connectionLineComponent={CustomConnectionLine}
        defaultViewport={viewport}
        multiSelectionKeyCode={null}
        deleteKeyCode={null}
        panOnDrag={!runningStatus}
        nodesDraggable={!runningStatus}
        nodesConnectable={!runningStatus}
        nodesFocusable={!runningStatus}
        edgesFocusable={!runningStatus}
        zoomOnPinch={!runningStatus}
        zoomOnScroll={!runningStatus}
        zoomOnDoubleClick={!runningStatus}
        isValidConnection={isValidConnection}
      >
        <Background
          gap={[14, 14]}
          size={2}
          color='#E4E5E7'
        />
      </ReactFlow>
    </div>
  )
})

Workflow.displayName = 'Workflow'

const WorkflowWrap = memo(() => {
  const data = useWorkflowInit()

  const nodesData = useMemo(() => {
    if (data)
      return initialNodes(data.graph.nodes, data.graph.edges)

    return []
  }, [data])
  const edgesData = useMemo(() => {
    if (data)
      return initialEdges(data.graph.edges, data.graph.nodes)

    return []
  }, [data])

  if (!data) {
    return (
      <div className='flex justify-center items-center relative w-full h-full bg-[#F0F2F7]'>
        <Loading />
      </div>
    )
  }

  const features = data.features || {}
  const initialFeatures: FeaturesData = {
    opening: {
      enabled: !!features.opening_statement,
      opening_statement: features.opening_statement,
      suggested_questions: features.suggested_questions,
    },
    suggested: features.suggested_questions_after_answer || { enabled: false },
    speech2text: features.speech_to_text || { enabled: false },
    text2speech: features.text_to_speech || { enabled: false },
    citation: features.retriever_resource || { enabled: false },
    moderation: features.sensitive_word_avoidance || { enabled: false },
  }

  return (
    <ReactFlowProvider>
      <FeaturesProvider features={initialFeatures}>
        <Workflow
          nodes={nodesData}
          edges={edgesData}
          viewport={data?.graph.viewport}
        />
      </FeaturesProvider>
    </ReactFlowProvider>
  )
})
WorkflowWrap.displayName = 'WorkflowWrap'

const WorkflowContainer = () => {
  return (
    <WorkflowContextProvider>
      <WorkflowWrap />
    </WorkflowContextProvider>
  )
}

export default memo(WorkflowContainer)
