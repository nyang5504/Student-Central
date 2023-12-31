import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/quiz-page/SavedQuizzes.css';

const SavedQuizzes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allQuizzes, setAllQuizzes] = useState({});

  // Retrieve all of the user's quizzes from the database
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await fetch('/api/quiz/my-quizzes', {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          navigate('/login');
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

  // Function to delete a quiz
  const handleDeleteQuiz = async (quizName) => {
    try {
      const response = await fetch(`/api/quiz/delete-quiz/${encodeURIComponent(quizName)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to delete quiz.');
      }
      // Create a shallow copy of the allQuizzes object and removes the deleted quiz
      const updatedQuizzes = { ...allQuizzes };
      delete updatedQuizzes[quizName];
      // Update the state with the new copy
      setAllQuizzes(updatedQuizzes);
    } catch (error) {
      console.log('Error deleting quiz:', error);
    }
  };
  // console.log(allQuizzes);
  
  return (
    <div className="saved-quizzes">
      <h2>Saved Quizzes</h2>
      <ul>
        {/* Maps the quizzes and each quiz can be started or deleted now */}
        {Object.keys(allQuizzes).map((quizName) => {
          return (
            <li key={quizName}>
              <span>{quizName}</span>
              {/* Start quiz button which redirects user to start quiz page for that quiz */}
              <Link to={`start-quiz/${encodeURIComponent(quizName)}`}
              state={{prevPath: location.pathname}}>Start</Link>
              {/* Edit quiz button which redirects user to edit quiz page for that quiz */}
              <Link to={`edit-quiz/${encodeURIComponent(quizName)}`}>Edit</Link>
              <button onClick={() => handleDeleteQuiz(quizName)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedQuizzes;