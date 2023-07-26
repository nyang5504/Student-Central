import React from 'react';
import QuizNavigation from './QuizNavigation';
import QuizContent from './QuizContent';
import QuizCompletionBar from './QuizCompletionBar';
import '../../styles/quiz-page/QuizArea.css';

const QuizArea = () => {
    return (
        <div className="QuizArea-container">
            <QuizNavigation/>
            <QuizContent/>
            <QuizCompletionBar/>
        </div>
    );
};

export default QuizArea;