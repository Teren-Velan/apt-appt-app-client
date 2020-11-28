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
      );
      localStorage.setItem("token", profile.data.token);
      let decoded_user = await decode(profile.data.token);
      let resData = await Axios.get(`http://localhost:80/dashboard/`, {
        headers: {
          Authorization: `Bearer ${profile.data.token}`,
        },
      });
      setIsAuth(true);
      setUserInfo(resData.data.user);
      console.log("resdata", resData.data.user);
      console.log("decoded: ", decoded_user);
      // console.log(user);
      history.push(`/dashboard/${decoded_user.user.username}/event`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div class="gfg-div">
      <div class="gfg-title">Welcome Back</div>
      {/* <div class="gfg-sub-title">AaA</div> */}
      <div class="gfg-input-fields">
        <div class="gfg-email">
          <input
            name="username"
            onChange={inputHandler}
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="gfg-password">
          <input
            name="password"
            onChange={inputHandler}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div onClick={login} class="gfg-button">
        Sign In
      </div>
      <div class="gfg-link">
        {/* <a href="#">Forgot password?</a> or */}

        <a href="/register">New? Click here to register</a>
      </div>
    </div>
  );
}

export default Login;
