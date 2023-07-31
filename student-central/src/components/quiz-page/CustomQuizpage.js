import React, { useState, useEffect } from 'react';
import '../../styles/quiz-page/CustomQuizpage.css';

const QuizForm = () => {
    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState([{ term: '', definition: '' }]);
    const [allQuizzes, setAllQuizzes] = useState({});

    const [mounted, setMounted] = useState(false);
  
    // Updates the state when changes are made in the form
    const handleQuestionChange = (index, field, value) => {
      const updatedQuestions = [...questions];
      // Updates the index in the array and the field(term/def).
      updatedQuestions[index][field] = value;
      setQuestions(updatedQuestions);
    };
  
    // Adds new term and definition
    const handleAddQuestion = () => {
      setQuestions([...questions, { term: '', definition: '' }]);
    };
  
    // Changes index, removes question from array , and updates state
    const handleRemoveQuestion = (index) => {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    };
  
    // Save the Quiz in an array of arrays
    const handleSaveQuiz = () => {
      // Checks if the terms/def has values
      if (quizName.trim() === '' || questions.some((q) => !q.term || !q.definition)) {
        alert('Please provide a quiz name and fill in all terms and definitions.');
        return;
      }
      const copyAllQuizzes = {...allQuizzes};
      copyAllQuizzes[quizName] = questions;
      setAllQuizzes(copyAllQuizzes);
      // Resets the form
      setQuizName('');
      setQuestions([{ term: '', definition: '' }]);
      window.location.href = '/quiz'
    };

    // Saves quiz in database
    useEffect(() => {
      const saveQuiz = () => {
        try{
            fetch('http://localhost:4000/api/quiz/save-quiz', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allQuizzes),
            credentials: 'include'
            })
        } catch (error) {
            console.log("error saveQuiz", error);
        }
      }
      if(mounted){
        saveQuiz();
      }
      //if mounting for the first time, dont save
      else{
        setMounted(true);
      }    
    }, [allQuizzes])

    // Retrieves quizzes from database
    useEffect(() => {
      const getQuizzes = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/quiz/my-quizzes', {
            method: 'GET',
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch quizzes.');
          }
          const data = await response.json();
          setAllQuizzes(data);
        } catch (error) {
          console.log('Error getting quizzes:', error);
        }
      }; 
      getQuizzes();
    }, []);

    return (
      <div className="customQuizpage">
        <div className="createQuizTitle">
          <h2>Create Custom Quiz</h2>
        </div>
        {/*Quiz Name form*/}
        <div className="question-container">
          <label>Quiz Name:</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>
        {/*Form and inputs for the question. Maps them out */}
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <label>Term:</label>
            <input
              type="text"
              value={question.term}
              onChange={(e) => handleQuestionChange(index, 'term', e.target.value)}
            />
            <label>Definition:</label>
            <textarea
              value={question.definition}
              onChange={(e) => handleQuestionChange(index, 'definition', e.target.value)}
            />
            {/*If the number of questions is greater than 1, than the remove button appears */}
            {questions.length > 1 && (
              <button type="button" onClick={() => handleRemoveQuestion(index)}>
                Remove Question
              </button>
            )}
          </div>
        ))}
        <div className='buttons-container'>
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
          <button type="button" onClick={handleSaveQuiz}>
            Save Quiz
          </button>
        </div>
      </div>
    );
  };
  
  export default QuizForm;