import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../../styles/quiz-page/QuizQuestions.css';
// import "../components/SavedQuizCard"
// import QuizSideBar from './QuizSidebar';
import MultipleChoice from './MultipleChoice'
import WrittenChoice from './WrittenChoice'

const QuizQuestions = () => {
    const params = new URLSearchParams(useLocation().search);
    const { quizName } = useParams();
    const quizType = params.get('quizType');
    const [quizData, setQuizData] = useState({
        quizName: '',
        questions: [
            {
                term: '',
                definition: '',
            },
        ],
    });
    const alldefinitions = quizData.questions.map((question) => question.definition);
    const randomType = () => {
        let randomNum = Math.random() * 10 + 1;
        if (randomNum % 2 == 0) {return "multipleChoice"}
        else {return "written"}
    }

    const [questionType, setQuestionType] = useState("");
    const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
    
    const quizSetup = () => {
        const questionOrder = [];
        for(let i = 0; i < alldefinitions.length; i++){
            questionOrder.push(i);
        }
        shuffleArr(quizSetup);
        return questionOrder;
    }

    const shuffleArr = (arr) => {
        for(let i = arr.length-1; i > 0; i++){
            let numToSwap = Math.floor(Math.random() * (i+1));
            let temp = arr[i];
            arr[i] = arr[numToSwap];
            arr[numToSwap] = temp;
        }
    }
    // const [quizOrder, setQuizOrder] = useState(quizSetup());

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
                    // map out questions from database. Empty string is default
                    questions: data.map((question) => ({
                        term: question.term || '',
                        definition: question.definition || '',
                    })),
                };
                // Update the state with the retrieved data
                console.log("quizData", quizData);
                setQuizData(quizData);
            } catch (error) {
                console.log('Error fetching quiz data.', error);
            }
        };
        fetchQuizData();

        const questionOrder = quizSetup();
        
        // const initialQuestionType = () => {
        //     if (quizType == "multipleChoice") {

        //     }
        // }
    },[])

    // useEffect(() => {

    // }, [currentQuestionCount])

    return (
        <div className="QuizQuestions-container">
            {/* <QuizSideBar/> */}
            {questionType == "multipleChoice" ? <MultipleChoice /> : <WrittenChoice />}


        </div>
    );
};

export default QuizQuestions;