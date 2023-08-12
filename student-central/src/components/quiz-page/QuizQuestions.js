import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../../styles/quiz-page/QuizQuestions.css';
// import "../components/SavedQuizCard"
// import QuizSideBar from './QuizSidebar';
import MultipleChoice from './MultipleChoice'
import WrittenChoice from './WrittenChoice'
import QuizResults from './QuizResults'
import QuizSideBar from './QuizSidebar';

const QuizQuestions = () => {
  const location = useLocation();
  const prevLocation = location.state.prevPath;
  const quizCreator = location.state.creator;
  console.log("prevLocation", location.state.prevPath);
  console.log("creator", location.state.creator);

  //get query param
  const params = new URLSearchParams(useLocation().search);
  const quizType = params.get('type');
  //get quiz name from param
  const { quizName } = useParams();

  const [quizData, setQuizData] = useState({
    quizName: '',
    questions: [
      {
        term: '',
        definition: '',
      },
    ],
  });
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [quizQuestionsList, setQuizQuestionsList] = useState([]);
  const [allUserAns, setAllUserAns] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //helper function that returns a random type, either written or multiple choice
  const getRandomType = () => {
    //if quiz type was both, then we choose a type randomly
    if (quizType == "both") {
      let randomNum = Math.floor(Math.random() * 10) + 1;
      if (randomNum % 2 == 0) { return "multipleChoice" }
      else { return "written" }
    }
    else {
      //if quiz type was not both, we use that quiz type for the question type
      return quizType;
    }
  }

  //helper function to shuffle the order of questions, so that each time user takes quiz, the order is different
  const createQuestionOrder = (defs) => {
    const questionOrder = [];
    for (let i = 0; i < defs.length; i++) {
      questionOrder.push(i);
    }
    shuffleArr(questionOrder);
    return questionOrder;
  }

  //shuffles any array you give it
  const shuffleArr = (arr) => {
    //starting from the last element, choose an random element before it two swap with
    for (let i = arr.length - 1; i > 0; i--) {
      let numToSwap = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[numToSwap];
      arr[numToSwap] = temp;
    }
  }

  //given an answer and a list of all definitions within the quiz, create a 4 element array containing choices for a single question
  const createMCChoices = (answer, defs) => {
    //create a copy of the list of defintions, excluding the answer
    const firstIdx = defs.findIndex(x => x === answer);
    const defsCopy = defs.filter((def, index) => index != firstIdx);
    //empty array to store choices
    const arrMC = [];
    //get a random number to decide where the answer will appear within the array of choices
    let randomNum = Math.floor(Math.random() * 4);
    //loop 4 times to fill up arrMC
    for (let i = 0; i < 4; i++) {
      //if this is not the index where the answer will be, randomly select a definition from the list of all definitions and place it in arrMC.
      if (i != randomNum) {
        let randomDefIdx = Math.floor(Math.random() * defsCopy.length);
        arrMC.push(defsCopy[randomDefIdx]);
        //remove chosen definition from the definitions array so it doesn't get chosen again
        defsCopy.splice(randomDefIdx, 1);
      }
      else {
        arrMC.push(answer);
      }
    }
    return arrMC;
  }

  const quizSetup = (quizdata, defs) => {
    //first get the question ordering
    const qORder = createQuestionOrder(defs);
    const entireQuiz = [];
    for (let i = 0; i < qORder.length; i++) {
      const questionInfo = {};
      questionInfo.questionType = getRandomType();
      questionInfo.term = quizdata.questions[qORder[i]].term;
      const ans = quizdata.questions[qORder[i]].definition;
      // console.log("questionType", questionInfo.questionType);

      //the object will only have choices if it is a multiple choice question
      if (questionInfo.questionType === "multipleChoice") {
        questionInfo.choices = createMCChoices(ans, defs);
      }
      questionInfo.answer = ans;

      // console.log("questionInfo", questionInfo);
      entireQuiz.push(questionInfo);
      // console.log("entireQuiz", entireQuiz);

    }
    //update useState variable
    setQuizQuestionsList(entireQuiz);

    //this is used to track user answers. It starts with no user answer
    const emptyAns = [];
    for (let i = 0; i < entireQuiz.length; i++) {
      emptyAns.push("");
    }
    setAllUserAns(emptyAns);
  }

  //useEffect to get quiz data for quiz clicked on earlier
  useEffect(() => {
    const fetchQuizData = async () => {
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
          // map out questions from database. Empty string is default
          questions: data.questions.map((question) => ({
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

    if (!quizCreator) {
      fetchQuizData();
    }
    else {
      fetchQuizDataSearch(quizCreator);
    }
  }, [])

  //once quiz data is fetched, we can organize that information to prepare for quiz taking
  useEffect(() => {
    const alldefinitions = quizData.questions.map((question) => question.definition);
    console.log("alldefinitions", alldefinitions);
    quizSetup(quizData, alldefinitions);
  }, [quizData])

  //Save user answer and moves to next question
  const handleNextQuestion = () => {
    setCurrentQuestionCount((prevIndex) => prevIndex + 1);
  };

  //Save user answer and moves to previous question
  const handlePreviousQuestion = () => {
    setCurrentQuestionCount((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="QuizQuestions-container">
      
      {/* Buffer for our state variables to get their values before using them. Without this, we would have an error */}
      {quizQuestionsList.length === 0 ? (
        <div>Loading...</div>
      ) : submitted ? (<QuizResults allUserAns={allUserAns} quizQuestionsList={quizQuestionsList} />) :
        (
          <>
            <QuizSideBar allUserAns={allUserAns} setCurrentQuestionCount={setCurrentQuestionCount} currentQuestionCount={currentQuestionCount} />
            {quizQuestionsList[currentQuestionCount].questionType === 'multipleChoice' ? (
              <MultipleChoice
                question={quizQuestionsList[currentQuestionCount]}
                setAllUserAns={setAllUserAns}
                allUserAns={allUserAns}
                currentQuestionIndex={currentQuestionCount}
                handleNextQuestion = {handleNextQuestion}
                handlePreviousQuestion = {handlePreviousQuestion}
                setSubmitted = {setSubmitted}
                quizQuestionsList = {quizQuestionsList}
                currentQuestionCount = {currentQuestionCount}
              />
            ) : (
              <WrittenChoice
                question={quizQuestionsList[currentQuestionCount]}
                currentQuestionIndex={currentQuestionCount}
                setAllUserAns={setAllUserAns}
                allUserAns={allUserAns}
                userAnswer={allUserAns[currentQuestionCount] || ''}
                setCurrentQuestionCount={setCurrentQuestionCount}
                handleNextQuestion = {handleNextQuestion}
                handlePreviousQuestion = {handlePreviousQuestion}
                setSubmitted = {setSubmitted}
                quizQuestionsList = {quizQuestionsList}
                currentQuestionCount = {currentQuestionCount}
              />
            )}
          </>
        )}
    </div>
  );
};

export default QuizQuestions;