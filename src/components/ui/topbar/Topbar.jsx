import React, {useEffect} from 'react';
import SearchBar from '../searchbar/SearchBar'
import Pusher from 'pusher-js'
import {FaUser, FaAngleDown} from 'react-icons/fa'
import Axios from "axios";

require('dotenv').config()


function Topbar({userInfo}) {


  // on load
  useEffect(() => {
    let pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: 'ap1'
    });
    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
      alert(JSON.stringify(data));
    })
    return () => {
      channel.unbind()

    }
  }, [])


  function profileDropdown() {
    console.log("profile dropdown")
  }

  function upcomingDropdown() {
    console.log("profile dropdown")
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <SearchBar/>
      </div>

      <div className="topbar-right">

        <div className="topbar-element-group">

          <div className="display-circle" style={{backgroundColor: "#03b687"}}>5</div>
          <div className="topbar-element-texts">
            <p>upcoming event.</p>
            <h4>event name</h4>
          </div>
          <div className="dropdown-div" onClick={upcomingDropdown}>
            <FaAngleDown className="dropdown-icon"/>
          </div>
        </div>



        <div className="topbar-element-group">
          <FaUser className="display-circle" />
          <div className="topbar-element-texts">
            <p>user.</p>
            <h4>{userInfo.username}</h4>
          </div>
          <div className="dropdown-div" onClick={profileDropdown}>
            <FaAngleDown className="dropdown-icon"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;