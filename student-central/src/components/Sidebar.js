import React from 'react';

const Sidebar = (props) => {
    return (
        <div className="sidebar-container" id={props.myId}>
            <ul style={{listStyleType: "none"}}>
                {props.data.map((item) =>{
                    return(
                        <li>{item.section}</li>
                    )
                }
                    
                )}
            </ul>
            <form>
                <input type="submit" value="Add" style={{width: "100%"}}/>
            </form>
        </div>
    );
};

export default Sidebar;