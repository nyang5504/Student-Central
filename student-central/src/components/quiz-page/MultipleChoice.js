import React, { useState } from 'react';
import '../../styles/quiz-page/MultipleChoice.css';

const MultipleChoice = (props) => {
    const [selectedChoice, setSelectedChoice] = useState(null);

    const handleChoiceClick = (e) => {
        const userAns = [...props.allUserAns];
        userAns[props.currentQuestionIndex] = e.target.value;
        props.setAllUserAns(userAns);
        setSelectedChoice(e.target.value);
    }

    return (
        <div className="MultipleChoice-container">
            <div className="question-navigation">
                <button className='navigation-button' onClick={props.handlePreviousQuestion} disabled={props.currentQuestionCount === 0}>
                    Back
                </button>
                {props.currentQuestionCount === props.quizQuestionsList.length - 1 ? (
                    <button className='navigation-button' onClick={() => props.setSubmitted(true)}>Submit Quiz</button>
                ) : (
                    <button className='navigation-button' onClick={props.handleNextQuestion}>Next</button>
                )}
            </div>
            <div className='quizbox'>
                <h3 className='question'>
                    {props.question.term}
                </h3>
                <div className='choices'>
                    {props.question.choices.map((choice) => { return <button value={choice} disabled={props.allUserAns[props.currentQuestionIndex] == choice} onClick={handleChoiceClick} className='mc-btn'>{choice}</button> })}
                </div>
            </div>
        </div>
    );
};

export default MultipleChoice;