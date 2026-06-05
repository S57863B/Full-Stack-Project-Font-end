import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api.js';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function createProject(fields) {
    const created = await api.post('/projects', fields);
    setProjects((prev) => [created, ...prev]);
    return created;
  }
  
  async function deleteProject(id) {
    await api.delete(`/projects/${id}`);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  }

  return { projects, loading, error, reload: load, createProject, deleteProject };
}