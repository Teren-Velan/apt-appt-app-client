import React, { useEffect, useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import Pusher from "pusher-js";
import { FaUser, FaAngleDown, FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import Axios from "axios";
import OutsideAlerter from "../searchbar/OutsideAlerter";
import DropdownMenu from "../dropdown/DropdownMenu";

require("dotenv").config();

function Topbar({ userInfo, logout }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);

  // on load
  useEffect(() => {
    let pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap1",
    });
    let channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      alert(JSON.stringify(data));
    });
    return () => {
      channel.unbind();
    };
  }, []);

  function profileDropdown() {
    setShowProfileDropdown(!showProfileDropdown);
  }

  function profileDropdownOut() {
    setShowProfileDropdown(false);
  }

  function upcomingDropdown() {
    setShowUpcomingEvents(!showUpcomingEvents);
  }

  function upcomingDropdownOut() {
    setShowUpcomingEvents(false);
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <NavLink to="/">
        <div className="home-icon-div">
          <FaHome className="home-icon" />
        </div>
          </NavLink>
        <SearchBar />
      </div>

      <div className="topbar-right">
        <div className="topbar-element-group">
          <div
            className="display-circle"
            style={{ backgroundColor: "#03b687" }}
          >
            5
          </div>
          <div className="topbar-element-texts">
            <p>upcoming events.</p>
            <h4>event name</h4>
          </div>
          <OutsideAlerter clickedOut={upcomingDropdownOut}>
            <div className="dropdown-icon-div" onClick={upcomingDropdown}>
              <FaAngleDown className="dropdown-icon" />
            </div>
            {showUpcomingEvents && <DropdownMenu type={"upcomingEvents"} />}
          </OutsideAlerter>
        </div>

        <div className="topbar-element-group">
          <FaUser className="display-circle" />
          <div className="topbar-element-texts">
            <p>user.</p>
            <h4>{userInfo.username}</h4>
          </div>
          <OutsideAlerter clickedOut={profileDropdownOut}>
            <div className="dropdown-icon-div" onClick={profileDropdown}>
              <FaAngleDown className="dropdown-icon" />
            </div>
            {showProfileDropdown && (
              <DropdownMenu
                logout={logout}
                type={"profile"}
                key={"profileDropdown"}
              />
            )}
          </OutsideAlerter>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
