import React, {useState, useEffect} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
// import DatePick2 from "../../ui/DatePick2"
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddParticipants from "./AddParticipants";
import Dateblock from "./Dateblock";
import DateRange from "./DateRange";
import DatePicker from "./DateRange";
import Chatbox from "../../ui/chat/Chatbox";

function Event() {
  let {eventid} = useParams();
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

  console.log("event data: ", eventData);


  function calcCollectiveAvailableDates() {

    // console.log("available-dates: ", eventData.availableDates)
    // let collectiveAvailDates = eventData.availableDates
    //
    // eventData.dateblocks.forEach((dateblock) => {
    //     dateblock.blockeddates.forEach((bdate) =>{
    //       collectiveAvailDates = collectiveAvailDates.filter(date => date !== bdate)
    //     })
    //   })
    // console.log("collective results: ", collectiveAvailDates)

    console.log("available-dates: ", eventData.availableDates)

    let collectiveAvailDates = {}

    eventData.availableDates.forEach((date) => {
      collectiveAvailDates[date] = []
    })
    eventData.dateblocks.forEach((dateblock) => {
      dateblock.blockeddates.forEach((bdate) => {
        eventData.availableDates.forEach((date) => {
          if (date === bdate) {
            collectiveAvailDates[date].push(dateblock.participant)
          }
        })
      })
    })
    console.log("collective results: ", collectiveAvailDates)

  }


  if (Object.keys(eventData).length !== 0) {
    calcCollectiveAvailableDates()


  }


  // use eventData to dislay all info

  let render = "";

  if (Object.keys(eventData).length !== 0) {
    render = [
      <Container>

        <AddParticipants eventData={eventData}/>
        <DateRange eventData={eventData} setEventData={setEventData}/>
        <Dateblock eventData={eventData}/>
      </Container>,
    ];
  }



  return (
    <div className="eventpage-main-div">
      <h1>{eventData.event_name}</h1>
      <p>{eventData.description}</p>
      {render}
      <Chatbox/>

    </div>);
}

export default Event;

// name/ description of event, host, status(over,pending conf), range of dates, participants, dateblocks of participants
