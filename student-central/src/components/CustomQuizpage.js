import React from 'react';
import 'react-quill/dist/quill.bubble.css';
import '../styles/CustomQuizpage.css';
import CustomQuizCard from './CustomQuizCard';

const CustomQuizPage = () => {
    return (
        <div className="customQuizpage-container">
            <div className="left-padding"></div>
            <div className='customQuiz-right'>
                <div className='createQuizTitle'>Create Custom Quiz</div>
                
                <label htmlFor='quizTitle'>Title: </label>
                <input
                    id="quizTitle"
                    type="text"
                    placeholder="Enter Title"
                />
                <CustomQuizCard/>
                <CustomQuizCard/>
                <CustomQuizCard/>
                <CustomQuizCard/>
                <CustomQuizCard/>
                <CustomQuizCard/>

                <button>Add Card</button>
                <button>Save Quiz</button>
            </div>
        </div>
    );
};

export default CustomQuizPage;