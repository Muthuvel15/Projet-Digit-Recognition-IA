import React, { useRef, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [send, setSend] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionConfidence, setPredictionConfidence] = useState(null);
  
  
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPredictionResult(null);
    setPredictionConfidence(null); // Réinitialiser la confiance
    setSend(false);
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    const canvasData = canvas.toDataURL('image/png');
    sendData(canvasData);
  };

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const sendData = (canvasData) => {
    const headers = {
      'accept': 'application/json',
    };
    const fd = new FormData();
    const blob = dataURLtoBlob(canvasData);
    fd.append('images', blob, 'image.png');

    axios
      .post('http://127.0.0.1:8000/api/digits/', fd, { headers: headers })
      .then((res) => {
        setSend(true);
        setPredictionResult(res.data.result);
        setPredictionConfidence(res.data.confidence); // Mettre à jour la confiance
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Digit Recognition App</h1>
        {send && <div className="alert-info">Successfully sent for classification</div>}
        <canvas
          ref={canvasRef}
          width="200"
          height="200"
          style={{ border: '1px solid black', background: 'black' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
        <div>
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Predict Digit
          </button>
          <button
            onClick={resetCanvas}
            className="mt-4 ml-2 p-2 bg-red-500 text-white rounded"
          >
            Clear
          </button>
        </div>
        {predictionResult && (
  <div className="mt-4 p-4 border border-gray-300 rounded">
    <h2 className="text-2xl font-bold mb-2">Prediction Result:</h2>
    <p>Result: {predictionResult}</p>
    {predictionConfidence && <p>Confidence: {predictionConfidence.toFixed(2)}%</p>}
  </div>
)}
      </div>
    </div>
  );
};

export default Home;
