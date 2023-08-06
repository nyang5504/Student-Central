import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizResults = (props) => {

    const navigate = useNavigate();
    //returns the number of questions answered correctly
    const calcNumCorrect = () =>{
        let correct = 0;
        for(let i = 0; i < props.allUserAns.length; i++){
            if(props.quizQuestionsList[i].answer === props.allUserAns[i]){
                correct++;
            }
        }
        return correct;
    }

    return (
        <div className="QuizResults-container">
            <div>Correct: {calcNumCorrect()}/{props.allUserAns.length}</div>
            <div>Percentage: {((calcNumCorrect()/props.allUserAns.length) * 100).toFixed(2)}%</div>
            <button onClick={() => navigate('/quiz')}>Done</button>
        </div>
    );
};

export default QuizResults;