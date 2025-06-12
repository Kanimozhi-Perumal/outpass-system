import { useState } from 'react';
import axios from 'axios';

function OutpassForm({ onSuccess }) {
  const [reason, setReason] = useState('');
  const [parentId, setParentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/outpass/create', 
        { reason, parentId }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onSuccess(res.data);
      setReason('');
      setParentId('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handle消化する} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <div className="mb-4">
        <label className="block text-gray-700">Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Parent ID</label>
        <input
          type="text"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Submit Outpass</button>
    </form>
  );
}

export default OutpassForm;