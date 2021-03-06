import React, {useState, useEffect, useRef} from 'react';
import Axios from 'axios'
import {useParams} from "react-router-dom";
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import FriendsList from "../friendslist/FriendsList";
import Pusher from "pusher-js";
import { FaArrowUp } from "react-icons/fa"
import {ca} from "react-date-range/dist/locale";
import {debounce} from 'throttle-debounce'

function Chatbox({chat, userInfo, getEventData, pusherTrigger, userTyping}) {

  const {eventid} = useParams()
  console.log("eventid", eventid)
  console.log("chat", chat)

  const [inputField, setInputField] = useState("")

  // const debouncedTypingState = debounce(3000, setUserTyping)
  const debouncedTypingTrigger = debounce(3000, typingTrigger)
  let debounced
  const chatField = useRef("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})
  }


  useEffect(() => {
    renderMessages()
    scrollToBottom()
  }, [chat])


  // useEffect(() => {
  //   let pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  //     cluster: 'ap1'
  //   });
  //   let channel = pusher.subscribe(`channel-${eventid}`);
  //   channel.bind('trigger', function (data) {
  //     // alert(JSON.stringify(data));
  //     getEventData()
  //   })
  //
  //   channel.bind('typing', function (data) {
  //     if (data.user !== userInfo.username) {
  //       alert(`${data.user} is typing`)
  //     }
  //   })
  //   return () => {
  //     channel.unbind()
  //
  //   }
  // }, [])


  async function typingTrigger(user, typing) {
    try {
      await Axios.post('http://localhost:80/pusher/typing', {
        channel: `channel-${eventid}`,
        user: user,
        typing: typing
      })
    } catch (err) {
      console.log(err)
    }
  }


  function inputHandler(e) {
    setInputField(e.target.value)
    chatField.current = e.target.value
    if (e.key === 'Enter') {
      sendMessage()
    }
    // if (chatField.current !== "" && userTyping === false) {
    //   // setUserTyping(true)
    //   typingTrigger(userInfo.username, true)
    //   // debouncedTypingState(false)
    //   debouncedTypingTrigger(userInfo.username, false)
    // } else if (chatField.current === "" && userTyping === true) {
    //   // debouncedTypingState(false)
    //   debouncedTypingTrigger(userInfo.username, false)
    // }
  }

  async function sendMessage() {
    if (inputField !== "") {
      let token = localStorage.token
      try {
        await Axios.post(`http://localhost:80/event/${eventid}/chat/add`, {
            message: inputField
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        // getEventData()
        await pusherTrigger()
        setInputField('')
      } catch (err) {
        console.log(err)
      }
    }
    // renderMessages()
  }





  let render = ""

  renderMessages()

  function renderMessages() {
    if (chat !== undefined) {
      render = chat.map((message) => {
        if (message.username === userInfo.username) {
          return <div className="message-card user" key={message._id}>
            <div className="message-bubble user">
              <h6>You</h6>
              <p>{message.message}</p>
            </div>
          </div>
        } else {
          return <div className="message-card peer" key={message._id}>
            <div className="message-bubble peer">
              <h6>{message.username}</h6>
              <p>{message.message}</p>
            </div>
          </div>
        }
      })
    }
  }


  return (
    <div className="chatbox-div">
      <h3>Chatbox</h3>

      <div className="messages-scroll-wrapper">
        <div className="messages-div">
          {render}
          <div ref={messagesEndRef}/>
        </div>
      </div>


      <div className="chat-bottom-div">

        <div className="chat-notif-div">
          {userTyping ? <p>a participant is typing..</p> : ""}
        </div>
        <div className="chat-input-div">
          <input placeholder="say something..." onChange={inputHandler} onKeyPress={e => e.key === 'Enter' ? sendMessage() : null} value={inputField}></input>
          <div className="send-button-div" onClick={sendMessage}><FaArrowUp className="send-icon"/></div>
        </div>
      </div>


    </div>
  );
}

export default Chatbox;