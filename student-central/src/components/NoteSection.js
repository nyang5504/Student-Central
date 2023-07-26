import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const NoteSection = ({ selectedNote, setSelectedNote, folderNotes, selectedFolder, setFolderNotes }) => {
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  // Use effect to update ReactQuill to show saved note content and title
  useEffect(() => {
    if (selectedNote) {
      setNoteTitle(selectedNote.title);
      setNoteContent(selectedNote.content);
    } else {
      setNoteTitle('');
      setNoteContent('');
    }
  }, [selectedNote]);

  // Function to handle updating the selected note
  const updateNote = () => {
    //Check if there's a selected note
    if (selectedNote) {
      // Takes new note information
      const updatedNote = {
        ...selectedNote,
        title: noteTitle,
        content: noteContent,
      };

      // Find the index of the selected note in the array of folderNotes
      const index = folderNotes[selectedFolder].findIndex((note) => note === selectedNote);

      //Checks if the index is valid
      if (index !== -1) {
        // Creates copy of the array of notes in the folder
        const updatedFolderNotes = [...folderNotes[selectedFolder]];
        // Updates the note
        updatedFolderNotes[index] = updatedNote;

        // Update the folder state with the updated array of notes
        setFolderNotes((prevNotes) => ({
          ...prevNotes,
          [selectedFolder]: updatedFolderNotes,
        }));
        setSelectedNote(updatedNote);
      }
    }
  };

  return (
    <div className="note-section">
      {/* Condition to check if there's a selected note */}
      {selectedNote ? (
        <>
          <div className="note-editor">
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note Title"
            />
            <ReactQuill value={noteContent} onChange={setNoteContent} />
          </div>
          <button onClick={updateNote}>Update Note</button>
        </>
      ) : (
        <p>No note selected.</p>
      )}
    </div>
  );
};

export default NoteSection;
