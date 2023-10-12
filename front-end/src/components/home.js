import React, { useRef, useState } from 'react';
// import { saveAs } from 'file-saver';
import axios from 'axios';
import Header from './header';

const Home = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [send, setSend] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
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
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    const canvasData = canvas.toDataURL('image/png');
    console.log(canvasData);
    // saveAs(canvasData, 'digit.png');
    sendData(canvasData);
  };

  const sendData = (canvasData) => {
    const headers = {
      'accept': 'application/json',
    };
    const fd = new FormData();
    fd.append('images', canvasData);
    axios
      .post('http://127.0.0.1:8000/api/digits/', fd, { headers: headers })
      .then((res) => {
        console.log(res.data);
        setSend(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Digit Recognition App</h1>
        {send && <alert variant="info">Successfully sent for classification</alert>}
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
      </div>
    </div>
  );
};

export default Home;
