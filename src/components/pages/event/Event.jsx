import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
// import DatePick2 from "../../ui/DatePick2"
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddParticipants from "./AddParticipants";
import Dateblock from "./Dateblock";
import DateRange from "./DateRange";
import DatePicker from "./DateRange";

function Event() {
  let { eventid } = useParams();
  const [eventData, setEventData] = useState({});

  const [value, onChange] = useState(new Date());
  console.log("id: ", eventid);
  useEffect(() => {
    getEventData();
  }, []);

  async function getEventData() {
    let token = localStorage.token;
    console.log(`http://localhost:80/event/${eventid}`);
    try {
      // let resData = await Axios.get(`http://localhost:80/event/${eventid}`, {
      //   header: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      let resData = await Axios.get(`http://localhost:80/event/${eventid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("user: ", resData.data.event);
      setEventData(resData.data.event);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(eventData);

  // use eventData to dislay all info

  let render = "";

  if (Object.keys(eventData).length !== 0) {
    render = [
      <Container>
        <AddParticipants eventData={eventData} />
        <DateRange eventData={eventData} setEventData={setEventData} />
        <Dateblock eventData={eventData} />
      </Container>,
    ];
  }

  return <div>{render}</div>;
}

export default Event;

// name/ description of event, host, status(over,pending conf), range of dates, participants, dateblocks of participants
