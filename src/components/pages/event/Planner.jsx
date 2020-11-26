import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import Axios from "axios";
import {ca} from "react-date-range/dist/locale";
import {FaCheckCircle} from "react-icons/all";

function Planner({eventData, setEventData, userInfo, pusherTrigger}) {
  // console.log(eventData);
  const [blockDates, setBlockDates] = useState([]);
  const [userDateBlocks, setUserDateBlocks] = useState([])

  useEffect(() => {
    if (eventData) {
      setUserDateBlocks(findUserDateBlocks())
      // console.log("UDB", userDateBlocks)
    }

  }, [eventData])


  let userDBlocks = findUserDateBlocks()

  function onClickState(e) {
    console.log(e.target.id);
    let temp = blockDates;
    let index = temp.indexOf(e.target.id);
    if (index == -1) {
      temp.push(e.target.value);
      setBlockDates(temp);
    } else {
      temp.splice(index, 1);
      setBlockDates(temp);
    }
    console.log("blockdates:", blockDates)
  }


  async function clickBlock(e) {
    let dateObj = new Date(e.target.id)
    try {
      let token = localStorage.token
      await Axios.put(`http://localhost:80/event/${eventData._id}/dateblock`, {
        date: dateObj
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      pusherTrigger()
    } catch (err) {
      console.log(err)
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
    } catch (error) {
    }
  }

  async function readyUp() {
    try {
      let token = localStorage.token;
      await Axios.put(`http://localhost:80/event/${eventData._id}/ready`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      pusherTrigger()
    } catch (err) {
      console.log(err)
    }
  }

  function findUserDateBlocks() {
    let dateblocksArr = eventData.dateblocks
    console.log("dateblockarr:", dateblocksArr)
    let index = dateblocksArr.findIndex(el => el.participant === userInfo.username)
    console.log("index:", index)
    if (index > -1) {
      console.log("chosen db", eventData.dateblocks[index].blockeddates)
      return eventData.dateblocks[index].blockeddates
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

  let render = ""

  if (eventData !== undefined && userDBlocks !== undefined) {
    render = eventData.availableDates.map((availDate) => {
        // return (<Form.Check
        //   value={`${availDate}`}
        //   onClick={onClickState}
        //   type="checkbox"
        //   label={`${stringDates(availDate)}`}
        // />)

        let index = userDBlocks.findIndex(date => date === availDate)
        if (index > -1) {
          return (
            <div className="date-card blocked" id={availDate} onClick={clickBlock}>
              <p id={availDate}>
                <del id={availDate}>{stringDates(availDate)}</del>
              </p>
            </div>
          )
        } else {
          return (
            <div className="date-card" id={availDate} onClick={clickBlock}>
              <p id={availDate}>{stringDates(availDate)}</p>
            </div>
          )
        }
      }
    )
  }


  return (
    <div className="planner-main-div">
      <div className="planner-header-div">
        <p>Block your unavailable dates</p>

        {eventData.readyUsers.findIndex(readyUser => readyUser === userInfo.username) > -1 ?
          <div className="ready-button-div ready" onClick={readyUp}>
            <FaCheckCircle className="ready-button ready"/>
            <p>Ready up!</p>
          </div>
          :
          <div className="ready-button-div" onClick={readyUp}>
            <FaCheckCircle className="ready-button"/>
            <p>Ready up!</p>
          </div>
        }



      </div>

      <div className="dateblocks-chooser-div">
        {render}
      </div>
    </div>
  );
}

export default Planner;
