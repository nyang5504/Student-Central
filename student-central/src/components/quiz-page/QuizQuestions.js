import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../../styles/quiz-page/QuizQuestions.css';
// import "../components/SavedQuizCard"
// import QuizSideBar from './QuizSidebar';
import MultipleChoice from './MultipleChoice'
import WrittenChoice from './WrittenChoice'

const QuizQuestions = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(useLocation().search);
  const { quizName } = useParams();
  const quizType = params.get('type');
  console.log("quiztype begin", quizType);
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
  const [userAnswers, setUserAnswers] = useState({});
  const [allUserAns, setAllUserAns] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  // if(quizQuestionsList.length != 0){
  //     console.log("quizQuestionsList", quizQuestionsList[0]);
  // }

  const getRandomType = () => {
    if (quizType == "both") {
      let randomNum = Math.floor(Math.random() * 10) + 1;
      if (randomNum % 2 == 0) { return "multipleChoice" }
      else { return "written" }
    }
    else {
      return quizType;
    }
  }

  const createQuestionOrder = (defs) => {
    const questionOrder = [];
    for (let i = 0; i < defs.length; i++) {
      questionOrder.push(i);
    }
    shuffleArr(questionOrder);
    // questionOrder.shuffle();
    return questionOrder;
  }

  const createMCChoices = (answer, defs) => {
    let randomNum = Math.floor(Math.random() * 4);
    const defsCopy = defs.filter(def => def != answer);
    const arrMC = [];
    for (let i = 0; i < 4; i++) {
      if (i != randomNum) {
        let randomDefIdx = Math.floor(Math.random() * defsCopy.length);
        arrMC.push(defsCopy[randomDefIdx]);
        defsCopy.splice(randomDefIdx, 1);
      }
      else {
        arrMC.push(answer);
      }
    }
    return arrMC;
  }

  const quizSetup = (quizdata, defs) => {
    const qORder = createQuestionOrder(defs);
    console.log("qOrder", qORder);
    setQuestionOrder(qORder);
    const entireQuiz = [];
    for (let i = 0; i < qORder.length; i++) {
      const questionInfo = {};
      //set type
      questionInfo.questionType = getRandomType();
      questionInfo.term = quizdata.questions[qORder[i]].term;
      const ans = quizdata.questions[qORder[i]].definition;
      console.log("questionType", questionInfo.questionType);
      if (questionInfo.questionType === "multipleChoice") {
        questionInfo.choices = createMCChoices(ans, defs);
      }
      questionInfo.answer = ans;

      console.log("questionInfo", questionInfo);
      entireQuiz.push(questionInfo);
      console.log("entireQuiz", entireQuiz);

    }
    setQuizQuestionsList(entireQuiz);

    const emptyAns = [];
    for (let i = 0; i < entireQuiz.length; i++) {
      emptyAns.push("");
    }
    setAllUserAns(emptyAns);
  }

  const shuffleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let numToSwap = Math.floor(Math.random() * (i + 1));
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
  }, [])

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

  const handleAnswerChange = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionCount]: answer,
    }));
  };

  //Save user answer(doesnt work yet) and moves to next question
  const handleNextQuestion = () => {
    handleAnswerChange(currentQuestionCount, userAnswers);
    setCurrentQuestionCount((prevIndex) => prevIndex + 1);
  };

  //Save user answer(doesnt work yet) and moves to previous question
  const handlePreviousQuestion = () => {
    handleAnswerChange(currentQuestionCount, userAnswers);
    setCurrentQuestionCount((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="QuizQuestions-container">
      {quizQuestionsList.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Quiz: {quizData.quizName}</h2>
          {quizQuestionsList[currentQuestionCount].questionType === 'multipleChoice' ? (
            <MultipleChoice
              question={quizQuestionsList[currentQuestionCount]}
              onAnswerChange={handleAnswerChange}
              setAllUserAns={setAllUserAns}
              allUserAns={allUserAns}
              currentQuestionIndex={currentQuestionCount}
            />
          ) : (
            <WrittenChoice
              question={quizQuestionsList[currentQuestionCount]}
              currentQuestionIndex={currentQuestionCount}
              onAnswerChange={handleAnswerChange}
              setAllUserAns={setAllUserAns}
              allUserAns={allUserAns}
              userAnswer={allUserAns[currentQuestionCount] || ''}
              setCurrentQuestionCount={setCurrentQuestionCount}

            />
          )}

          <div className="question-navigation">
            <button onClick={handlePreviousQuestion} disabled={currentQuestionCount === 0}>
              Previous Question
            </button>
            {currentQuestionCount === quizQuestionsList.length - 1 ? (
              <button onClick={() => navigate('/quiz')}>Submit Quiz</button>
            ) : (
              <button onClick={handleNextQuestion}>Next Question</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizQuestions;