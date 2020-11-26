import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Axios from "axios";
import DatePicker from "react-datepicker";
function DateRange({ eventData, setEventData, userInfo }) {
  const [bothdate, setBothDate] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  async function onClick() {
    try {
      let token = localStorage.token;
      await Axios.put(
        `http://localhost:80/event/${eventData._id}/modifydates`,
        {
          start_date: new Date(startDate),
          end_date: new Date(endDate),
        },
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

      {eventData.host[0] == userInfo.username ? (
        <div>
          <div>
            from
            <DatePicker
              onChange={(date) => setStartDate(date)}
              placeholderText={ 
                startDate
                  ? `${startDate.getDate()}/${
                      startDate.getMonth() + 1
                    }/${startDate.getFullYear()}`
                  : eventData.start_date
                  ? `${new Date(eventData.start_date).getDate()}/${
                    new Date(eventData.start_date).getMonth() + 1
                  }/${new Date(eventData.start_date).getFullYear()}`
                  :
                  `${new Date(Date.now()).getDate()}/${
                    new Date(Date.now()).getMonth() + 1
                  }/${new Date(Date.now()).getFullYear()}`
              }
            />
          </div>
          <div>
            to
            <DatePicker
              onChange={(date) => setEndDate(date)}
              placeholderText={
                  endDate
                  ? `${endDate.getDate()}/${
                      endDate.getMonth() + 1
                    }/${endDate.getFullYear()}`
                  :
                  eventData.end_date
                  ? `${new Date(eventData.end_date).getDate()}/${
                      new Date(eventData.end_date).getMonth() + 1
                    }/${new Date(eventData.end_date).getFullYear()}`
                    :
                     "mm/dd/yyyy"

              }
            />
          </div>
          <button onClick={onClick}>submit</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DateRange;
