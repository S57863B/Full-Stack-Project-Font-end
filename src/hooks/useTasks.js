import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api.js';

export function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError('');
    try {
      const data = await api.get(`/projects/${projectId}/tasks`);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  async function createTask(fields) {
    const created = await api.post(`/projects/${projectId}/tasks`, fields);
    setTasks((prev) => [...prev, created]);
    return created;
  }

  async function updateTask(taskId, fields) {
    const updated = await api.put(`/projects/${projectId}/tasks/${taskId}`, fields);
    // Replace the changed task in place.
    setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
    return updated;
  }

  async function deleteTask(taskId) {
    await api.delete(`/projects/${projectId}/tasks/${taskId}`);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  }

  // Convenience used by drag-and-drop: change only a task's status.
  async function moveTask(taskId, status) {
    setTasks((prev) => prev.map((t) => (t._id === taskId ? { ...t, status } : t)));
    try {
      await api.put(`/projects/${projectId}/tasks/${taskId}`, { status });
    } catch (err) {
      load();
      throw err;
    }
  }

  return { tasks, loading, error, reload: load, createTask, updateTask, deleteTask, moveTask };
}