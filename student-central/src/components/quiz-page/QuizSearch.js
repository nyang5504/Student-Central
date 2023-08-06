import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/quiz-page/QuizSearch.css';

const QuizSearch = () => {
    const [allQuizzes, setAllQuizzes] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuizzes, setFilteredQuizzes] = useState({});

    // Use useLocation hook to get the search term from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTermParam = queryParams.get('term') || '';

    //Retrieves every quiz from every user
    useEffect(() => {
        fetch('http://localhost:4000/api/quiz/all-quizzes')
            .then((response) => response.json())
            .then((data) => {
                setAllQuizzes(data);
            })
            .catch((error) => {
                console.error('Error fetching quizzes:', error);
            });
    }, []);

    useEffect(() => {
        // Use the search term from the URL
        setSearchTerm(searchTermParam || '');
        // Filter quizzes based on the search term
        const filtered = Object.keys(allQuizzes).reduce((result, quizName) => {
            if (quizName.toLowerCase().includes(searchTermParam.toLowerCase())) {
                return { ...result, [quizName]: allQuizzes[quizName] };
            }
            return result;
        }, {});
        setFilteredQuizzes(filtered);
    }, [searchTermParam, allQuizzes]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // handle when user wants to make another search
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        //Changes the url
        window.location.href = `/quiz/search?term=${encodeURIComponent(searchTerm)}`;
    };

    return (
        <div className="quiz-search">
            <h2>Quiz Search</h2>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for quizzes..."
                />
                <button type="submit">Search</button>
            </form>
            <div className="quiz-list">
                {Object.keys(filteredQuizzes).length === 0 ? (
                    <p>No quizzes found.</p>
                ) : (
                    <ul>
                        {Object.keys(filteredQuizzes).map((quizName) => (
                            <li key={quizName}>
                                <span>{quizName}</span>
                                <Link to={`/quiz/start-quiz/${quizName}`}>Start Quiz</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default QuizSearch;
