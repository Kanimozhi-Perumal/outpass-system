import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FaceRecognition from '../components/FaceRecognition';

function ParentApproval() {
  const { outpassId } = useParams();
  const [outpass, setOutpass] = useState(null);
  const [faceVerified, setFaceVerified] = useState(false);

  useEffect(() => {
    const fetchOutpass = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/outpass/${outpassId}/qr`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOutpass(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchOutpass();
  }, [outpassId]);

  const handleApprove = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/outpass/${outpassId}/parent-approve`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setOutpass(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!outpass) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4">Parent Approval</h2>
      {!faceVerified ? (
        <FaceRecognition
          onSuccess={() => setFaceVerified(true)}
          onError={(err) => console.error('Face recognition failed:', err)}
        />
      ) : (
        <div className="p-4 bg-white rounded shadow">
          <p><strong>Reason:</strong> {outpass.reason}</p>
          <p><strong>Status:</strong> {outpass.status}</p>
          {outpass.status === 'pending' && (
            <button
              onClick={handleApprove}
              className="mt-4 bg-green-600 text-white p-2 rounded"
            >
              Approve Outpass
            </button>
          )}
          {outpass.status === 'approved' && (
            <p className="text-green-600">Outpass Approved!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ParentApproval;