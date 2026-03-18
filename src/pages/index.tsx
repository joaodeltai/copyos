import Link from 'next/link';
import { formatRelative } from '../lib/date';

const stats = [
  {
    label: 'Agentes Ativos',
    value: '5',
    subtitle: 'de 8 registrados',
    color: 'var(--color-neon-blue)',
    icon: '🤖',
  },
  {
    label: 'Tarefas Pendentes',
    value: '47',
    subtitle: '223 cards no total',
    color: 'var(--color-neon-orange)',
    icon: '📝',
  },
  {
    label: 'Saúde do Sistema',
    value: 'Online',
    subtitle: 'Heartbeat OK',
    color: 'var(--color-neon-green)',
    icon: '❤️',
  },
  {
    label: 'Taxa de Sucesso',
    value: '78%',
    subtitle: '174 de 223 concluídos',
    color: 'var(--color-neon-purple)',
    icon: '📈',
  },
];

const agents = [
  { id: '1', agent_id: 'Maestro', state: 'working', level: 'L4' },
  { id: '2', agent_id: 'Vox', state: 'idle', level: 'L3' },
  { id: '3', agent_id: 'Scout', state: 'working', level: 'L3' },
  { id: '4', agent_id: 'Zito', state: 'sleeping', level: 'L2' },
  { id: '5', agent_id: 'Atlas', state: 'idle', level: 'L2' },
  { id: '6', agent_id: 'Kronos', state: 'error', level: 'L1' },
  { id: '7', agent_id: 'Lyra', state: 'working', level: 'L3' },
  { id: '8', agent_id: 'Nexus', state: 'sleeping', level: 'L1' },
];

const recentActivity = [
  {
    id: '1',
    actor_name: 'Maestro',
    action_type: 'status_changed',
    entity_type: 'card',
    metadata: { task_title: 'Criar landing page v2' },
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    actor_name: 'Vox',
    action_type: 'card_created',
    entity_type: 'card',
    metadata: { task_title: 'Newsletter semanal #42' },
    created_at: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: '3',
    actor_name: 'Scout',
    action_type: 'started_working',
    entity_type: 'card',
    metadata: { task_title: 'Pesquisa concorrentes SaaS' },
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '4',
    actor_name: 'Zito',
    action_type: 'assigned',
    entity_type: 'card',
    metadata: { task_title: 'Deploy automação WhatsApp', assigned_to: 'Lyra' },
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

const stateColors: Record<string, string> = {
  working: 'var(--color-neon-green)',
  idle: 'var(--color-neon-blue)',
  sleeping: 'var(--color-neon-purple)',
  error: 'var(--color-neon-red)',
};

const stateLabels: Record<string, string> = {
  working: 'working',
  idle: 'idle',
  sleeping: 'sleeping',
  error: 'error',
};

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="glow-blue" style={{ fontSize: '2rem', marginBottom: 4 }}>
            Mission Control
          </h1>
          <p style={{ color: 'var(--muted-foreground)' }}>Visão geral dos agentes e tarefas</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="button ghost" type="button">
            Pausar Sistema
          </button>
          <button className="button ghost" type="button">
            Limpar Fila
          </button>
          <button className="button primary" type="button">
            Nova Tarefa
          </button>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="card-glow" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  display: 'grid',
                  placeItems: 'center',
                  background: `color-mix(in oklab, ${stat.color} 20%, transparent)`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                  {stat.label}
                </div>
                <div className="stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                  {stat.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <div className="card-glow" style={{ padding: 20 }}>
          <div className="section-title">Status dos Agentes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {agents.map((agent) => (
              <div
                key={agent.id}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: stateColors[agent.state],
                      boxShadow: `0 0 8px ${stateColors[agent.state]}`,
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{agent.agent_id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                      Nível {agent.level}
                    </div>
                  </div>
                </div>
                <span className="badge" style={{ color: stateColors[agent.state] }}>
                  {stateLabels[agent.state]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glow" style={{ padding: 20 }}>
          <div className="section-title">Atividade Recente</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentActivity.map((activity) => (
              <Link key={activity.id} href="/kanban" className="card-glow" style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <span className="glow-cyan" style={{ fontWeight: 600 }}>
                      {activity.actor_name}
                    </span>{' '}
                    {activity.action_type.replace('_', ' ')}{' '}
                    <strong>{activity.metadata.task_title}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                    {formatRelative(activity.created_at)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
