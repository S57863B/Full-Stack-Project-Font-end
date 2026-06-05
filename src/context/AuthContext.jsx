import { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken, setToken, clearToken } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const me = await api.get('/auth/me');
        setUser(me);
      } catch {
        clearToken(); // token was invalid/expired — discard it
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(email, password) {
    const data = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  }

  async function register(name, email, password) {
    const data = await api.post('/auth/register', { name, email, password });
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}