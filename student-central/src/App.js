import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Register from './components/user-profile/Register';
import Login from './components/user-profile/Login';
import Profile from './components/user-profile/Profile';
import NavBar from "./components/NavBar";
import SchedulePage from './components/schedule-page/Schedulepage';
import "./App.css"

import TodoPage from './components/todo-page/TodoPage';
import Footer from './components/Footer';
import QuizHomePage from './components/quiz-page/QuizHomepage';
import CustomQuizPage from './components/quiz-page/CustomQuizpage';
import EditQuiz from './components/quiz-page/EditQuiz';
import StartQuizpage from './components/quiz-page/StartQuizpage';
import QuizQuestions from './components/quiz-page/QuizQuestions';
import QuizSearch from './components/quiz-page/QuizSearch';



const App = () => {
  return (
    <div className='overall-container'>
      <NavBar />
      <div className='center'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path='/list' element={<TodoPage />} />

          <Route path='/quiz'>
            <Route index element={<QuizHomePage />} />
            <Route path='custom' element={<CustomQuizPage />} />
            <Route path='start-quiz/:quizName' element={<StartQuizpage />} />
            <Route path="edit-quiz/:quizName" element={<EditQuiz />} />
            <Route path=":quizName/questions" element={<QuizQuestions/>} />
            <Route path="search" element={<QuizSearch />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
