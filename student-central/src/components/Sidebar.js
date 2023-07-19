import React from 'react';

const Sidebar = (props) => {

    const addOnClick = (e) =>{
        e.preventDefault();
        e.target.style.display = "none";
        e.target.parentNode.nextElementSibling.firstChild.style.display = "";
        e.target.parentNode.nextElementSibling.nextElementSibling.style.display = "";
    }
    const addNewItem = (e) => {
        e.preventDefault();
        const currentData = [...props.data];
        const updatedData = currentData.concat(e.target.sidebarInput.value);
        props.setData(updatedData);
    }

    return (
        <div className="sidebar-container" id={props.myId}>
            <ul style={{listStyleType: "none"}}>
                {props.data.map((item) =>{
                    return(
                        <li>{item}</li>
                    )
                }
                    
                )}
            </ul>
            <form>
                <input type="submit" value="Add" id="sidebarAdd" onClick={addOnClick}/>
                
            </form>
            <form onSubmit={addNewItem}>
                <input type = "text" id="sidebarInput" style={{display: "none"}}/>
            </form>
            <button id="sidebarAdd" style={{display: "none"}}> Cancel</button>
        </div>
    );
};

export default Sidebar;