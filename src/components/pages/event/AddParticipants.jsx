import React from "react";
import { Card } from "react-bootstrap";

function AddParticipants({ eventData }) {
  return (
    <div>
      <Card>
        <Card.Header>{eventData.event_name}</Card.Header>
        <Card.Body>
          <Card.Title>{}</Card.Title>
          <Card.Text>
            Description of event: Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Quia repellendus, consequuntur reprehenderit rerum
            expedita voluptatem laudantium harum consequatur enim laboriosam
            voluptates minima aliquid. Ullam neque at autem perspiciatis eos!
            Quisquam!
          </Card.Text>
          <Card.Text>
            Current Participants
            {eventData.participants.map((post) => (
              <li>
                {post} <button>Remove participant</button>
              </li>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddParticipants;
