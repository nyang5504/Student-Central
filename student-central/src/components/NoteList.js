import React from 'react';
import "../styles/NoteList.css"

const NoteList = ({ selectedFolder, folderNotes, selectedNote, setSelectedNote, onAddNoteToFolder, onDeleteNote, isFolderDeleted }) => {
  // Function to handle adding a new note
  const handleAddNote = () => {
    const newNote = {
      title: 'New Note',
      content: '',
    };
    // Call the onAddNoteToFolder function to add the new note to the selected folder
    onAddNoteToFolder(selectedFolder, newNote);
    // Set the new note as the selected note
    setSelectedNote(newNote);
  };

  // Function to handle deleting a note
  const handleDeleteNote = (note) => {
    // Call the onDeleteNote function to remove the note from the folder's notes array
    onDeleteNote(selectedFolder, note);
    // If the selected note is the one being deleted, clear the selected note
    if (selectedNote === note) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="notes-list">
      {/* Check if folder was recently deleted */}
      {isFolderDeleted ? (
        <p> No folder selected. </p>
      ): selectedFolder ? (
        <>
          <h2>All Notes in {selectedFolder}</h2>
          {/* Checks if selected folder exists and if there are notes in that folder */}
          {folderNotes[selectedFolder] && folderNotes[selectedFolder].length > 0 ? (
            // Iterates through array and renders each note in a div element
            folderNotes[selectedFolder].map((note, index) => (
              <div key={index} className={`note ${selectedNote === note ? 'selected' : ''}`}
              onClick={() => setSelectedNote(note)}>
                <h3>{note.title}</h3>
                {/* Add the delete button with an onClick event */}
                <button onClick={() => handleDeleteNote(note)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No notes available.</p>
          )}
          <button onClick={handleAddNote}>Add Note</button>
        </>
      ) : (
        <p>No folder selected.</p>
      )}
    </div>
  );
};

export default NoteList;
