import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Container, Button, Modal, Form, Card } from "react-bootstrap";
import EventsDisplay from "./EventsDisplay";
import Topbar from "../../ui/topbar/Topbar";
import Sidebar from "../../ui/Sidebar";
import EventCount from "./EventCount";
import { FaPlusCircle } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { BsFillPlusCircleFill } from "react-icons/bs";
import FriendsList from "../../ui/friendslist/FriendsList";

import "../../../App.scss";

import Pusher from "pusher-js";

function Dashboard({ userInfo, setUserInfo }) {
  let { username } = useParams();
  const [eventData, setEventData] = useState({});
  const [show, setShow] = useState(false); //for modal
  const [inputFields, setInputFields] = useState({});
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getEventData();
    let pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap1",
    });
    let channel = pusher.subscribe(`channel-${userInfo.username}`);
    console.log("subscribe to", userInfo);
    channel.bind("trigger", function (data) {
      getEventData();
    });

    return () => {
      channel.unbind();
    };
  }, []);

  // for input handling of modal
  function inputHandling(e) {
    setInputFields((input) => ({ ...input, [e.target.name]: e.target.value }));
    console.log(inputFields);
  }

  // to get all events from database
  async function getEventData() {
    try {
      let token = localStorage.token;
      let resData = await Axios.get(`http://localhost:80/dashboard/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("user: ", resData.data);
      setEventData(resData.data.user.events);
    } catch (err) {
      console.log(err);
    }
  }

  // post request to add new event
  async function addNewEvent() {
    let token = localStorage.token;
    try {
      let res = await Axios.post(
        `http://localhost:80/dashboard/addevent`,
        inputFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getEventData();
      setShow(false);
    } catch (error) {
      console.log(error);
      // return res.status(400).json({ error: error });
    }
  }
  // for rendering event data
  let render = "";
  if (Object.keys(eventData).length !== 0) {
    render = [
      // <CSSTransition in={appear} appear={true} timeout={300} classNames="fade">
      <EventsDisplay eventData={eventData} setEventData={setEventData} setUserInfo={setUserInfo} />,
      // </CSSTransition>,
    ];
  }

  return (
    <>
      <div className="page-main-div">
        {/* left side  */}
        <div className="page-left">
          <div className="event-count-container">
            <EventCount eventData={eventData}/>
          </div>

          <div className="event-btn-cont">
            <div className="create-event-btn" onClick={handleShow}>
              <h1>
                Events List
                <BsFillPlusCircleFill size={35} className="mb-2 ml-2" />
              </h1>
            </div>
          </div>

          <div className="render-display">{render}</div>

          {/* For display of modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a new Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Text>Name of Event</Form.Text>
                <Form.Control
                  onChange={inputHandling}
                  name="event_name"
                  type="text"
                  placeholder="Trip to the Zoo"
                />
              </Form.Group>

              <Form.Group>
                <Form.Text className="text-muted">Description</Form.Text>
                <Form.Control
                  name="description"
                  onChange={inputHandling}
                  type="text"
                  placeholder="..."
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={addNewEvent} variant="secondary">
                {" "}
                Submit{" "}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="page-right">
          {/* rightside */}
          {/* <div className="side_chick"> */}
          <FriendsList userInfo={userInfo} setUserInfo={setUserInfo} />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

// redo dahsboard break it down into components, refer to image taken

//make a state called events setevents then pass populate it with the data given from the get request.

// for populating the event, do a post request to update the datatbase with the new event then, call your get request again to make sure the whole page reloads with the new info.
