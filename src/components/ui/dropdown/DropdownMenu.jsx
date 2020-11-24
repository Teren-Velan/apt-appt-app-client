import React from 'react';
import {NavLink} from "react-router-dom"

function DropdownMenu({type, list, logout}) {
  let render = ""

  if (type === "profile") {
    render = [
      <>
        <div className="arrow-div"></div>
        <div className="dropdown-div">
          <div className="dropdown-card">Profile</div>
          <NavLink to="/login" className="dropdown-card" onClick={logout}>Logout</NavLink>
        </div>
      </>
    ]
  } else if (type === "upcomingEvents") {
    render = [
      <>
        <div className="arrow-div"></div>
        <div className="dropdown-div">
          <div className="dropdown-card">Event1</div>
          <div className="dropdown-card">Event1</div>
        </div>
      </>
    ]
  }


  return (
    <>
      {render}
    </>
  );
}

export default DropdownMenu;
