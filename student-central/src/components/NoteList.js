import React from 'react';
import addButton from '../assets/add-button.PNG';
import deleteButton from '../assets/delete-button.PNG';


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
      {isFolderDeleted ? (
        <p>No folder selected.</p>
      ) : selectedFolder ? (
        <>
          <h2>All Notes in {selectedFolder}</h2>
          {folderNotes[selectedFolder] && folderNotes[selectedFolder].length > 0 ? (
            folderNotes[selectedFolder].map((note, index) => (
              <div
                key={index}
                className={`note ${selectedNote === note ? 'selected-note' : ''}`}
                onClick={() => setSelectedNote(note)}
              >
                <button className="delete-button" onClick={() => handleDeleteNote(note)}>
                  <img src={deleteButton} alt="Delete" />
                </button>
                <div>
                  <h3>{note.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>No notes available.</p>
          )}
          <button className="add-button" onClick={handleAddNote}>
            <img src={addButton} alt="Add Note" />
          </button>
        </>
      ) : (
        <p>No folder selected.</p>
      )}
    </div>
  );
};

export default NoteList;