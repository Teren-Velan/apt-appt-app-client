import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaRegLaughBeam, FaRegLaughWink, FaRegSadTear } from "react-icons/fa";

function EventCount() {
  return (
    <Container className="mb-5 mt-5">
      <Row>
        <Col>
          <Card border="success" style={{ width: "20rem", height: "8rem" }}>
            <Card.Body className="text-align-center">
              <Card.Title style={{ textAlign: "center" }}>
                Confirmed Events
                <FaRegLaughBeam size={25} className="ml-2 mb-1" />
              </Card.Title>
              <h1 style={{ textAlign: "center" }}>10</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="warning" style={{ width: "20rem", height: "8rem" }}>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                Pending Events{" "}
                <FaRegLaughWink size={25} className="ml-1 mb-1" />
              </Card.Title>
              <h1 style={{ textAlign: "center" }}>5</h1>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card border="danger" style={{ width: "20rem", height: "8rem" }}>
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title>
                Completed Events{" "}
                <FaRegSadTear size={25} className="ml-1 mb-1" />
              </Card.Title>
              <h1 style={{ textAlign: "center" }}>20</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventCount;
