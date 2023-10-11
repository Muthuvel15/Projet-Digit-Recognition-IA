import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import '../App.css'
import {saveAs} from 'file-saver'
const Home = () => {
  const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };

  const canvasWrapperStyles = {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '280px',
    height: '280px',
  };

  const canvasRef = useRef(null);
 
  const handleSubmit = async () => {
    const canvasData = await canvasRef.current.exportImage('png');
    console.log(canvasData);
    saveAs(canvasData, 'digit.png');
    sendData(canvasData)
}

  const resetCanvas = () => {
    canvasRef.current.clearCanvas();
    
  };
  //here we were use axios to send data to database
const sendData=(c)=>{
  console.log(c)
}
const getImageResult=(id)=>{
  
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Digit Recognition App</h1>
      
      <div style={canvasWrapperStyles}>
        <ReactSketchCanvas
          ref={canvasRef}
          style={styles}
          width='280px'
          height='280px'
          strokeWidth={10}
          strokeColor="green"
          imageFormat='jpg'
          lineWidth={60}
        />
      </div>
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
        clear
      </button>

      </div>
    
    </div>
  );
};

export default Home;
