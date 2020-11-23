import React from 'react';

function FriendsList({friends}) {



  return (
    <>
      <div className="friends-list-div">
        <h3>Friends list</h3>

        <div className="friend-card">
          <p>nero</p>
          <button>Add</button>
        </div>

      </div>
    </>
  );
}

export default FriendsList;