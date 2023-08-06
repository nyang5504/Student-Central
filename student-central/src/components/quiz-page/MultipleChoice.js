import React, { useState } from 'react';

const MultipleChoice = (props) => {

    const handleChoiceClick = (e) => {
        const userAns = [...props.allUserAns];
        userAns[props.currentQuestionIndex] = e.target.value;
        console.log("userAnsMC", userAns);
        props.setAllUserAns(userAns);
        // console.log(chosen);
    }

    return (
        <div className="MultipleChoice-container">
            <h3 className='question'>
                {props.question.term}
            </h3>
            <div>
                {props.question.choices.map((choice) => 
                    {return <button value={choice} disabled={props.allUserAns[props.currentQuestionIndex] == choice} onClick={handleChoiceClick} className='mc-btn'>{choice}</button>})}
            </div>
        </div>
    );
};

export default MultipleChoice;