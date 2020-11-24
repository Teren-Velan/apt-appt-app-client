import React from "react";
import Axios from "axios";

function FriendsList({ userInfo, setUserInfo, eventpage, eventID, setEventData}) {
  console.log("userinfo: ", userInfo);
  async function toggleFriend(e) {
    if (eventpage != "true"){
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
else {
  console.log("participant add")
  try {
    let token = localStorage.token
    await Axios.post(`http://localhost:80/event/${eventID}/participant/add`,{participant: e.target.value},{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    let resData = await Axios.get(`http://localhost:80/event/${eventID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("user: ", resData.data.event);
      setEventData(resData.data.event);
}catch(error){
  console.log(error)
}}
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
                {eventpage === "true" ? "add" : "remove"}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default FriendsList;
