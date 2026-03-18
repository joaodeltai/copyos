import { useMemo, useState } from 'react';
import { formatRelative } from '../lib/date';

const projects = [
  { id: '1', name: 'OpenClaw', icon: '🤖', color: '#8B5CF6', status: 'active' },
  { id: '2', name: 'Deltai', icon: '🔺', color: '#F59E0B', status: 'active' },
  { id: '3', name: 'Curso OpenClaw', icon: '🎓', color: '#10B981', status: 'active' },
  { id: '4', name: 'Newsletter', icon: '📰', color: '#3B82F6', status: 'active' },
];

const tasks = [
  {
    id: '1',
    title: 'Revisar conteúdo da newsletter',
    project_id: '4',
    category: 'project',
    status: 'pending',
    priority: 2,
    due_date: '2026-03-20',
  },
  {
    id: '2',
    title: 'Configurar automação de welcome',
    project_id: '1',
    category: 'project',
    status: 'in_progress',
    priority: 1,
    due_date: '2026-03-19',
  },
  {
    id: '3',
    title: 'Gravar vídeo aula módulo 3',
    project_id: '3',
    category: 'project',
    status: 'pending',
    priority: 2,
    due_date: '2026-03-22',
  },
  {
    id: '4',
    title: 'Responder DMs pendentes',
    category: 'personal',
    status: 'pending',
    priority: 0,
  },
  {
    id: '5',
    title: 'Revisar landing page Deltai',
    project_id: '2',
    category: 'project',
    status: 'done',
    priority: 1,
    completed_at: '2026-03-17T10:00:00',
  },
];

const priorityLabels = ['Baixa', 'Média', 'Alta'];
const priorityColors = ['#94A3B8', 'var(--color-neon-orange)', 'var(--color-neon-red)'];

export default function Tasks() {
  const [project, setProject] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (project !== 'all' && task.project_id !== project) return false;
      if (category !== 'all' && task.category !== category) return false;
      if (status !== 'all' && task.status !== status) return false;
      return true;
    });
  }, [project, category, status]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="glow-blue" style={{ fontSize: '2rem', marginBottom: 4 }}>
            Minhas Tarefas
          </h1>
          <p style={{ color: 'var(--muted-foreground)' }}>Organize suas prioridades pessoais</p>
        </div>
        <button className="button primary" type="button">
          Nova Tarefa
        </button>
      </div>

      <div className="card-glow" style={{ padding: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <select className="search-input" value={project} onChange={(e) => setProject(e.target.value)}>
          <option value="all">Projeto</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
        </select>
        <select className="search-input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Categoria</option>
          <option value="personal">Pessoal</option>
          <option value="project">Projeto</option>
        </select>
        <select className="search-input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Status</option>
          <option value="pending">Pendente</option>
          <option value="in_progress">Em progresso</option>
          <option value="done">Concluída</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredTasks.map((task) => {
          const projectData = projects.find((proj) => proj.id === task.project_id);
          return (
            <div key={task.id} className="card-glow" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input type="checkbox" checked={task.status === 'done'} readOnly />
                  <div>
                    <div style={{ fontWeight: 600 }}>{task.title}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                      <span
                        className="badge"
                        style={{ color: priorityColors[task.priority], borderColor: priorityColors[task.priority] }}
                      >
                        {priorityLabels[task.priority]}
                      </span>
                      {projectData && (
                        <span className="badge" style={{ color: projectData.color, borderColor: projectData.color }}>
                          {projectData.icon} {projectData.name}
                        </span>
                      )}
                      <span className="badge">{task.status}</span>
                      {task.due_date && (
                        <span className="badge">Due {formatRelative(task.due_date)}</span>
                      )}
                    </div>
                  </div>
                </div>
                {task.completed_at && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                    Concluída {formatRelative(task.completed_at)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
