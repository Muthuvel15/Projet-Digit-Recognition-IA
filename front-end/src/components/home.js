import React, { useRef, useEffect, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { saveAs } from 'file-saver';
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from 'react-simple-captcha';
import '../App.css';
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

  const [userInput, setUserInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(null);
  const [showSketchCanvas, setShowSketchCanvas] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    loadCaptchaEnginge(6); // 6 is the length of the captcha
  }, []);

  const handleSubmit = async () => {
    if (showSketchCanvas) {
      const canvasData = await canvasRef.current.exportImage('png');
      console.log(canvasData);
      saveAs(canvasData, 'digit.png');
      // You can send data or do something else with the canvasData here
    } else {
      const isValid = validateCaptcha(userInput);
      setIsCaptchaValid(isValid);

      if (isValid) {
        alert('Captcha validated! You can now use the prediction functionality.');
        setShowSketchCanvas(true); // Show the sketch canvas after validation
      } else {
        alert('Invalid captcha, please try again.');
        setShowSketchCanvas(false); // Hide the sketch canvas if validation fails
      }
    }
  };

  const resetCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Digit Recognition App</h1>
        
        {!showSketchCanvas && (
          <>
            <LoadCanvasTemplate />
            <input 
              type="text" 
              value={userInput} 
              onChange={handleInputChange} 
              placeholder="Enter Captcha"
              className="mb-4 p-2 border rounded"
            />
            <button 
              onClick={handleSubmit}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Validate Captcha
            </button>
          </>
        )}

        {showSketchCanvas && (
          <>
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
                Clear
              </button>
            </div>
          </>
        )}

        {isCaptchaValid === false && <p style={{color: 'red'}}>Invalid captcha, please try again.</p>}
      </div>
    </div>
  );
};

export default Home;
