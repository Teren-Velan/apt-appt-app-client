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
    <Container className="event-count-container">
      <Row>
        <Col>
          <div className="countcontainer">
            <div className="countdetails">
              <div className="count-heading">
                Confirmed Events{" "}
                <FaRegLaughBeam
                  style={{ color: "green" }}
                  size={25}
                  className="ml-3"
                />
              </div>
              <div className="count-number">
                <h1>10</h1>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="countcontainer">
            <div className="countdetails">
              <div className="count-heading">
                Pending Events{" "}
                <FaRegLaughWink
                  style={{ color: "orange" }}
                  size={25}
                  className="ml-3 mb-1"
                />
              </div>
              <div className="count-number">
                <h1>5</h1>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="countcontainer">
            <div className="countdetails">
              <div className="count-heading">
                Completed Events{" "}
                <FaRegLaughSquint
                  style={{ color: "tomato" }}
                  size={25}
                  className="ml-3 mb-1"
                />
              </div>
              <div className="count-number">
                <h1>20</h1>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EventCount;
