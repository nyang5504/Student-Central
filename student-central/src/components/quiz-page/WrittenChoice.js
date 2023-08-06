import React, { useState } from 'react';

const WrittenChoice = (props) => {
  const { question, setCurrentQuestionCount } = props;
  const [userAnswer, setUserAnswer] = useState('');

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    // Save the user's answer and move to the next question
    props.onAnswerChange(userAnswer);
    setCurrentQuestionCount((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionCount((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="WrittenChoice-container">
      <h3>{question.term}</h3>
      <div className="answer-input">
        <input type="text" value={userAnswer} onChange={handleInputChange} />
      </div>
      
    </div>
  );
};

export default WrittenChoice;