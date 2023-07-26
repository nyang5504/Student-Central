import React from 'react';
import '../styles/QuizContent.css';

const QuizContent = () => {
    return (
        <div className="QuizContent-container">
            <div className='quiz-question'>What is Newton's Second Law?</div>
            <div className="questionAnswer-padding"></div>
            <div className='answerChoice-container'>
                <div className='answerChoice'>f=ma</div>
                <div className='answerChoice'>m=fa</div>
                <div className='answerChoice'>g=9.8</div>
                <div className='answerChoice'>g=f/m</div>
            </div>
        </div>
    );
};

export default QuizContent;