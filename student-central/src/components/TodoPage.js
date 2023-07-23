import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NoteSection from './NoteSection';
import NoteList from './NoteList';
import '../styles/TodoPage.css';

const TodoPage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [folderNotes, setFolderNotes] = useState({});

  const [isFolderDeleted, setIsFolderDeleted] = useState(false);

  const [mounted, setMounted] = useState(false);
  console.log(folderNotes);
  // Function to create new folder, uses spread operator to create copy
  const handleAddFolder = (folderName) => {
    setFolderNotes((prevNotes) => ({
      ...prevNotes,
      // creates empty array
      [folderName]: [],
    }));
  };


  // Function to add note object to folder
  const handleAddNoteToFolder = (folderName, note) => {
    // Spread operator to create copy
    setFolderNotes((prevNotes) => ({
      ...prevNotes,
      // Combine previous notes array with new notes object 
      [folderName]: [...(prevNotes[folderName] || []), note],
    }));
  };

  // Function to delete a note
  const deleteNote = (folderName, noteToDelete) => {
    setFolderNotes((prevNotes) => ({
      ...prevNotes,
      // Find the note in the folder using filter
      [folderName]: prevNotes[folderName].filter((note) => note !== noteToDelete),
    }));
  };

  // Function to delete a folder and it's notes
const deleteFolder = (folderName) => {
  // Remove the folder and its notes
  setFolderNotes((prevNotes) => {
    const updatedNotes = { ...prevNotes };
    delete updatedNotes[folderName];
    setSelectedNote(null);
    //Render the new folders in the Sidebar
    return updatedNotes;
  });

  // Reset the selected folder and note if they were deleted
  if (selectedFolder === folderName) {
    setSelectedFolder(null);
    setSelectedNote(null);
    setIsFolderDeleted(true);
  }
};

useEffect(() => {
  const saveFolders = () => {
    try{
      console.log("SAVETODATABASE", JSON.stringify(folderNotes));
          fetch('http://localhost:4000/api/schedule/save-folders', {
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(folderNotes),
          credentials: 'include'
      })
    } catch (error) {
        console.log("error saveFolders", error);
    }

  }
  if(mounted){
    saveFolders();
  }
  //if mounting for the first time, dont save
  else{
    setMounted(true);
  }
  
}, [folderNotes])

useEffect(() => {
  const getFolders = () => {
    try{
      return fetch('http://localhost:4000/api/schedule/my-folders', {
          method:'GET',
          credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setFolderNotes(data));
    } catch (error) {
        console.log("error getFolders", error);
    }
  }

  getFolders();
}, [])

  return (
    <div className="todo-page">
      <Sidebar
        //Pass down props from Sidebar.js
        setSelectedFolder={setSelectedFolder}
        folders={Object.keys(folderNotes)}
        onAddFolder={handleAddFolder}
        onDeleteFolder={deleteFolder}
      />
      <NoteList
        // Pass down props to NotesList.js
        selectedFolder={selectedFolder}
        folderNotes={folderNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        onAddNoteToFolder={handleAddNoteToFolder}
        setFolderNotes={setFolderNotes}
        onDeleteNote={deleteNote}
        isFolderDeleted={isFolderDeleted}
      />
      <NoteSection
        // Pass down props from NoteSection.js
        selectedFolder={selectedFolder}
        selectedNote={selectedNote}
        folderNotes={folderNotes}
        setSelectedNote={setSelectedNote}
        setFolderNotes={setFolderNotes}
      />
    </div>
  );
};

export default TodoPage;
