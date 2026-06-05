import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProjects } from '../hooks/useProjects.js';
import ProjectCard from '../components/ProjectCard.jsx';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { projects, loading, error, createProject, deleteProject } = useProjects();

  // Local UI state for the create-project modal.
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  async function handleCreate(e) {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      await createProject({ name, description });
      setName('');
      setDescription('');
      setShowModal(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProject(id);
    } catch (err) {
      alert(err.message); // simple feedback if delete fails
    }
  }

  function renderContent() {
    if (loading) {
      return <div className={styles.state}>Loading your projects…</div>;
    }
    if (error) {
      return (
        <div className={`${styles.state} ${styles.errorState}`}>
          <div className={styles.stateTitle}>Couldn't load projects</div>
          {error}
        </div>
      );
    }
    if (projects.length === 0) {
      return (
        <div className={styles.state}>
          <div className={styles.stateTitle}>No projects yet</div>
          Create your first project to get started.
        </div>
      );
    }
    return (
      <div className={styles.grid}>
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} onDelete={handleDelete} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>P</div>
          <div className={styles.brandName}>Pro-Tasker</div>
        </div>
        <div className={styles.userArea}>
          <span className={styles.userName}>{user?.name}</span>
          <button className={styles.logout} onClick={logout}>Log out</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Projects</h1>
            <div className={styles.count}>
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>
          <button className={styles.newButton} onClick={() => setShowModal(true)}>
            + New project
          </button>
        </div>

        {renderContent()}
      </main>

      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>New project</h2>
            {formError && <div className={styles.modalError}>{formError}</div>}
            <form onSubmit={handleCreate}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="pname">Name</label>
                <input
                  id="pname"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Website Redesign"
                  required
                  autoFocus
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="pdesc">Description</label>
                <textarea
                  id="pdesc"
                  className={styles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this project about?"
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.save} disabled={saving}>
                  {saving ? 'Creating…' : 'Create project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}