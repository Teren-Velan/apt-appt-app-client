import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Axios from "axios";

function Dateblock({ eventData, setEventData }) {
  // console.log(eventData);

  const [blockDates, setBlockDates] = useState([]);

  function onClickState(e) {
    console.log(e.target.value);
    let temp = blockDates;
    let index = temp.indexOf(e.target.value);
    if (index == -1) {
      temp.push(e.target.value);
      setBlockDates(temp);
    } else {
      temp.splice(index, 1);
      setBlockDates(temp);
    }
  }

  async function onClickSubmit() {
    console.log(blockDates);
    try {
      let object = {
        dates: blockDates,
      };
      let token = localStorage.token;
      await Axios.put(
        `http://localhost:80/event/dateblock/${eventData._id}`,
        object,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
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
  return (
    <div>
      <p>For Participants</p>
      <Container>
        <Form.Group controlId="formBasicCheckbox">
          {eventData.availableDates.map((availDate) => (
            <Form.Check
              value={`${availDate}`}
              onClick={onClickState}
              type="checkbox"
              label={`${stringDates(availDate)}`}
            />
          ))}{" "}
          <Button onClick={onClickSubmit}>Submit</Button>
        </Form.Group>
      </Container>
    </div>
  );
}

export default Dateblock;
