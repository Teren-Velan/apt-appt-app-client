import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  FaRegLaughBeam,
  FaRegLaughWink,
  FaRegSadTear,
  FaRegLaughSquint,
} from "react-icons/fa";

function EventCount() {
  return (
    <div className="event-count-container">
      <div className="countcontainer">
        <div className="countdetails">
          <div className="count-heading">
            Confirmed Events{" "}
            <FaRegLaughBeam
              style={{ color: "green" }}
              size={16}
              className="ml-1 mt-1"
            />
          </div>
          <div className="count-number">
            <h1>10</h1>
          </div>
        </div>
      </div>

      <div className="countcontainer">
        <div className="countdetails">
          <div className="count-heading">
            Pending Events{" "}
            <FaRegLaughWink
              style={{ color: "orange" }}
              size={16}
              className="mt-1 ml-1"
            />
          </div>
          <div className="count-number">
            <h1>5</h1>
          </div>
        </div>
      </div>

      <div className="countcontainer">
        <div className="countdetails">
          <div className="count-heading">
            Completed Events{" "}
            <FaRegLaughSquint
              style={{ color: "tomato" }}
              size={16}
              className="mt-1 ml-1"
            />
          </div>
          <div className="count-number">
            <h1>20</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCount;
