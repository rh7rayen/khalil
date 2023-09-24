import React, { useState, useEffect } from "react";
import "./style.css"; // Import your CSS file for styling

const VerifCode = () => {
  const [codeInputs, setCodeInputs] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      } else {
        // When the countdown reaches 0, perform the delete action
        deleteCode();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [secondsLeft]);

  const handleInputChange = (index, value) => {
    // Clone the codeInputs array and update the value at the specified index
    const updatedCodeInputs = [...codeInputs];
    updatedCodeInputs[index] = value;
    setCodeInputs(updatedCodeInputs);
  };

  const deleteCode = () => {
    // Perform the delete action here (e.g., make an API request to delete the code)
    // Reset the codeInputs and secondsLeft when the code is deleted
    setCodeInputs(["", "", "", ""]);
    setSecondsLeft(60);
  };

  const handleSubmit = () => {
    // Perform the submit action here (e.g., sending the code to the server)
    // You can access the codeInputs array to get the entered code
    console.log("Submitted code:", codeInputs.join(""));
  };

  return (
    <div className="verif-container">
      <h1>Verification Code</h1>
      <div className="code-inputs">
        {codeInputs.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <p className="timer">Time remaining: {secondsLeft} seconds</p>
      <button className="submit-button" onClick={handleSubmit}>
        Submit Code
      </button>
    </div>
  );
};

export default VerifCode;
