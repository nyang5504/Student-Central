import React from 'react';
import QuizSideBarCard from './QuizSideBarCard';
import '../styles/QuizSideBar.css';

const QuizSideBar = () => {
    return (
        <div className="QuizSideBar-container">
            <QuizSideBarCard/>
            <QuizSideBarCard/>
            <QuizSideBarCard/>
            <QuizSideBarCard/>
            <QuizSideBarCard/>
            <QuizSideBarCard/>
        </div>
    );
};

export default QuizSideBar;