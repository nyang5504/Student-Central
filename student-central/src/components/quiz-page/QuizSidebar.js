import React from 'react';
import "../../styles/quiz-page/QuizSidebar.css"

const QuizSidebar = (props) => {

    const handleSidebarClick = (idx) => {
        props.setCurrentQuestionCount(idx);
    }

    return (
        <div className="QuizSideBar-container">
            {props.allUserAns.map((ans, idx) => {return <div onClick={()=>{handleSidebarClick(idx)}} className={'quiz-sidebar-selection' + " " + (ans === "" ? "question-incomplete" : "question-complete") + " " + (props.currentQuestionCount === idx ? "question-selected" : "not-selected")}>Question {idx+1}</div>})}
        </div>
    );
};

export default QuizSidebar;