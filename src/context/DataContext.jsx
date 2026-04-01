import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);
const API = '/api/days';

export function DataProvider({ children }) {
  const [days, setDays]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // ── Load all days on mount ────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        setDays(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── CREATE day ────────────────────────────────────────────────────────────
  const createDay = useCallback(async ({ dayNumber, topic, question }) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dayNumber,
        title: `Day ${dayNumber}`,
        topic,
        question,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setDays(prev => [...prev, data].sort((a, b) => a.dayNumber - b.dayNumber));
    return data;
  }, []);

  // ── UPDATE day topic/question ─────────────────────────────────────────────
  const updateDay = useCallback(async (dayId, fields) => {
    const res = await fetch(`${API}/${dayId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setDays(prev => prev.map(d => d._id === dayId ? data : d));
    return data;
  }, []);

  // ── DELETE entire day ─────────────────────────────────────────────────────
  const deleteDay = useCallback(async (dayId) => {
    const res = await fetch(`${API}/${dayId}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    setDays(prev => prev.filter(d => d._id !== dayId));
  }, []);

  // ── ADD submission ────────────────────────────────────────────────────────
  const addSubmission = useCallback(async (dayId, submission) => {
    const res = await fetch(`${API}/${dayId}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setDays(prev => prev.map(d => d._id === dayId ? data : d));
    return data;
  }, []);

  // ── DELETE submission ─────────────────────────────────────────────────────
  const deleteSubmission = useCallback(async (dayId, subId) => {
    const res = await fetch(`${API}/${dayId}/submissions/${subId}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    setDays(prev =>
      prev.map(d =>
        d._id === dayId
          ? { ...d, submissions: d.submissions.filter(s => s._id !== subId) }
          : d
      )
    );
  }, []);

  return (
    <DataContext.Provider value={{
      days, loading, error,
      createDay, updateDay, deleteDay,
      addSubmission, deleteSubmission,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
