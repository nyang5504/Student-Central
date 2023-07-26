import React from 'react';
import "../../styles/quiz-page/SavedQuizzes.css"
import SavedQuizCard from './SavedQuizCard';

const SavedQuizzes = () => {
    return (
        <div className="savedQuizzes-container">
            <SavedQuizCard/>
            <SavedQuizCard/>
            <SavedQuizCard/>
            <SavedQuizCard/>
            <SavedQuizCard/>
            <SavedQuizCard/>
            <SavedQuizCard/>
            <SavedQuizCard/>
        </div>
    );
};

export default SavedQuizzes;