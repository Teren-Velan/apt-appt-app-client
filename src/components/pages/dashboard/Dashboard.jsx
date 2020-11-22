import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Card, Container, Button } from "react-bootstrap";

function Dashboard() {
  let { username } = useParams();
  const [eventData, setEventData] = useState({});
  const [newEvent, setNewEvent] = useState({});

  useEffect(() => {
    getEventData();
  }, []);

  async function getEventData() {
    try {
      let resData = await Axios.get(
        `http://localhost:80/dashboard/${username}/event`
      );
      console.log("user: ", resData);
      setEventData(resData.data.user);
    } catch (err) {
      console.log(err);
    }
  }

  let component = [
    <Card style={{ width: "18rem" }}>
      <Card.Title>new event</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">participants</Card.Subtitle>
    </Card>,
  ];

  async function addNewEvent() {
    try {
      setNewEvent(component);
      let resData = await Axios.post(
        `http://localhost:80/event/${username}/addevent`,
        newEvent
      );
      getEventData();
    } catch (error) {}
  }

  let render = "";
  if (Object.keys(eventData).length !== 0) {
    render = [
      <Container>
        {eventData.events.map((event) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{event.event_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                participants
              </Card.Subtitle>
              <Card.Text>
                {event.participants.map((post) => (
                  <li>{post}</li>
                ))}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
            <Card.Text>Status of event</Card.Text>

            <Button>See more</Button>
          </Card>
        ))}

        <Button onClick={addNewEvent}>Create New Event</Button>
      </Container>,
    ];
  }

  return <div>{render}</div>;
}

export default Dashboard;

// redo dahsboard break it down into components, refer to image taken

//make a state called events setevents then pass populate it with the data given from the get request.

// for populating the event, do a post request to update the datatbase with the new event then, call your get request again to make sure the whole page reloads with the new info.
