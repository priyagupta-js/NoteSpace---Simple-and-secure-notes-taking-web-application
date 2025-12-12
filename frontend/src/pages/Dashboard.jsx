import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const fetchNotes = async (search = '') => {
    try {
      const res = await api.get('/notes', { params: { q: search } });
      setNotes(res.data);
    } catch (err) {
      // if unauthorized, redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      console.error(err);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <div>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="p-2 border rounded" />
          <button onClick={() => fetchNotes(q)} className="ml-2 p-2 bg-blue-600 text-white rounded">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.length === 0 && <div className="text-gray-500">No notes yet. Create one!</div>}
        {notes.map(n => (
          <div key={n._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm mt-2">{n.content}</p>
            <div className="mt-3 text-xs text-gray-500">{n.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
