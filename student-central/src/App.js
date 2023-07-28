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
import SavedQuizzes from './components/quiz-page/SavedQuizzes';
import PendingQuizPage from './components/quiz-page/PendingQuizpage';

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
            <Route path='/quiz' element={<QuizHomePage />} />
            <Route path='/customQuiz' element={<CustomQuizPage />} />
            <Route path='/savedQuiz' element={<SavedQuizzes />} />
            <Route path='/pendingQuiz' element={<PendingQuizPage />} />
        </Routes>
        </div>
        <Footer/>
        </div>
        
    );
};

export default App;