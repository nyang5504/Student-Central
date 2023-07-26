import React from 'react';
import '../../styles/quiz-page/QuizNavigation.css';

const QuizNavigation = () => {
    return (
        <div className="QuizNavigation-container">
            <button className='quizNav-btn'>&lt; back</button>
            <button className='quizNav-btn'>next &gt;</button>
        </div>
    );
};

export default QuizNavigation;