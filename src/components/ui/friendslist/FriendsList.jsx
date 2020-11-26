import React from "react";
import Axios from "axios";
import { FaUserCircle, FaAngleDown, FaHome } from "react-icons/fa";

function FriendsList({
  userInfo,
  setUserInfo,
  eventpage,
  eventID,
  setEventData,
  pusherTrigger
}) {
  async function toggleFriend(e) {
    if (eventpage != "true") {
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
    } else {

      try {
        let token = localStorage.token;
        await Axios.post(
          `http://localhost:80/event/${eventID}/participant/add`,
          { participant: e.target.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let resData = await Axios.get(`http://localhost:80/event/${eventID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEventData(resData.data.event);


        await dashboardTrigger(e.target.value)
        await pusherTrigger()

      } catch (error) {
        console.log(error);
      }
    }
  }

  async function dashboardTrigger(username) {
    try {
      await Axios.post("http://localhost:80/pusher/trigger", {
        channel: `channel-${username}`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="friends-list-div">
      <h3>{eventpage ? "Add friend to event" : "Friends list"}</h3>
      {userInfo.friendlist &&
        userInfo.friendlist.map((el, index) => (
          <div className="friend-card">
            <p>
              {" "}
              <FaUserCircle className="display-circle mr-2" />
              {el.username}
            </p>
            <div
              className="remove_friend_button"
              value={el.username}
              onClick={toggleFriend}
            >
              {eventpage === "true" ? "add" : "remove"}
            </div>
          </div>
        ))}
    </div>
  );
}

export default FriendsList;
