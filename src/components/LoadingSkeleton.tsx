export default function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="card-glow" style={{ padding: 24 }}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          style={{
            height: 12,
            borderRadius: 8,
            background: 'color-mix(in oklab, var(--primary) 20%, transparent)',
            marginBottom: 12,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}
