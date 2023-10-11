import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
//import {saveAs} from 'file-saver';
import '../App.css';
import './header';
import Header from './header';

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

  const resetCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  const handleSubmit = () => {
    const canvas = ReactSketchCanvas
    console.log(canvas)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      < Header/>
    <br/> <br/>      
      <div style={canvasWrapperStyles}>
        <ReactSketchCanvas
          ref={canvasRef}
          style={styles}
          width='280px'
          height='280px'
          strokeWidth={10}
          strokeColor="green"
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
      <br/>
      <div>
      <h3 className="text-4xl font-bold mb-4">prediction</h3>
      <p>data</p>
      </div>
      
      

    
    </div>
  );
};

export default Home;
