import { useEffect } from 'react';

function FaceRecognition({ onSuccess, onError }) {
  useEffect(() => {
    const faceio = new window.faceIO(process.env.REACT_APP_FACEIO_PUBLIC_ID);
    faceio.authenticate()
      .then(userInfo => onSuccess(userInfo))
      .catch(err => onError(err));
  }, [onSuccess, onError]);

  return <div>Initializing Face Recognition...</div>;
}

export default FaceRecognition;