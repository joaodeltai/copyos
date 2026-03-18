import { useMemo, useState } from 'react';
import CopyId from '../components/CopyId';
import { useToast } from '../components/ToastProvider';

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'var(--muted-foreground)', icon: '📥' },
  { id: 'assigned', label: 'Assigned', color: 'var(--color-neon-blue)', icon: '✅' },
  { id: 'doing', label: 'Doing', color: 'var(--color-neon-green)', icon: '⚡' },
  { id: 'review', label: 'Review', color: 'var(--color-neon-orange)', icon: '👁️' },
  { id: 'done', label: 'Done', color: 'var(--color-neon-purple)', icon: '✔️' },
  { id: 'blocked', label: 'Blocked', color: 'var(--color-neon-red)', icon: '⛔' },
];

const cards = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Criar roteiro para Reels sobre IA',
    status: 'backlog',
    priority: 3,
    assigned_to: null,
    created_by: 'Maestro',
    labels: ['conteúdo', 'reels'],
    content_type: 'reels',
    position: 0,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    title: 'Newsletter semanal #42',
    status: 'assigned',
    priority: 2,
    assigned_to: 'Vox',
    created_by: 'Maestro',
    labels: ['newsletter'],
    content_type: 'newsletter',
    due_date: '2026-03-20T00:00:00Z',
    position: 0,
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    title: 'Pesquisar trends de AI Agents',
    status: 'doing',
    priority: 4,
    assigned_to: 'Scout',
    created_by: 'Maestro',
    labels: ['pesquisa', 'IA'],
    position: 0,
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    title: 'Artigo blog: Como usar Cursor AI',
    status: 'review',
    priority: 2,
    assigned_to: 'Vox',
    created_by: 'Scout',
    labels: ['blog', 'tutorial'],
    content_type: 'blog',
    position: 0,
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    title: 'Thread Twitter sobre OpenClaw',
    status: 'done',
    priority: 1,
    assigned_to: 'Vox',
    created_by: 'Maestro',
    labels: ['twitter'],
    content_type: 'thread',
    position: 0,
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    title: 'API Evolution não responde',
    status: 'blocked',
    priority: 5,
    assigned_to: 'Zito',
    created_by: 'Maestro',
    labels: ['bug', 'infra'],
    position: 0,
  },
  {
    id: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
    title: 'Carrossel: 5 ferramentas IA grátis',
    status: 'doing',
    priority: 3,
    assigned_to: 'Vox',
    created_by: 'Scout',
    labels: ['carrossel', 'IA'],
    content_type: 'carrossel',
    position: 1,
  },
  {
    id: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
    title: 'Monitorar métricas do Reels',
    status: 'assigned',
    priority: 1,
    assigned_to: 'Lyra',
    created_by: 'Maestro',
    labels: ['analytics'],
    position: 1,
  },
];

const cardHistory = [
  {
    id: '1',
    card_id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    agent_id: 'Maestro',
    action_type: 'created',
    content: 'Card criado por Maestro',
    created_at: '2026-03-15T08:00:00Z',
  },
  {
    id: '2',
    card_id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    agent_id: 'Maestro',
    action_type: 'assigned',
    content: 'Atribuído a Scout',
    created_at: '2026-03-15T08:05:00Z',
  },
  {
    id: '3',
    card_id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    agent_id: 'Scout',
    action_type: 'status_changed',
    content: 'Status alterado para doing',
    created_at: '2026-03-16T10:30:00Z',
  },
];

const priorities = ['Baixa', 'Média', 'Alta', 'Crítica', 'Urgente', 'Bloqueante'];

export default function Kanban() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);

  const grouped = useMemo(() => {
    return columns.reduce<Record<string, typeof cards>>((acc, column) => {
      acc[column.id] = cards.filter((card) => card.status === column.id);
      return acc;
    }, {});
  }, []);

  const activeCard = cards.find((card) => card.id === selected);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="glow-blue" style={{ fontSize: '2rem', marginBottom: 4 }}>
            Kanban de Agentes
          </h1>
          <p style={{ color: 'var(--muted-foreground)' }}>
            Arraste cards entre estágios para simular fluxo de trabalho
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="button ghost" type="button">
            Filtrar Datas
          </button>
          <button className="button primary" type="button">
            Novo Card
          </button>
        </div>
      </div>

      <div className="kanban-grid">
        {columns.map((column) => (
          <div key={column.id} className="card-glow" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: column.color }}>{column.icon}</span>
                <strong>{column.label}</strong>
              </div>
              <span className="badge">{grouped[column.id].length}</span>
            </div>
            <div className="kanban-column" style={{ marginTop: 12 }}>
              {grouped[column.id].map((card) => (
                <div
                  key={card.id}
                  className="kanban-card"
                  onClick={() => setSelected(card.id)}
                  role="button"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="badge" style={{ color: 'var(--color-neon-orange)' }}>
                      {card.priority}
                    </span>
                    <CopyId value={card.id} />
                  </div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{card.title}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {card.labels.map((label) => (
                      <span key={label} className="badge">
                        {label}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                    {card.content_type || 'Sem tipo'} · {card.assigned_to ?? 'Sem agente'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeCard && (
        <>
          <div className="drawer-overlay" onClick={() => setSelected(null)} />
          <aside className="drawer">
            <h2 style={{ marginTop: 0 }}>Detalhes do Card</h2>
            <input className="search-input" defaultValue={activeCard.title} />
            <textarea
              className="search-input"
              defaultValue="Descrição editável do card com informações detalhadas"
              style={{ minHeight: 120 }}
            />
            <div style={{ display: 'grid', gap: 8 }}>
              <label>
                Status
                <select className="search-input" defaultValue={activeCard.status}>
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Prioridade
                <select className="search-input" defaultValue={activeCard.priority}>
                  {priorities.map((priority, index) => (
                    <option key={priority} value={index + 1}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button
                className="button primary"
                type="button"
                onClick={() => toast('Card salvo', 'success')}
              >
                Salvar
              </button>
              <button
                className="button ghost"
                type="button"
                onClick={() => toast('Card excluído', 'error')}
              >
                Excluir
              </button>
            </div>
            <div style={{ marginTop: 24 }}>
              <h3>Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cardHistory.map((item) => (
                  <div key={item.id} className="card-glow" style={{ padding: 12 }}>
                    <strong>{item.agent_id}</strong> · {item.action_type}
                    <p style={{ margin: '4px 0', color: 'var(--muted-foreground)' }}>{item.content}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                      {new Date(item.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
