import { useState } from 'react';
import { COLUMNS, PRIORITIES } from './TaskVisuals.jsx';
import styles from './TaskModal.module.css';

export default function TaskModal({ task, defaultStatus, onClose, onSave, onDelete }) {
  const editing = Boolean(task);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || defaultStatus || 'todo');
  const [priority, setPriority] = useState(task?.priority || 'med');
  const [tagsText, setTagsText] = useState((task?.tags || []).join(', '));
  const [due, setDue] = useState(task?.due ? task.due.slice(0, 10) : '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    const tags = tagsText.split(',').map((s) => s.trim()).filter(Boolean);
    const fields = { title, description, status, priority, tags, due: due || null };
    try {
      await onSave(fields);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this task?')) return;
    setSaving(true);
    try {
      await onDelete();
      onClose();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{editing ? 'Edit task' : 'New task'}</h2>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs doing?"
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add detail…"
            />
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Priority</label>
              <select className={styles.input} value={priority} onChange={(e) => setPriority(e.target.value)}>
                {Object.entries(PRIORITIES).map(([id, p]) => (
                  <option key={id} value={id}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label}>Due date</label>
              <input className={styles.input} type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Tags (comma separated)</label>
              <input
                className={styles.input}
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="design, eng"
              />
            </div>
          </div>

          <div className={styles.actions}>
            {editing ? (
              <button type="button" className={styles.delete} onClick={handleDelete} disabled={saving}>
                Delete
              </button>
            ) : (
              <span />
            )}
            <div className={styles.actionsRight}>
              <button type="button" className={styles.cancel} onClick={onClose}>Cancel</button>
              <button type="submit" className={styles.save} disabled={saving}>
                {saving ? 'Saving…' : editing ? 'Save changes' : 'Create task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}