export type AgentState = 'working' | 'idle' | 'sleeping' | 'error'

export interface Agent {
  id: string
  agent_id: string
  state: AgentState
  level: string
  role?: string
  workspace?: string
  last_heartbeat?: string
  current_task?: string
}

export interface Activity {
  id: string
  actor_name: string
  action_type: string
  entity_type: string
  metadata: Record<string, string>
  created_at: string
}

export interface Project {
  id: string
  name: string
  icon: string
  color: string
  status: string
}

export interface Task {
  id: string
  title: string
  project_id?: string
  category: 'personal' | 'project'
  status: 'pending' | 'in_progress' | 'done'
  priority: number
  due_date?: string
  completed_at?: string
}

export type KanbanStatus = 'backlog' | 'assigned' | 'doing' | 'review' | 'done' | 'blocked'

export interface KanbanCard {
  id: string
  title: string
  status: KanbanStatus
  priority: number
  assigned_to: string | null
  created_by: string
  labels: string[]
  content_type?: string
  due_date?: string
  position: number
}

export interface CardHistory {
  id: string
  card_id: string
  agent_id: string
  action_type: string
  content: string
  created_at: string
}

export interface IntelItem {
  id: string
  title: string
  summary: string
  source: string
  source_type: string
  content_type: string
  relevance_score: number
  trending: boolean
  used_by?: string
  url?: string
  collected_at: string
}

export interface Memory {
  id: string
  agent_id: string
  type: 'decision' | 'action' | 'learning' | 'gotcha' | 'note'
  content: string
  tags: string[]
  importance: number
  tier: 'hot' | 'warm' | 'cold'
  created_at: string
}

export interface ResearchContent {
  id: string
  title: string
  source: string
  summary: string
  tags: string[]
  collected_at: string
  status: 'analisado' | 'pendente'
  full_content?: string
}

export interface ResearchSource {
  id: string
  name: string
  type: string
  url: string
  category: string
  frequency: string
  active: boolean
}

export interface ResearchInsight {
  id: string
  title: string
  summary: string
  tags: string[]
  created_at: string
}

export interface ResearchTrend {
  id: string
  title: string
  description: string
  growth: string
  tags: string[]
  detected_at: string
}

export interface Content {
  id: string
  title: string
  content_type: string
  content_body: string
  produced_by: string
  status: 'review' | 'approved' | 'published' | 'rejected'
  theme?: string
  moral?: string
  word_count?: number
  skill_used?: string
  source_url?: string
  version: number
  parent_id?: string
  project_id?: string
  created_at: string
  reviewed_at?: string
  published_at?: string
  notes?: string
}

export interface CronJob {
  id: string
  name: string
  schedule: string
  next_run: string
  last_run: string
  description: string
  active: boolean
}

export interface SaasSignal {
  id: string
  title: string
  source: string
  summary: string
  opportunity_score: number
  tags: string[]
  detected_at: string
}

export interface SaasIdea {
  id: string
  title: string
  description: string
  viability_score: number
  status: 'nova' | 'em_analise' | 'validada' | 'descartada'
  project_id?: string
}

export interface SaasReport {
  id: string
  title: string
  summary: string
  created_at: string
  full_content: string
}

export interface FlowNode {
  id: string
  type: 'message' | 'audio' | 'image' | 'delay' | 'condition'
  data: { label: string; content: string }
  position: { x: number; y: number }
}

export interface AudienceList {
  id: string
  name: string
  contact_count: number
  created_at: string
}

export interface Contact {
  id: string
  list_id: string
  name: string
  phone: string
  tags: string[]
  status: 'ativo' | 'respondeu' | 'bloqueado' | 'pendente'
}

export interface Broadcast {
  id: string
  name: string
  status: 'draft' | 'running' | 'paused' | 'completed'
  list_id: string
  flow_id: string
  total_sent: number
  total_delivered: number
  total_read: number
  total_replied: number
  created_at: string
}

export interface BroadcastLog {
  id: string
  broadcast_id: string
  contact_name: string
  phone: string
  status: 'enviado' | 'entregue' | 'lido' | 'respondeu' | 'falhou'
  sent_at: string
}
