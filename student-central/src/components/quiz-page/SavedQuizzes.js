import React, { useState, useEffect } from 'react';
import '../../styles/quiz-page/SavedQuizzes.css';

const SavedQuizzes = () => {
  const [allQuizzes, setAllQuizzes] = useState({});

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

  // Function to delete a quiz
  const handleDeleteQuiz = async (quizName) => {
    try {
      const response = await fetch(`http://localhost:4000/api/quiz/delete-quiz/${quizName}`, {
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
  
  return (
    <div className="saved-quizzes">
      <h2>Saved Quizzes</h2>
      <ul>
        {/*Maps the quizzes and each quiz can be deleted now*/ }
        {Object.keys(allQuizzes).map((quizName) => {
          return (
            <li key={quizName}>
              <span>{quizName}</span> 
              <button onClick={() => handleDeleteQuiz(quizName)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedQuizzes;