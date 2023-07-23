import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ setSelectedFolder, folders, onAddFolder, onDeleteFolder}) => {
  const [newFolderName, setNewFolderName] = useState('');

  // Function to set the current folder being used and edited
  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
  };

  // Function to make a new folder
  const handleCreateFolder = () => {
    // Checks if the name is not empty
    if (newFolderName.trim() !== '') {
      onAddFolder(newFolderName);
      setNewFolderName('');
    }
  };

  // Function to delete a folder
  const handleDeleteFolder = (folderName) => {
    onDeleteFolder(folderName); 
  };

  return (
    <div className="sidebar">
      {/* Iterates over the folder array and creates a new array of div elements to render */}
      {folders.map((folder, index) => (
        <div key={index} onClick={() => handleFolderClick(folder)}>
          {folder}
          <button onClick={() => handleDeleteFolder(folder)}>Delete</button>
        </div>
      ))}
      <div>
        <input
          // Textbox for users to create a folder
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
        />
        <button onClick={handleCreateFolder}>Add Folder</button>
      </div>
    </div>
  );
};

export default Sidebar;

