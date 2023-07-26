import React from 'react';
import '../../styles/quiz-page/QuizHomepage.css';
import QuizSearch from './QuizSearch';
import SavedQuizzes from './SavedQuizzes';

const QuizHomePage = () => {
    return (
        <div className="quizHome-container">
            <div className='quizHome-left'>
                <div className='quizHome-left-items'>
                    <QuizSearch/>
                    <div className='space-between' id="space-b-quiz"></div>
                    <button className='newQuiz-btn'>+</button>
                </div>
                
            </div>
            <div className='quizHome-right'>
                <SavedQuizzes/>
            </div>
        </div>
    );
};

export default QuizHomePage;