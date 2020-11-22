import React from "react";

function EventCard() {
  return (
    <div>
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
    </div>
  );
}

export default EventCard;
