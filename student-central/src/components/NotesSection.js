import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../styles/NotesSection.css"

const NotesSection = (props) => {
    return (
        <div className="notes-section-container">
            <ReactQuill theme='snow'/>
        </div>
    );
};

export default NotesSection;