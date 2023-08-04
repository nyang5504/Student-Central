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
    const quizType = params.get('type');
    console.log("quiztype begin",quizType);
    const [quizData, setQuizData] = useState({
        quizName: '',
        questions: [
            {
                term: '',
                definition: '',
            },
        ],
    });
    const [questionType, setQuestionType] = useState("");
    const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
    const [questionOrder, setQuestionOrder] = useState([]);
    
    const [quizQuestionsList, setQuizQuestionsList] = useState([]);

    // if(quizQuestionsList.length != 0){
    //     console.log("quizQuestionsList", quizQuestionsList[0]);
    // }

    const getRandomType = () => {
        if(quizType == "both"){
            let randomNum = Math.floor(Math.random() * 10) + 1;
            if (randomNum % 2 == 0) {return "multipleChoice"}
            else {return "written"}
        }
        else{
            return quizType;
        }
    }

    const createQuestionOrder = (defs) => {
        const questionOrder = [];
        for(let i = 0; i < defs.length; i++){
            questionOrder.push(i);
        }
        shuffleArr(questionOrder);
        // questionOrder.shuffle();
        return questionOrder;
    }

    const createMCChoices = (answer, defs) => {
        let randomNum = Math.random() * 4;
        const arrMC = [];
        for(let i = 0; i < 4; i++){
            if(i != randomNum){
                let randomDefIdx = Math.floor(Math.random() * defs.length);
                arrMC.push(defs[randomDefIdx]);
            }
            else{
                arrMC.push(answer);
            }
        }
        return arrMC;
    }

    const quizSetup = (quizdata, defs) => {
        const qORder = createQuestionOrder(defs);
        console.log("qOrder",qORder);
        setQuestionOrder(qORder);
        const entireQuiz = [];
        for(let i = 0; i < qORder.length; i++){
            const questionInfo = {};
            //set type
            questionInfo.questionType = getRandomType();
            questionInfo.term = quizdata.questions[qORder[i]].term;
            const ans = quizdata.questions[qORder[i]].definition;
            console.log("questionType", questionInfo.questionType);
            if(questionInfo.questionType === "multipleChoice"){
                questionInfo.choices = createMCChoices(ans, defs);
            }
            questionInfo.answer = ans;

            console.log("questionInfo", questionInfo);
            entireQuiz.push(questionInfo);
            console.log("entireQuiz", entireQuiz);
            
        }
        setQuizQuestionsList(entireQuiz);
    }

    const shuffleArr = (arr) => {
        for(let i = arr.length-1; i > 0; i--){
            let numToSwap = Math.floor(Math.random() * (i+1));
            let temp = arr[i];
            arr[i] = arr[numToSwap];
            arr[numToSwap] = temp;
        }
    }

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
    },[])
        
    useEffect(() => {
        const alldefinitions = quizData.questions.map((question) => question.definition);
        console.log("alldefinitions", alldefinitions);
        quizSetup(quizData, alldefinitions);
    }, [quizData])

    // useEffect(() => {
    //     console.log("quizQuestionsList",quizQuestionsList.length);
    // }, [quizQuestionsList])
    
    // useEffect(() => {
    //     if(quizQuestionsList.length != 0){
    //         console.log(quizQuestionsList);
    //     }
    // },[quizQuestionsList])
    // useEffect(() => {

    // }, [currentQuestionCount])

    return (
        <div className="QuizQuestions-container">
            {/* <QuizSideBar/> */}
            {(quizQuestionsList.length === 0) ? <div>Loading</div> :
            (quizQuestionsList[currentQuestionCount].questionType == "multipleChoice") ? 
            <MultipleChoice 
                question={quizQuestionsList[currentQuestionCount]} 
                setCurrentQuestionCount={setCurrentQuestionCount}/> : 
            <WrittenChoice 
                question={quizQuestionsList[currentQuestionCount]} 
                setCurrentQuestionCount={setCurrentQuestionCount}/>
            }


        </div>
    );
};

export default QuizQuestions;