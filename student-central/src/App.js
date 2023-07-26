import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import NavBar from "./components/NavBar";
import SchedulePage from './components/Schedulepage';
import "./App.css"

import TodoPage from './components/TodoPage';
import Footer from './components/Footer';
import QuizHomePage from './components/QuizHomepage';
import CustomQuizPage from './components/CustomQuizpage';
import StartQuizPage from './components/StartQuizpage';
import PendingQuizPage from './components/PendingQuizpage';

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
            <Route path='/startQuiz' element={<StartQuizPage />} />
            <Route path='/pendingQuiz' element={<PendingQuizPage />} />
        </Routes>
        </div>
        <Footer/>
        </div>
        
    );
};

export default App;