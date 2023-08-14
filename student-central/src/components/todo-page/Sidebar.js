import React, { useState } from 'react';
import addButton from '../../assets/add-button.PNG';
import deleteButton from '../../assets/delete-button.PNG';

const Sidebar = ({ selectedFolder, setSelectedFolder, folders, onAddFolder, onDeleteFolder, setSelectedNote }) => {
  const [newFolderName, setNewFolderName] = useState('');

  // Function to set the current folder being used and edited
  const handleFolderClick = (folderName) => {
    console.log("folders", folders);
    setSelectedNote(null);
    setSelectedFolder(folderName);

  };

  // Function to make a new folder
  const handleCreateFolder = () => {
    // Checks if the name is not empty
    if (newFolderName.trim() !== '') {
      onAddFolder(newFolderName);
      setNewFolderName('');
    } else {
      alert("Please enter a folder name");
      return;
    }
  };

  // Function to delete a folder
  const handleDeleteFolder = (folderName) => {
    onDeleteFolder(folderName);
  };

  return (
    <div className="sidebar">
      {folders.map((folder, index) => (
        <div key={index} className={`folder ${selectedFolder === folder ? 'selected-folder' : ''}`}>
          <button className="delete-button" onClick={() => handleDeleteFolder(folder)}>
            <img src={deleteButton} alt="Delete" />
          </button>
          <div onClick={() => handleFolderClick(folder)}>
            {folder}
          </div>
        </div>
      ))}
      <div className="new-folder">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
        />
        <button className="add-button" onClick={handleCreateFolder}>
          <img src={addButton} alt="Add Folder" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;