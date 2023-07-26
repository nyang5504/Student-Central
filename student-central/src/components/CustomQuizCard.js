import React from 'react';
import '../styles/CustomQuizCard.css';

const CustomQuizCard = () => {
    return (
        <div className="customQuizCard-container">
            <input
                className='term-input'
                type="text"
                placeholder="Term"
            />
            <input
                className='def-input'
                type="text"
                placeholder="Definition"
            />
        </div>
    );
};

export default CustomQuizCard;