import React from 'react';
import '../styles/StartQuizpage.css';

const StartQuizPage = () => {
    return (
        <div className="startQuiz-container">
            <div className='startQuiz-title'>Type of Quiz</div>
            <button className='startQuiz-btn'>Multiple Choice</button>
            <button className='startQuiz-btn'>Written</button>
            <button className='startQuiz-btn'>Both</button>
        </div>
    );
};

export default StartQuizPage;