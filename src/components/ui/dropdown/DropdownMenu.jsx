import React from 'react';

function DropdownMenu({type, list, logout}) {
  let render = ""

  if (type === "profile") {
    render = [
      <>
        <div className="arrow-div"></div>
        <div className="dropdown-div">
          <div className="dropdown-card">Profile</div>
          <div className="dropdown-card" onClick={logout}>Logout</div>
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
