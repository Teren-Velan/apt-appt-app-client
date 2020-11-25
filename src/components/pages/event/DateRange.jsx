import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Axios from "axios";

function DateRange({ eventData, setEventData, userInfo }) {
  const [bothdate, setBothDate] = useState({});

  function inputHandler(e) {
    setBothDate((input) => ({ ...input, [e.target.name]: e.target.value }));
  }

  async function onClick() {
    try {
      let token = localStorage.token;
      await Axios.put(
        `http://localhost:80/event/${eventData._id}/modifydates`,
        bothdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let resData = await Axios.get(
        `http://localhost:80/event/${eventData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user: ", resData.data.event);
      setEventData(resData.data.event);
      console.log(bothdate);
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(eventData);
  return (
    <div className="date-range-main-div">
      {/* <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control name="start_date" onChange={inputHandler} type="date" />
      </Form.Group>
      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control name="end_date" onChange={inputHandler} type="date" />
        <Button onClick={onClick}>Submit</Button>
      </Form.Group> */}
      {eventData.host[0] == userInfo.username ? <div>from<input name="start_date" onChange={inputHandler} type="date"/>
      to
      <input name="end_date" onChange={inputHandler} type="date" />
      <button onClick={onClick}>submit</button></div>
      : <div></div>}
    </div>
  );
}

export default DateRange;
