import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function EventCard({ eventData, setEventData }) {
  return (
    <div>
      <Card style={{ width: "70rem", height: "10rem" }}>
        <Card.Body>
          <Card.Title>{eventData.event_name}</Card.Title>
          <Card.Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit autem
            ab excepturi? Placeat eos adipisci omnis voluptates aspernatur
            suscipit facere. Itaque dolorum quibusdam quae modi tenetur eveniet
            vel dolor recusandae.
          </Card.Text>
        </Card.Body>
        <Link to={`/event/${eventData._id}`} className="btn btn-primary">
          See More
        </Link>
      </Card>
    </div>
  );
}

export default EventCard;
