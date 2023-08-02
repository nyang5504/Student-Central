import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StartQuizPage = () => {

    const { quizName } = useParams();
    const navigate = useNavigate();

    // Variable and structure for quiz questions
    const [quizData, setQuizData] = useState({
        quizName: '',
        questions: [
            {
                term: '',
                definition: '',
            },
        ],
    });

    // Track what type of quiz is being selected
    const [quizType, setQuizType] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/quiz/get-one-quiz/${quizName}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch quiz data.');
                }

                const data = await response.json();
                const quizData = {
                    quizName: quizName,
                    questions: data.map((question) => ({
                        term: question.term || '',
                        definition: question.definition || '',
                    })),
                };
                setQuizData(quizData);
            } catch (error) {
                console.log('Error fetching quiz data.', error);
            }
        };
        fetchQuizData();
    }, [quizName]);

    const handleQuizTypeSelection = (quizType) => {
        // Set the quizType when the user selects a quiz type
        setQuizType(quizType);

        // Navigate to the QuizQuestions.js with url as the quiz type
        navigate(`/quiz/${quizName}/questions?type=${quizType}`);
    };

    return (
        <div>
            <h2>Start Quiz: {quizData.quizName}</h2>
            <div>
                <p>Select Quiz Type:</p>
                <button
                    onClick={() => handleQuizTypeSelection('multipleChoice')}
                    className={quizType === 'multipleChoice' ? 'selected' : ''}
                >
                    Multiple Choice
                </button>
                <button
                    onClick={() => handleQuizTypeSelection('written')}
                    className={quizType === 'written' ? 'selected' : ''}
                >
                    Written Question
                </button>
                <button
                    onClick={() => handleQuizTypeSelection('both')}
                    className={quizType === 'both' ? 'selected' : ''}
                >
                    Both
                </button>
            </div>
        </div>
    );
};

export default StartQuizPage;
