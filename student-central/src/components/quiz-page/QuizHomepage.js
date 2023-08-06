import React, { useState } from 'react';
import '../../styles/quiz-page/QuizHomepage.css';
import QuizSearch from './QuizSearch';
import SavedQuizzes from './SavedQuizzes';
import { NavLink, useNavigate } from 'react-router-dom';

const QuizHomePage = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Redirect to QuizSearch.js with the search term as a query parameter
        navigate(`/quiz/search?term=${searchTerm}`);
    };

    return (
        <div className="quizHome-container">
            <div className='quizHome-left'>
                <div className='quizHome-left-items'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for quizzes..."
                    />
                    <button onClick={handleSearchSubmit}>Search</button>

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