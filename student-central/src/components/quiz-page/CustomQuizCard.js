import React from 'react';
import "../../styles/quiz-page/CustomQuizpage.css" 

const CustomQuizCard = (props) => {

    const handleFormChange = (e) => {
        const updatedContents = [...props.quizContents];
        updatedContents[props.index][e.target.name] = e.target.value;
        props.setQuizContents(updatedContents);
    }

    return (
        <div className="customQuizCard-container">
            <input
                className='term-input'
                type="text"
                placeholder="Term"
                value={props.term}
                name="term"
                onChange={handleFormChange}
            />
            <input
                className='def-input'
                type="text"
                placeholder="Definition"
                value={props.def}
                name="definition"
                onChange={handleFormChange}
            />
        </div>
    );
};

export default CustomQuizCard;