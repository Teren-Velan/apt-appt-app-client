import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Container, Button, Modal, Form } from "react-bootstrap";
import EventsDisplay from "./EventsDisplay";

function Dashboard() {
  let { username } = useParams();
  const [eventData, setEventData] = useState({});
  const [show, setShow] = useState(false); //for modal
  const [inputFields, setInputFields] = useState({});
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  function inputHandler(e) {
    setInputFields((input) => ({ ...input, [e.target.name]: e.target.value }));
    console.log(inputFields);
  }

  useEffect(() => {
    getEventData();
  }, []);

  async function getEventData() {
    try {
      let resData = await Axios.get(`http://localhost:80/dashboard/event`);
      console.log("user: ", resData.data);
      setEventData(resData.data.user.events);
    } catch (err) {
      console.log(err);
    }
  }

  // async function addNewEvent() {
  //   try {
  //     let res = await Axios.post(`http://event/${username}/addevent`);
  //     getEventData();
  //   } catch (error) {}
  // }

  let render = "";
  if (Object.keys(eventData).length !== 0) {
    render = [<EventsDisplay eventData={eventData} />];
  }

  return (
    <div>
      <Button onClick={handleShow}>Create new event</Button>
      {render}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted">Name of Event</Form.Text>
            <Form.Control
              onChange={inputHandler}
              name="image_url"
              type="text"
              placeholder="Trip to the Zoo"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted">Description</Form.Text>
            <Form.Control
              name="caption"
              onChange={inputHandler}
              type="text"
              placeholder="..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"> Submit </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;

// redo dahsboard break it down into components, refer to image taken

//make a state called events setevents then pass populate it with the data given from the get request.

// for populating the event, do a post request to update the datatbase with the new event then, call your get request again to make sure the whole page reloads with the new info.
