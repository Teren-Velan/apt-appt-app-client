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

  return <Container>{render}</Container>;
}

export default EventsDisplay;
