import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

function EventCard({ eventData, setEventData }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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
      getEventData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="mt-5">
      <div className="event-Container">
        <div className="event-Details">
          <div className="title">
            <h4>
              <BsCircle size={30} /> <span> </span>
              {eventData.event_name}
            </h4>
          </div>

          <div className="status">
            <p>Status: Pending</p>
          </div>

          <div className="event-icons">
            <button className="svg-btn">
              <Link className="see-more" to={`/event/${eventData._id}`}>
                <FaEye />
              </Link>
            </button>

            <button className="svg-btn">
              <FaTrashAlt onClick={deleteEvent} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default EventCard;
