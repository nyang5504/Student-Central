import React, { useState } from 'react';

const WrittenChoice = (props) => {
  

  const handleInputChange = (e) => {
    const userAns = [...props.allUserAns];
    userAns[props.currentQuestionIndex] = e.target.value;
    props.setAllUserAns(userAns);
    
  };



  return (
    <div className="WrittenChoice-container">
      <h3>{props.question.term}</h3>
      <div className="answer-input">
        <input type="text" value={props.userAnswer} onChange={handleInputChange} />
      </div>
      
    </div>
  );
};

export default WrittenChoice;