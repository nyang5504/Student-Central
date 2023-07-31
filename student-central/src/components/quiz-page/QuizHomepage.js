import React from 'react';
import '../../styles/quiz-page/QuizHomepage.css';
import QuizSearch from './QuizSearch';
import SavedQuizzes from './SavedQuizzes';
import { NavLink } from 'react-router-dom';

const QuizHomePage = () => {
    return (
        <div className="quizHome-container">
            <div className='quizHome-left'>
                <div className='quizHome-left-items'>
                    <QuizSearch/>
                    <div className='space-between' id="space-b-quiz"></div>
                    <NavLink 
                        onClick={() => window.reload()}
                        to="custom">
                        <button className='newQuiz-btn'>+</button>
                    </NavLink>
                    
                </div>
                
            </div>
            <div className='quizHome-right'>
                <SavedQuizzes/>
            </div>
        </div>
    );
};

export default QuizHomePage;