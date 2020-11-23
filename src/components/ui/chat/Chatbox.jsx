import React, {useState, useEffect} from 'react';

function Chatbox() {

  const user = {
    username: "jonaswong"
  }
  const [inputField, setInputField] = useState("")
  const [messages, setMessages] = useState([
    {
      username: "user1",
      content: "hello world"
    },
    {
      username: "jonaswong",
      content: "bye bye"
    }
  ])
let render = ""
  useEffect(() => {
    renderMessages()
  },[messages])

  function inputHandler(e) {
    setInputField(e.target.value)
    console.log(inputField)
  }

  function sendMessage() {
    let newMessages = messages
    newMessages.push({
      username: user.username,
      content: inputField
    })
    setMessages(newMessages)
    console.log(messages)
    renderMessages()
  }


renderMessages()

  function renderMessages() {
    if (messages.length !== 0) {
      render = messages.map((message) => {
        if (message.username === user.username) {
          return <div className="message-card user">
            <div className="message-bubble">
              <h6>You</h6>
              <p>{message.content}</p>
            </div>
          </div>
        } else {
          return <div className="message-card peer">
            <div className="message-bubble">
              <h6>{message.username}</h6>
              <p>{message.content}</p>
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
        </div>
      </div>

      <div className="chat-bottom-div">
        <div className="chat-input-div">
          <input placeholder="say something.." onChange={inputHandler}></input>
          <button onClick={sendMessage}>send</button>
        </div>
      </div>


    </div>
  );
}

export default Chatbox;