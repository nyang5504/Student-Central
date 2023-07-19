import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import SchedulePage from './components/Schedulepage';
import TodoListPage from './components/TodoListpage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<SchedulePage/>}/>
            <Route path='/list' element={<TodoListPage/>}/>
        </Routes>
    );
};

export default App;