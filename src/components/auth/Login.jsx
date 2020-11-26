import React, { useState } from "react";
import { Form, Row, Card, Container, Image } from "react-bootstrap";
import Axios from "axios";
import { decode } from "jsonwebtoken";
import { Redirect, useHistory } from "react-router-dom";
import "../../Auth.scss";

function Login({ setUserInfo, setIsAuth }) {
  //states
  const [inputFields, setInputFields] = useState({});
  let history = useHistory();

  // functions
  // function for form field inputs
  function inputHandler(e) {
    setInputFields((input) => ({ ...input, [e.target.name]: e.target.value }));
  }

  // function for login button "onclick"
  async function login() {
    try {
      let profile = await Axios.post(
        "http://localhost:80/auth/login",
        inputFields
      );;
      localStorage.setItem("token", profile.data.token);
      let decoded_user = await decode(profile.data.token);
      let resData = await Axios.get(`http://localhost:80/dashboard/`, {
        headers: {
          Authorization: `Bearer ${profile.data.token}`,
        },
      });
      setIsAuth(true);
      setUserInfo(resData.data.user);
      console.log("resdata", resData.data.user)
      console.log("decoded: ", decoded_user);
      // console.log(user);
      history.push(`/dashboard/${decoded_user.user.username}/event`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Container className="Login" style={{ width: "100%" }}>
        <Card className="card" style={{ width: "40rem", margin: "0 auto" }}>
          <Card.Body className="card-body">
            <Form.Group as={Row}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="username"
                onChange={inputHandler}
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                name="password"
                onChange={inputHandler}
              />
            </Form.Group>
            
            <button
              onClick={login}
              className="btn btn-primary my-3"
              style={{ width: "100%" }}
            >
              Log in
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
