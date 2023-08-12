import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import '../../styles/quiz-page/StartQuizpage.css';

const StartQuizPage = (props) => {
    const location = useLocation();

    const { quizName } = useParams();
    const navigate = useNavigate();

    const prevLocation = location.state.prevPath;
    const quizCreator = location.state.creator;

    console.log("prevLocation", location.state.prevPath);
     console.log("creator", location.state.creator);

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
        const fetchQuizDataUser = async () => {
            try {
                const response = await fetch(`/api/quiz/get-one-quiz/${quizName}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch quiz data.');
                }

                const data = await response.json();
                const quizData = {
                    quizName: quizName,
                    questions: data.questions.map((question) => ({
                        term: question.term || '',
                        definition: question.definition || '',
                    })),
                };
                setQuizData(quizData);
            } catch (error) {
                console.log('Error fetching quiz data.', error);
            }
        };

        const fetchQuizDataSearch = async (creator) => {
            try {
                const response = await fetch(`/api/quiz/one-quiz-from-all/${quizName}/${creator}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch quiz data.');
                }

                const data = await response.json();
                const quizData = {
                    quizName: quizName,
                    questions: data.questions.map((question) => ({
                        term: question.term || '',
                        definition: question.definition || '',
                    })),
                };
                setQuizData(quizData);
            } catch (error) {
                console.log('Error fetching quiz data.', error);
            }
        };

        if(!quizCreator){
            fetchQuizDataUser();
        }
        else{
            fetchQuizDataSearch(quizCreator);
        }
        // fetchQuizData();
    }, [quizName]);

    const handleQuizTypeSelection = (quizType) => {
        // Set the quizType when the user selects a quiz type
        setQuizType(quizType);

        // Navigate to the QuizQuestions.js with url as the quiz type
        navigate(`/quiz/${quizName}/questions?type=${quizType}`, {
            state:{prevPath: location.pathname, creator: quizCreator}
        });
        // <Link to={`/quiz/${quizName}/questions?type=${quizType}`}
        //       state={{prevPath: location.pathname, creator: quizCreator}}></Link>
    };

    return (
        <div className="startQuiz-container">
            <div className="startQuiz-container-contents">
            <div className='Type'>
                <p>Select Quiz Type:</p>
                <button
                    onClick={() => handleQuizTypeSelection('multipleChoice')}
                    className={`quiz-type-btn ${quizType === 'multipleChoice' ? 'selected' : ''}`}
                >
                    Multiple Choice
                </button>
                <button
                    onClick={() => handleQuizTypeSelection('written')}
                    className={`quiz-type-btn ${quizType === 'written' ? 'selected' : ''}`}
                >
                    Written Question
                </button>
                <button
                    onClick={() => handleQuizTypeSelection('both')}
                    className={`quiz-type-btn ${quizType === 'both' ? 'selected' : ''}`}
                >
                    Both
                </button>
            </div>
            </div>
        </div>
    );
};

export default StartQuizPage;