import React from 'react';
import '../../styles/quiz-page/PendingQuizpage.css';
import "./SavedQuizCard"
import QuizSideBar from './QuizSideBar';
import QuizArea from './QuizArea';

const PendingQuizPage = () => {
    return (
        <div className="pendingQuiz-container">
            <QuizSideBar/>
            <QuizArea/>
            
        </div>
    );
};

export default PendingQuizPage;