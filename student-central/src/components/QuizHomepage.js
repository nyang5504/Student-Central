import React from 'react';
import '../styles/QuizHomepage.css';
import QuizSearch from './QuizSearch';
import SavedQuizzes from './SavedQuizzes';

const QuizHomePage = () => {
    return (
        <div className="quizHome-container">
            <div className='quizHome-left'>
                <QuizSearch/>
                <button className='newQuiz'>+</button>
            </div>
            <div className='quizHome-right'>
                <SavedQuizzes/>
            </div>
        </div>
    );
};

export default QuizHomePage;