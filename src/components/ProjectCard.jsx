import { useNavigate } from 'react-router-dom';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  const swatchBg = `oklch(0.8 0.13 ${project.hue ?? 170} / 0.22)`;
  const swatchFg = `oklch(0.85 0.13 ${project.hue ?? 170})`;
  const initial = (project.name || '?').charAt(0).toUpperCase();

  function handleDelete(e) {
    e.stopPropagation();
    if (window.confirm(`Delete "${project.name}"? This also deletes its tasks.`)) {
      onDelete(project._id);
    }
  }

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/projects/${project._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/projects/${project._id}`);
      }}
    >
      <button
        className={styles.delete}
        onClick={handleDelete}
        aria-label={`Delete ${project.name}`}
        title="Delete project"
      >
        ✕
      </button>

      <div className={styles.swatch} style={{ background: swatchBg, color: swatchFg }}>
        {initial}
      </div>

      <div className={styles.name}>{project.name}</div>
      <div className={styles.desc}>
        {project.description || 'No description yet.'}
      </div>
      <div className={styles.meta}>
        Created {new Date(project.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}