import React from "react";
import { Container } from "react-bootstrap";
import EventCard from "../dashboard/EventCard";

function EventsDisplay({ eventData }) {
  console.log("my eventdisplay", eventData);

  let render = "";
  if (eventData !== undefined) {
    render = eventData.map((event) => <EventCard eventData={event} />);
  }

  return <Container>{render}</Container>;
}

export default EventsDisplay;
