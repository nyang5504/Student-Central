import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import NotesSection from './NotesSection';
import "../styles/TodoListpage.css"

const TodoListPage = () => {

    const [sidebar1, setSidebar1] = useState([
        "Science",
        "Math"
    ]);

    const [sidebar2, setSidebar2] = useState([
        "Read chapter 4",
        "Study for midterm"
    ]);

    // useEffect({

    // })
    
    return (
        <div className="todolistpage-container">

            <div id="todolist-contents-div">
                <Sidebar myId={"sidebar1"} data={sidebar1} setData={setSidebar1}/>
                <Sidebar myId={"sidebar2"} data={sidebar2} setData={setSidebar2}/>

                <NotesSection/>
            </div>
            
        </div>
    );
};

export default TodoListPage;