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
        fetch('/api/quiz/all-quizzes')
            .then((response) => response.json())
            .then((data) => {
                console.log("allquizData", data);
                setAllQuizzes(data);
            })
            .catch((error) => {
                console.error('Error fetching quizzes:', error);
            });
    }, []);

    useEffect(() => {
        // Use the search term from the URL
        console.log("useEffect!!!")
        setSearchTerm(searchTermParam || '');
        // Filter quizzes based on the search term
        // const filtered = Object.keys(allQuizzes).reduce((result, quizName) => {
        //     if (quizName.toLowerCase().includes(searchTermParam.toLowerCase())) {
        //         return { ...result, quizName };
        //     }
        //     return result;
        // }, {});
        console.log("query", queryParams);
        console.log("search", searchTermParam);

        const filtered = {};
        Object.keys(allQuizzes).forEach((user) => { filtered[user] = allQuizzes[user].filter(quiz => quiz.toLowerCase().includes(searchTermParam.toLowerCase())) })

        console.log("filtered", filtered);
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
                        {Object.keys(filteredQuizzes).map((creatorName) => (
                            filteredQuizzes[creatorName].map((quizName) =>
                                <li key={quizName}>
                                    <span>{quizName} by: {creatorName}</span>
                                    <Link to={`/quiz/start-quiz/${quizName}`}
                                        state={{ prevPath: location.pathname, creator: creatorName }}>Start</Link>
                                </li>
                            )

                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default QuizSearch;
