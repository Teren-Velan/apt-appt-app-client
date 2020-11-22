import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Card, Container } from "react-bootstrap";

function Dashboard() {
  let { username } = useParams();
  const [eventData, setEventData] = useState({});
  const [eventStatus, setEventStatus] = useState("");

  useEffect(() => {
    getEventData();
  }, []);

  function statusHandler() {
    setEventStatus();
  }

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
            <Card.Text>{eventStatus}</Card.Text>
          </Card>
        ))}
      </Container>,
    ];
  }

  return <div>{render}</div>;
}

export default Dashboard;
