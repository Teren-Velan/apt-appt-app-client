import React from "react";
import Axios from "axios";

function FriendsList({ userInfo, setUserInfo }) {
  console.log("userinfo: ", userInfo);
  async function toggleFriend(e) {
    console.log(e.target.value);
    let object = { username: e.target.value };
    try {
      let token = localStorage.token;
      await Axios.post("http://localhost:80/dashboard/addfriend", object, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let userData = await Axios.get("http://localhost:80/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(userData.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="friends-list-div">
        <h3>Friends list</h3>
        {userInfo.friendlist &&
          userInfo.friendlist.map((el, index) => (
            <div className="friend-card">
              <p>{el.username}</p>
              <button
                className="remove_friend_button"
                value={el.username}
                onClick={toggleFriend}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default FriendsList;
