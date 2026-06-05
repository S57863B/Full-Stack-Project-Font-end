import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTasks } from '../hooks/useTasks.js';
import KanbanBoard from '../components/KanbanBoard.jsx';
import TaskModal from '../components/TaskModal.jsx';
import Icon from '../components/Icon.jsx';
import styles from './Project.module.css';

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [project, setProject] = useState(null);
  const [projLoading, setProjLoading] = useState(true);
  const [projError, setProjError] = useState('');

  const { tasks, loading: tasksLoading, error: tasksError, createTask, updateTask, deleteTask, moveTask } = useTasks(id);

  const [modal, setModal] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadProject() {
      setProjLoading(true);
      setProjError('');
      try {
        const data = await api.get(`/projects/${id}`);
        if (active) setProject(data);
      } catch (err) {
        if (active) setProjError(err.message);
      } finally {
        if (active) setProjLoading(false);
      }
    }
    loadProject();
    return () => {
      active = false; // avoid setting state after unmount
    };
  }, [id]);

  async function handleMove(taskId, status) {
    try {
      await moveTask(taskId, status);
    } catch (err) {
      alert(err.message);
    }
  }

  if (projLoading) {
    return <div className={styles.page}><div className={styles.state}>Loading project…</div></div>;
  }
  if (projError) {
    return (
      <div className={styles.page}>
        <div className={`${styles.state} ${styles.errorState}`}>
          <div>
            <div className={styles.stateTitle}>Can't open this project</div>
            {projError}
            <div style={{ marginTop: 16 }}>
              <button className={styles.back} onClick={() => navigate('/dashboard')}>
                <Icon name="chevd" size={14} style={{ transform: 'rotate(90deg)' }} /> Back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const swatchBg = `oklch(0.8 0.13 ${project.hue ?? 170} / 0.22)`;
  const swatchFg = `oklch(0.85 0.13 ${project.hue ?? 170})`;

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.back} onClick={() => navigate('/dashboard')}>
          <Icon name="chevd" size={14} style={{ transform: 'rotate(90deg)' }} /> Projects
        </button>
        <div className={styles.userArea}>
          <span className={styles.userName}>{user?.name}</span>
          <button className={styles.logout} onClick={logout}>Log out</button>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.titleWrap}>
          <div className={styles.swatch} style={{ background: swatchBg, color: swatchFg }}>
            <Icon name={project.icon || 'zap'} size={17} />
          </div>
          <h1 className={styles.projName}>{project.name}</h1>
          <span className={styles.count}>{tasks.length} tasks</span>
        </div>
        <button className={styles.newButton} onClick={() => setModal({ defaultStatus: 'todo' })}>
          <Icon name="plus" size={15} /> New task
        </button>
      </div>

      {tasksLoading ? (
        <div className={styles.state}>Loading tasks…</div>
      ) : tasksError ? (
        <div className={`${styles.state} ${styles.errorState}`}>{tasksError}</div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onOpenTask={(task) => setModal({ task })}
          onMove={handleMove}
          onNew={(status) => setModal({ defaultStatus: status })}
        />
      )}

      {modal && (
        <TaskModal
          task={modal.task || null}
          defaultStatus={modal.defaultStatus}
          onClose={() => setModal(null)}
          onSave={(fields) =>
            modal.task ? updateTask(modal.task._id, fields) : createTask(fields)
          }
          onDelete={modal.task ? () => deleteTask(modal.task._id) : undefined}
        />
      )}
    </div>
  );
}