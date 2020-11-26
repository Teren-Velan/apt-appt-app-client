import React, { useState } from "react";
import { Container } from "react-bootstrap";
import EventCard from "../dashboard/EventCard";
import { CSSTransition } from "react-transition-group";

function EventsDisplay({ eventData, setEventData }) {
  const [appear, setAppear] = useState(true);
  let render = "";
  if (eventData !== undefined) {
    render = eventData.map((event, key) => (
      <EventCard setEventData={setEventData} eventData={event} />
    ));
  }

  return (
    <div>
      {/* <p>(press to create new event)</p> */}
      {render}
    </div>
  );
}

export default EventsDisplay;
