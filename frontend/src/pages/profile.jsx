import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me');
      setUser(res.data);
      setName(res.data.name || '');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const onSave = async () => {
    try {
      const res = await api.put('/users/me', { name });
      setUser(res.data);
      alert('Saved');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border mb-2 rounded" />
      <button onClick={onSave} className="p-2 bg-blue-600 text-white rounded">Save</button>
    </div>
  );
}
