import React, {useEffect} from 'react';
import Pusher from 'pusher-js'
import Axios from "axios";
import SearchBar from "../searchbar/SearchBar";
import OutsideAlerter from "../searchbar/OutsideAlerter";
require('dotenv').config()



function PusherTest() {


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





  async function sendTrigger() {
    try {
      await Axios.post('http://localhost:80/pusher', {
        message: 'hello'
      })
    } catch (err) {
      console.log(err)
    }
  }





  return (
    <div className="topbar">

      <div>
          <SearchBar/>

      </div>

      <div>
        Profile
      </div>

      <input></input>
      <button onClick={sendTrigger}>trigger</button>
    </div>
  );
}

export default PusherTest