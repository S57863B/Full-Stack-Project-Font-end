import Icon from './Icon.jsx';

// ---- shared definitions (mirrors the prototype's data.jsx) ----
export const COLUMNS = [
  { id: 'backlog', name: 'Backlog', icon: 'circle' },
  { id: 'todo', name: 'To Do', icon: 'circle' },
  { id: 'doing', name: 'In Progress', icon: 'halfcircle' },
  { id: 'review', name: 'In Review', icon: 'eye' },
  { id: 'done', name: 'Done', icon: 'checkcircle' },
];

export const PRIORITIES = {
  urgent: { label: 'Urgent', color: 'var(--prio-urgent)', rank: 0 },
  high: { label: 'High', color: 'var(--prio-high)', rank: 1 },
  med: { label: 'Medium', color: 'var(--prio-med)', rank: 2 },
  low: { label: 'Low', color: 'var(--prio-low)', rank: 3 },
};

const STATUS_COLOR = {
  backlog: 'var(--st-todo)',
  todo: 'var(--st-todo)',
  doing: 'var(--st-prog)',
  review: 'var(--st-review)',
  done: 'var(--st-done)',
};

// ---- StatusIcon: colored icon per Kanban column ----
export function StatusIcon({ status, size = 15 }) {
  const color = STATUS_COLOR[status] || 'var(--tx-low)';
  const icon = (COLUMNS.find((c) => c.id === status) || {}).icon || 'circle';
  return <Icon name={icon} size={size} sw={1.9} style={{ color }} />;
}

// ---- PriorityMark: ascending signal bars (urgent=4 ... low=1) ----
export function PriorityMark({ prio, showLabel = false, size = 13 }) {
  const p = PRIORITIES[prio];
  if (!p) return null;
  const bars = 4 - p.rank;
  return (
    <span className="row" style={{ gap: 6, color: p.color }} title={`${p.label} priority`}>
      <span className="row" style={{ gap: 1.5, alignItems: 'flex-end', height: size }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              width: 2.5,
              height: size * (0.4 + i * 0.2),
              borderRadius: 1,
              background: i < bars ? p.color : 'var(--line)',
            }}
          />
        ))}
      </span>
      {showLabel && <span style={{ fontSize: 12, color: 'var(--tx-mid)' }}>{p.label}</span>}
    </span>
  );
}

// ---- Tag: small tinted uppercase mono pill ----
const TAG_HUE = { design: 300, eng: 250, content: 55, review: 25 };
export function Tag({ label }) {
  const h = TAG_HUE[label] != null ? TAG_HUE[label] : 240;
  return (
    <span
      className="mono"
      style={{
        fontSize: 10.5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '2px 6px',
        borderRadius: 'var(--r-sm)',
        background: `oklch(0.6 0.08 ${h} / 0.14)`,
        color: `oklch(0.82 0.07 ${h})`,
        border: `1px solid oklch(0.6 0.08 ${h} / 0.22)`,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}