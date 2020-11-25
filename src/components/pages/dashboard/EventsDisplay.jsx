import React from "react";
import { Container } from "react-bootstrap";
import EventCard from "../dashboard/EventCard";

function EventsDisplay({ eventData, setEventData }) {
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
