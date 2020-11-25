import React, {useState, useEffect} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
import {Card, Container} from "react-bootstrap";
// import DatePick2 from "../../ui/DatePick2"
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddParticipants from "./AddParticipants";
import Planner from "./Planner";
import DateRange from "./DateRange";
import DatePicker from "./DateRange";
import Chatbox from "../../ui/chat/Chatbox";
import FriendsList from "../../ui/friendslist/FriendsList"
import Pusher from "pusher-js";

function Event({userInfo, setUserInfo}) {
  let {eventid} = useParams();
  const [eventData, setEventData] = useState({});
  let collectiveAvailDates = {}
  let availRender = ''
  const [value, onChange] = useState(new Date());
  console.log("id: ", eventid);


  useEffect(() => {
    getEventData();
    let pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: 'ap1'
    });
    let channel = pusher.subscribe(`channel-${eventid}`);
    channel.bind('trigger', function (data) {
      // alert(JSON.stringify(data));
      getEventData()
    })

    channel.bind('typing', function (data) {
      if (data.user !== userInfo.username) {
        alert(`${data.user} is typing`)
      }
    })
    return () => {
      channel.unbind()

    }


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

  async function confirmDate(e) {
    let token = localStorage.token;
    try {
      await Axios.put(`http://localhost:80/event/${eventid}/confirm`, {
        date: e.target.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await pusherTrigger()
    } catch (err) {
      console.log(err);
    }
  }


  async function pusherTrigger() {
    try {
      await Axios.post('http://localhost:80/pusher/trigger', {
        channel: `channel-${eventid}`
      })
    } catch (err) {
      console.log(err)
    }
  }


  function stringDates(element) {
    let date = new Date(element);
    let onlyDate = date.getDate();
    let onlyMonth = date.getMonth();
    let arr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let onlyDay = date.getDay();
    let onlyYear = date.getFullYear();
    // console.log(new Date(`${onlyYear}-${onlyMonth}-${onlyDate}`));

    return `${arr[onlyDay]} ${onlyDate}-${onlyMonth}-${onlyYear}`;
  }

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

    let availDates = []
    for (const [date, userArr] of Object.entries(collectiveAvailDates)) {
      if (userArr.length === 0) {
        availDates.push(date)
      }
    }

    availRender = availDates.map((date) => {
      if (date === eventData.confirmedDate) {
        return (
          <div className="date-card confirm" id={date} onClick={confirmDate}>
            <p id={date}>{stringDates(date)}</p>
          </div>
        )
      } else {
        return (
          <div className="date-card" id={date} onClick={confirmDate}>
            <p id={date}>{stringDates(date)}</p>
          </div>
        )
      }

    })
  }


  if (Object.keys(eventData).length !== 0) {
    calcCollectiveAvailableDates()
  }


// use eventData to dislay all info

  let render = "";

  if (Object.keys(eventData).length !== 0) {
    render = [
      <>

        <div className="eventpage-main-div">

          <div className="eventpage-left">
            <div className="event-name-div">
              <h6>event title.</h6>
              <h1>{eventData.event_name}</h1>
            </div>

            <p>{eventData.description}</p>
            <div className="participants-div">

              <h2>Participants</h2>
              <p>{eventData.readyUsers.length} / {eventData.participants.length} users are ready</p>

              {eventData.participants.map((participant) => {
                if (eventData.readyUsers.findIndex(readyUser => readyUser === participant) > -1) {
                  return <div className="participant-card ready">
                    <p>{participant}</p>
                  </div>
                } else {
                  return <div className="participant-card">
                    <p> {participant}</p>
                  </div>
                }


              })}
            </div>

            <DateRange eventData={eventData} setEventData={setEventData} userInfo={userInfo}/>
            <Planner eventData={eventData} userInfo={userInfo} pusherTrigger={pusherTrigger}/>


            <div className="dates-results-main-div">
              <p>Current potential appointment dates</p>
              {availRender}
            </div>


          </div>

          <div className="eventpage-right">

            <Chatbox chat={eventData.chat} userInfo={userInfo} getEventData={getEventData}
                     pusherTrigger={pusherTrigger}/>
            <FriendsList userInfo={userInfo} eventpage="true" eventID={eventData._id} setEventData={setEventData}/>

          </div>
        </div>
      </>
    ];
  }


  return (
    <>
      {render}

    </>
  );
}

export default Event;

// name/ description of event, host, status(over,pending conf), range of dates, participants, dateblocks of participants
