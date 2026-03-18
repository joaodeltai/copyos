export default function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card-glow" style={{ padding: 32, textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>🛰️</div>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <p style={{ marginBottom: 16, color: 'var(--muted-foreground)' }}>{subtitle}</p>
      {action}
    </div>
  );
}
