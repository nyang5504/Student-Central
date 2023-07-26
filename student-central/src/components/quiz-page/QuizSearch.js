import React from 'react';
import "../../styles/quiz-page/QuizSearch.css"

const QuizSearch = () => {
    return (
        <div className="quizSearch-container">
            <div className='searchbar-label'>Search For a Quiz</div>
            <div className='space-between'></div>
            <form>
                <input type='text'></input>

                <input type='submit' value="search"></input>
            </form>
        </div>
    );
};

export default QuizSearch;