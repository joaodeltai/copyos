import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/ThemeContext';
import { useSearch } from '../contexts/SearchContext';

const navSections = [
  { href: '/', label: 'Dashboard' },
  { href: '/tasks', label: 'Tarefas' },
  { href: '/kanban', label: 'Kanban' },
  { href: '/activity', label: 'Atividade' },
  { href: '/agents', label: 'Agentes' },
  { href: '/intel-feed', label: 'Intel Feed' },
  { href: '/memory', label: 'Memória' },
  { href: '/research', label: 'Pesquisa' },
  { href: '/contents', label: 'Conteúdos' },
  { href: '/cron', label: 'Cron Jobs' },
  { href: '/saas-research', label: 'SaaS Res.' },
];

const prospeccao = [
  { href: '/prospeccao/fluxo', label: 'Fluxo' },
  { href: '/prospeccao/audiencia', label: 'Audiência' },
  { href: '/prospeccao/transmissao', label: 'Transmissão' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [prospeccaoOpen, setProspeccaoOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { query, setQuery } = useSearch();
  const router = useRouter();

  const activePath = useMemo(() => router.pathname, [router.pathname]);

  return (
    <div className={`layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-logo glow-blue">
          <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>⚡</span>
          {!collapsed && (
            <div>
              <span>MISSION</span>
              <small>CONTROL</small>
            </div>
          )}
        </div>
        <nav className="sidebar-nav">
          {navSections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${activePath === item.href ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ fontSize: '0.95rem' }}>{item.label.slice(0, 2)}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
          <button
            className="sidebar-item"
            type="button"
            onClick={() => setProspeccaoOpen((prev) => !prev)}
          >
            <span>Pr</span>
            {!collapsed && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Prospecção <span style={{ opacity: 0.6 }}>{prospeccaoOpen ? '▾' : '▸'}</span>
              </span>
            )}
          </button>
          {prospeccaoOpen &&
            prospeccao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${activePath === item.href ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
                style={{ marginLeft: collapsed ? 0 : 12 }}
              >
                <span>{item.label.slice(0, 2)}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
          <Link
            href="/settings"
            className={`sidebar-item ${activePath === '/settings' ? 'active' : ''}`}
            title={collapsed ? 'Configurações' : undefined}
          >
            <span>⚙️</span>
            {!collapsed && <span>Configurações</span>}
          </Link>
        </div>
        <button className="sidebar-toggle" onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? '›' : '‹'}
        </button>
      </aside>
      <div className="content-area">
        <header className="header">
          <input
            className="search-input"
            placeholder="Buscar..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="button ghost" type="button">
              🔔 3
            </button>
            <button className="button ghost" onClick={toggleTheme} type="button">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <div className="badge">CEO</div>
          </div>
        </header>
        <main className="page grid-pattern scrollbar">{children}</main>
      </div>
    </div>
  );
}
