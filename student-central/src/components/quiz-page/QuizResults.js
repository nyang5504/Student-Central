import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/quiz-page/QuizResults.css';

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
            <div className='Results-Container'>
                <p className='Title'>Quiz Results</p>
                <div className='Result'>
                    <p>Correct: {calcNumCorrect()}/{props.allUserAns.length}</p>
                    <p>Percentage: <span className='Percentage'>{((calcNumCorrect()/props.allUserAns.length) * 100).toFixed(2)}%</span></p>
                </div>
                <button className='done-btn' onClick={() => navigate('/quiz')}>Done</button>
            </div>
        </div>
    );
    
};

export default QuizResults;