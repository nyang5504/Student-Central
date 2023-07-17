import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../styles/TodoListpage.css"

const TodoListPage = () => {

    const [sidebar1, setSidebar1] = useState([
        {section: "Science"},
        {section: "Math"}
    ]);

    const [sidebar2, setSidebar2] = useState([
        {section: "Read chapter 4"},
        {section: "Study for midterm"}
    ]);

    // useEffect({

    // })
    
    return (
        <div className="todolistpage-container">

            <div id="todolist-contents-div">
                <Sidebar myId={"sidebar1"} data={sidebar1}/>
                <Sidebar myId={"sidebar2"} data={sidebar2}/>

                <ReactQuill theme='snow'/>
            </div>
            
        </div>
    );
};

export default TodoListPage;