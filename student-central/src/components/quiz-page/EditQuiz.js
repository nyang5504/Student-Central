import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/quiz-page/EditQuiz.css';

const EditQuiz = () => {
    const { quizName } = useParams();
    const navigate = useNavigate();

    // Variable and structure for quiz questions
    const [quizData, setQuizData] = useState({
        quizName: '',
        publicize: '',
        questions: [
            {
                term: '',
                definition: '',
            },
        ],
    });

    // Fetches the quiz data from the server based on quizName
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
                    publicize: data.publicize,
                    // map out questions from database. Empty string is default
                    questions: data.questions.map((question) => ({
                        term: question.term || '',
                        definition: question.definition || '',
                    })),
                };
                // Update the state with the retrieved data
                // console.log(quizData);
                setQuizData(quizData);
            } catch (error) {
                console.log('Error fetching quiz data.', error);
            }
        };
        fetchQuizData();
    }, [quizName]);

    // Update properties of the questions in the array
    const handleChange = (event, index, field) => {
        const { name, value } = event.target;
        // Updates quizData with a new object
        setQuizData((prevData) => ({
            ...prevData,
            // Iterates over question array with the new data
            questions: prevData.questions.map((questionData, i) =>
                // checks if the current index matches the new index, then updates the property
                i === index ? { ...questionData, [field]: value } : questionData
            ),
        }));
    };

    // Function to add question
    const handleAddQuestion = () => {
        // Updates quizData with new question in array using spread operator
        setQuizData((prevData) => ({
            ...prevData,
            questions: [
                ...prevData.questions,
                {
                    term: '',
                    definition: '',
                },
            ],
        }));
    };

    // Function to remove question
    const handleRemoveQuestion = (index) => {
        setQuizData((prevData) => ({
            ...prevData,
            // filter method is used to iterate over prev array. 
            questions: prevData.questions.filter((_, i) => i !== index),
        }));
    };

    // Save changes to database
    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/quiz/edit-quiz/${quizName}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            });

            if (!response.ok) {
                throw new Error('Failed to save changes.');
            }

            const data = await response.json();
            console.log('Server Response:', data);
            // Redirects user to Quiz homepage once an edit is made
            navigate('/quiz');
        } catch (error) {
            console.log('Error saving changes:', error);
        }
    };

    return (
        <div className="editQuizpage-container">
            <div className="editQuizpage-container">
                <div className="edit-quiz">
                    <div className='QuizTitle'>
                        <h2>Edit Quiz:  {quizData.quizName}</h2>
                        <div>
                            <input
                                type='radio'
                                id='private-btn'
                                name='public-private'
                                value={"private"}
                                checked={quizData === 'private' ? "true" : "false"}
                                // onClick={() => setPublicized("private")}
                            />
                            <label htmlFor='private-btn'>private</label>
                            &nbsp; |
                            <input
                                type='radio'
                                id='public-btn'
                                name='public-private'
                                value={"public"}
                                checked={quizData === 'public' ? "true" : "false"}
                                // onClick={() => setPublicized("public")}
                            />
                            <label htmlFor='public-btn'>public</label>

                        </div>
                    </div>
                    <div className="question-container">
                        <div className="question-container-contents">
                            <ul className='ul'>
                                {/*Condition to check if there are questions */}
                                {quizData.questions &&
                                    // Iterates over questions in the quiz to show terms/definition
                                    quizData.questions.map((questionData, index) => (
                                        // Renders list of questions
                                        // Index + 1 is to track question(term/def) number.
                                        <li key={index}>
                                            <label> Term: </label>
                                            <input
                                                className="term-input"
                                                type="text"
                                                name={`term${index + 1}`}
                                                value={questionData.term || ''}
                                                onChange={(e) => handleChange(e, index, 'term')}
                                                placeholder={`Term ${index + 1}`}
                                            />
                                            <label> Definition: </label>
                                            <input
                                                className="def-input"
                                                name={`definition${index + 1}`}
                                                value={questionData.definition || ''}
                                                onChange={(e) => handleChange(e, index, 'definition')}
                                                placeholder={`Definition ${index + 1}`}
                                            />
                                            <button className="remove-question-btn" onClick={() => handleRemoveQuestion(index)}>Remove</button>
                                        </li>
                                    ))}

                            </ul>
                        </div>
                    </div>
                    <div className="edit-quiz-buttons-container">
                        <button type="button" id="add-question-btn" onClick={handleAddQuestion}>Add Question</button>
                        <button type="button" id="save-quiz-btn" onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuiz;

