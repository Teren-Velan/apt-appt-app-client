import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Axios from "axios";

function EventCard({ eventData, setEventData }) {
  async function getEventData() {
    try {
      let token = localStorage.token;
      let resData = await Axios.get(`http://localhost:80/dashboard/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("user: ", resData.data);
      setEventData(resData.data.user.events);
    } catch (err) {
      console.log(err);
    }
  }

  // delete request to delete data
  async function deleteEvent() {
    let token = localStorage.token;
    try {
      let res = await Axios.delete(
        `http://localhost:80/dashboard/${eventData._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getEventData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="mt-5">
      <Card border="danger" style={{ width: "60rem", height: "10rem" }}>
        <Card.Body>
          <Card.Title>{eventData.event_name}</Card.Title>
          <Card.Text>{eventData.description}</Card.Text>
        </Card.Body>

        <Link to={`/event/${eventData._id}`} className="btn btn-success">
          <FaEye size={20} />
        </Link>
        <Button onClick={deleteEvent}>
          {/* <FaTrashAlt /> */}
          delete
        </Button>
      </Card>
    </Container>
  );
}

export default EventCard;
