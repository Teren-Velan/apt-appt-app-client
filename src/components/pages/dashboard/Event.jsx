import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function Events() {
  let { username } = useParams();
  const [eventData, setEventData] = useState({});
  const [eventStatus, setEventStatus] = useState("");

  useEffect(() => {
    getEventData();
  }, []);

  async function getEventData() {
    try {
      let resData = await Axios.get(
        `http://localhost:80/event/${username}/5fba071fbf8b9a45dee2ef40`
      );
      console.log("user: ", resData.data.event);
      setEventData(resData.data.event);
    } catch (err) {
      console.log(err);
    }
  }

  async function clickHandler(e) {
    setEventStatus(e.target.name);
  }

  console.log(eventStatus);

  console.log(eventData);

  // use eventData to dislay all info

  let render = "";

  if (Object.keys(eventData).length !== 0) {
    render = [
      <Container>
        <Card>
          <Card.Header>{eventData.event_name}</Card.Header>
          <Card.Body>
            <Card.Title>{}</Card.Title>
            <Card.Text>
              Description of event: Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quia repellendus, consequuntur reprehenderit
              rerum expedita voluptatem laudantium harum consequatur enim
              laboriosam voluptates minima aliquid. Ullam neque at autem
              perspiciatis eos! Quisquam!
            </Card.Text>
            <Card.Text>Status of event</Card.Text>

            {eventData.participants.map((post) => (
              <li>{post}</li>
            ))}

            <Button onClick={clickHandler} name="pending" variant="primary">
              pending
            </Button>
            <Button onClick={clickHandler} name="confirm" variant="info">
              confirm
            </Button>
            <Button onClick={clickHandler} name="over" variant="danger">
              over
            </Button>
          </Card.Body>
        </Card>
      </Container>,
    ];
  }

  return <div>{render}</div>;
}

export default Events;

// name/ description of event, host, status(over,pending conf), range of dates, participants, dateblocks of participants
