import { useState, useEffect } from 'react';
import axios from 'axios';
import OutpassForm from '../components/OutpassForm';

function StudentDashboard() {
  const [outpasses, setOutpasses] = useState([]);

  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/outpass/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOutpasses(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchOutpasses();
  }, []);

  const handleSuccess = (newOutpass) => {
    setOutpasses([...outpasses, newOutpass]);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4">Student Dashboard</h2>
      <OutpassForm onSuccess={handleSuccess} />
      <h3 className="text-xl mt-6 mb-2">Your Outpasses</h3>
      <div className="grid gap-4">
        {outpasses.map(outpass => (
          <div key={outpass._id} className="p-4 bg-white rounded shadow">
            <p><strong>Reason:</strong> {outpass.reason}</p>
            <p><strong>Status:</strong> {outpass.status}</p>
            {outpass.status === 'approved' && (
              <a href={`/qr/${outpass._id}`} className="text-blue-600">View QR Code</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;