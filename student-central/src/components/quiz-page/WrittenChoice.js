import React, { useState } from 'react';
import '../../styles/quiz-page/WrittenChoice.css'

const WrittenChoice = (props) => {
  const handleInputChange = (e) => {
    const userAns = [...props.allUserAns];
    userAns[props.currentQuestionIndex] = e.target.value;
    props.setAllUserAns(userAns);
    
  };

  return (
    <div className="WrittenChoice-container">
      <div className="question-navigation">
              <button className= 'navigation-button' onClick={props.handlePreviousQuestion} disabled={props.currentQuestionCount === 0}>
                Previous Question
              </button>
              {props.currentQuestionCount === props.quizQuestionsList.length - 1 ? (
                <button className= 'navigation-button' onClick={() => props.setSubmitted(true)}>Submit Quiz</button>
              ) : (
                <button className= 'navigation-button' onClick={props.handleNextQuestion}>Next Question</button>
              )}
            </div>
            <div className='quizbox'>   
            <h3 className='question'>
                {props.question.term}
            </h3>
      <div className="answer-input">
        <input type="text" value={props.userAnswer} onChange={handleInputChange} />
      </div>
      </div>
    </div>
  );
};

export default WrittenChoice;