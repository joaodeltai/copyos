import { formatRelative } from '../lib/date';

const agents = [
  {
    id: '1',
    name: 'Maestro',
    role: 'Orquestrador',
    status: 'working',
    level: 'L4',
    workspace: 'Marketing Ops',
    lastHeartbeat: new Date(Date.now() - 420000).toISOString(),
    currentTask: 'Gerando pipeline de conteúdo',
  },
  {
    id: '2',
    name: 'Vox',
    role: 'Content Creator',
    status: 'idle',
    level: 'L3',
    workspace: 'Studio Vox',
    lastHeartbeat: new Date(Date.now() - 1200000).toISOString(),
    currentTask: 'Aguardando revisão',
  },
  {
    id: '3',
    name: 'Scout',
    role: 'Pesquisador',
    status: 'working',
    level: 'L3',
    workspace: 'Intel Lab',
    lastHeartbeat: new Date(Date.now() - 300000).toISOString(),
    currentTask: 'Monitorando tendências SaaS',
  },
  {
    id: '4',
    name: 'Zito',
    role: 'Automação',
    status: 'sleeping',
    level: 'L2',
    workspace: 'Ops',
    lastHeartbeat: new Date(Date.now() - 8600000).toISOString(),
    currentTask: 'Modo economia',
  },
  {
    id: '5',
    name: 'Atlas',
    role: 'Growth',
    status: 'idle',
    level: 'L2',
    workspace: 'Growth Pod',
    lastHeartbeat: new Date(Date.now() - 5400000).toISOString(),
    currentTask: 'Mapeando mercado',
  },
  {
    id: '6',
    name: 'Kronos',
    role: 'Infra',
    status: 'error',
    level: 'L1',
    workspace: 'Ops',
    lastHeartbeat: new Date(Date.now() - 920000).toISOString(),
    currentTask: 'Falha no heartbeat',
  },
  {
    id: '7',
    name: 'Lyra',
    role: 'Sales',
    status: 'working',
    level: 'L3',
    workspace: 'Prospeccao',
    lastHeartbeat: new Date(Date.now() - 180000).toISOString(),
    currentTask: 'Executando follow-ups',
  },
  {
    id: '8',
    name: 'Nexus',
    role: 'QA',
    status: 'sleeping',
    level: 'L1',
    workspace: 'Lab',
    lastHeartbeat: new Date(Date.now() - 16000000).toISOString(),
    currentTask: 'Stand-by',
  },
];

const statusColors: Record<string, string> = {
  working: 'var(--color-neon-green)',
  idle: 'var(--color-neon-blue)',
  sleeping: 'var(--color-neon-purple)',
  error: 'var(--color-neon-red)',
};

export default function Agents() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 className="glow-blue" style={{ fontSize: '2rem', marginBottom: 4 }}>
          Agentes
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Controle de agentes autônomos</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {agents.map((agent) => (
          <div key={agent.id} className="card-glow" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 32 }}>🤖</div>
              <span className="badge" style={{ color: statusColors[agent.status] }}>
                {agent.status}
              </span>
            </div>
            <h3 style={{ marginBottom: 4 }}>{agent.name}</h3>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: 8 }}>{agent.role}</p>
            <div style={{ display: 'grid', gap: 6, fontSize: '0.85rem' }}>
              <div>Nível {agent.level}</div>
              <div>Workspace: {agent.workspace}</div>
              <div>Heartbeat: {formatRelative(agent.lastHeartbeat)}</div>
              <div style={{ color: statusColors[agent.status] }}>{agent.currentTask}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
