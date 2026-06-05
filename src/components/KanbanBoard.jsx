import { useState } from 'react';
import { COLUMNS, StatusIcon } from './TaskVisuals.jsx';
import Icon from './Icon.jsx';
import KanbanCard from './KanbanCard.jsx';

export default function KanbanBoard({ tasks, onOpenTask, onMove, onNew }) {
  const [dragId, setDragId] = useState(null);
  const [overCol, setOverCol] = useState(null);

  function onDragStart(e, task) {
    setDragId(task._id);
    e.dataTransfer.effectAllowed = 'move';
  }
  function onDrop(colId) {
    if (dragId) onMove(dragId, colId);
    setDragId(null);
    setOverCol(null);
  }

  return (
    <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', padding: '18px var(--gutter)' }}>
      <div className="row" style={{ gap: 16, height: '100%', alignItems: 'stretch', minWidth: 'min-content' }}>
        {COLUMNS.map((col) => {
          const items = tasks.filter((t) => t.status === col.id);
          const over = overCol === col.id;
          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(col.id);
              }}
              onDragLeave={() => setOverCol((c) => (c === col.id ? null : c))}
              onDrop={() => onDrop(col.id)}
              style={{
                width: 'var(--kcol-w)',
                flex: 'none',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--r-lg)',
                background: over ? 'var(--accent-soft)' : 'transparent',
                transition: 'background .15s',
                outline: over ? '1px dashed var(--accent-line)' : 'none',
              }}
            >
              {/* column header */}
              <div className="row" style={{ gap: 8, padding: '4px 6px 12px', justifyContent: 'space-between' }}>
                <div className="row" style={{ gap: 8 }}>
                  <StatusIcon status={col.id} size={15} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--tx-hi)' }}>{col.name}</span>
                  <span className="mono" style={{ fontSize: 11.5, color: 'var(--tx-low)' }}>{items.length}</span>
                </div>
                <button
                  onClick={() => onNew(col.id)}
                  className="cd-iconbtn"
                  title="Add task"
                  style={{ width: 26, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', color: 'var(--tx-low)' }}
                >
                  <Icon name="plussm" size={15} />
                </button>
              </div>

              {/* cards */}
              <div className="col" style={{ gap: 9, overflowY: 'auto', padding: '2px 4px 16px', flex: 1 }}>
                {items.map((t) => (
                  <KanbanCard
                    key={t._id}
                    task={t}
                    onOpen={onOpenTask}
                    dragging={dragId === t._id}
                    onDragStart={onDragStart}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverCol(null);
                    }}
                  />
                ))}
                {items.length === 0 && (
                  <button
                    onClick={() => onNew(col.id)}
                    className="kcol-empty"
                    style={{
                      border: '1px dashed var(--line)',
                      borderRadius: 'var(--r-lg)',
                      padding: '16px',
                      color: 'var(--tx-faint)',
                      fontSize: 12.5,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      transition: 'border-color .15s, color .15s',
                    }}
                  >
                    <Icon name="plussm" size={14} /> Add task
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}