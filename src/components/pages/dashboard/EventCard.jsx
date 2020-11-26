import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  FaEye,
  FaTrashAlt,
  FaRegCircle,
  FaRegArrowAltCircleRight,
  FaAngleDown,
  FaChevronCircleRight,
  FaUserCircle,
  FaGlobeAmericas,
} from "react-icons/fa";
import { BsCircle } from "react-icons/bs";
import Axios from "axios";
import OutsideAlerter from "../../ui/searchbar/OutsideAlerter";
import DropdownMenu from "../../ui/dropdown/DropdownMenu";
import { CSSTransition } from "react-transition-group";

function EventCard({ eventData, setEventData, setUserInfo, userInfo }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [appear, setAppear] = useState(true);

  function profileDropdown() {
    setShowProfileDropdown(!showProfileDropdown);
  }
  function profileDropdownOut() {
    setShowProfileDropdown(false);
  }

  async function getEventData() {
    try {
      let token = localStorage.token;
      let resData = await Axios.get(`http://localhost:80/dashboard/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("user: ", resData.data);
      setEventData(resData.data.user.events);
    } catch (err) {
      console.log(err);
    }
  }

  // delete request to delete data
  async function deleteEvent() {
    let token = localStorage.token;
    try {
      await Axios.delete(
        `http://localhost:80/dashboard/${eventData._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let user  = await Axios.get(
        `http://localhost:80/dashboard/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserInfo(user.data.user)
      getEventData();
    } catch (error) {
      console.log(error);
    }
  }

  //pending
  return (
    <div className="main-event-card">
      <Link className="link-tag" to={`/event/${eventData._id}`}>
        <div className="event-Container">
          <div className="holder">
            <div
              style={{
                backgroundColor:
                  eventData.status === "Confirmed" ? "#fafff0" : "#f2f2f2",
              }}
              className="event-Details"
            >
              <div className="title">
                <h4>
                  {" "}
                  <FaRegArrowAltCircleRight className="mr-3 mb-1" />
                  {eventData.event_name}
                </h4>
              </div>

              <div className="event-Options">
                <div className="option-holder">
                  <div className="status">
                    <p>
                      {eventData.status}
                      {eventData.status == "Confirmed" &&
                        `: ${new Date(
                          eventData.confirmedDate
                        ).getDate()}/${new Date(
                          eventData.confirmedDate
                        ).getMonth()}/${new Date(
                          eventData.confirmedDate
                        ).getFullYear()} `}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {userInfo ? userInfo.username == eventData.host[0] ?
      <div className="event-icons">
        <button onClick={deleteEvent} className="svg-btn">
          <FaTrashAlt />
        </button>
      </div> : "" : ""
      }
    </div>
  );
}

export default EventCard;
