import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';

function QRDisplay() {
  const { outpassId } = useParams();
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/outpass/${outpassId}/qr`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setQrCode(res.data.qrCode);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchQRCode();
  }, [outpassId]);

  return (
    <div className="container mx-auto mt-10 text-center">
      <h2 className="text-2xl mb-4">Outpass QR Code</h2>
      {qrCode ? (
        <QRCode value={qrCode} size={256} />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
}

export default QRDisplay;