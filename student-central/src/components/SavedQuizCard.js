import React from 'react';
import "../styles/SavedQuizCard.css"

const SavedQuizCard = () => {
    return (
        <div className="savedQuizCard-container">
            <div>Quiz Title</div>
            <button className='deleteQuiz-btn'>Delete</button>
        </div>
    );
};

export default SavedQuizCard;