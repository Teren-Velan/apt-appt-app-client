import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
// import DatePick2 from "../../ui/DatePick2"
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Events() {
  let { username } = useParams();
  const [eventData, setEventData] = useState({});
  const [eventStatus, setEventStatus] = useState("");

  const [value, onChange] = useState(new Date());

  useEffect(() => {
    getEventData();
  }, []);

  async function getEventData() {
    try {
      let resData = await Axios.get(
        `http://localhost:80/event/5fba071fbf8b9a45dee2ef40`
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

  console.log(value);

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

            <select id="cars" name="Status">
              <option value="status">Status</option>
              <option value="pending">Pending</option>
              <option value="over">Over</option>
              <option value="confirmed">Confirmed</option>
            </select>

            <Card.Text>
              Current Participants
              {eventData.participants.map((post) => (
                <li>
                  {post} <button>Remove participant</button>
                </li>
              ))}
            </Card.Text>

            <Card.Text>For Host</Card.Text>

            <div>
              <p>Start dates</p>
              <input type="date" />
              <p>End Date</p>
              <input type="date" />
            </div>
            <br />
            <br />

            <div>
              <p>For Participants</p>
              {eventData.availableDates.map((ad) => (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label={`${ad}`} />
                </Form.Group>
              ))}
            </div>
            <div>
              <Calendar onChange={onChange} value={value} />
            </div>
          </Card.Body>
          <Button>Update</Button>
        </Card>
      </Container>,
    ];
  }

  return <div>{render}</div>;
}

export default Events;

// name/ description of event, host, status(over,pending conf), range of dates, participants, dateblocks of participants
