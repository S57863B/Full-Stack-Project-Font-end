import { PriorityMark, Tag, StatusIcon } from './TaskVisuals.jsx';
import Icon from './Icon.jsx';

function dueLabel(due) {
  if (!due) return null;
  const d = new Date(due);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(d);
  day.setHours(0, 0, 0, 0);
  const diffDays = Math.round((day - today) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays < 7) return `${diffDays}d`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
function dueState(due) {
  if (!due) return 'none';
  const d = new Date(due);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(d);
  day.setHours(0, 0, 0, 0);
  const diff = Math.round((day - today) / 86400000);
  if (diff < 0) return 'over';
  if (diff === 0) return 'today';
  if (diff < 4) return 'soon';
  return 'future';
}
const DUE_COLOR = {
  over: 'var(--st-blocked)',
  today: 'var(--accent)',
  soon: 'var(--prio-high)',
  future: 'var(--tx-low)',
  none: 'var(--tx-low)',
};

export default function KanbanCard({ task, onOpen, dragging, onDragStart, onDragEnd }) {
  const ds = dueState(task.due);
  const hasTags = task.tags && task.tags.length > 0;

  return (
    <div
      className={'kcard' + (dragging ? ' dragging' : '')}
      draggable
      onClick={() => onOpen(task)}
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--line-soft)',
        borderRadius: 'var(--r-lg)',
        padding: 'var(--card-pad)',
        cursor: 'pointer',
        transition: 'border-color .15s, transform .12s',
        opacity: dragging ? 0.4 : 1,
      }}
    >
      {/* top row: priority + tags */}
      <div className="row" style={{ gap: 7, marginBottom: hasTags ? 9 : 0 }}>
        <PriorityMark prio={task.priority} />
        <div className="grow" />
        {hasTags && task.tags.map((t) => <Tag key={t} label={t} />)}
      </div>

      {/* title */}
      <div style={{ fontSize: 14, lineHeight: 1.35, color: 'var(--tx-hi)', fontWeight: 500, textWrap: 'pretty' }}>
        {task.title}
      </div>

      {/* meta row: due date */}
      {task.due && (
        <div className="row" style={{ gap: 12, marginTop: 11, fontSize: 12, color: DUE_COLOR[ds] }}>
          <span className="row" style={{ gap: 4 }}>
            <Icon name={ds === 'over' ? 'clock' : 'calendar'} size={13} />
            <span>{dueLabel(task.due)}</span>
          </span>
        </div>
      )}

      {/* bottom row: status icon */}
      <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
        <StatusIcon status={task.status} size={15} />
      </div>
    </div>
  );
}