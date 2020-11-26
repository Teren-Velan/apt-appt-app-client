import React, { useState } from "react";
import { Form, Card, Row } from "react-bootstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  // states
  const [inputFields, setInputFields] = useState({});
  const history = useHistory();

  // functions
  async function register() {
    try {
      let res = await Axios.post(
        "http://localhost:80/auth/register",
        inputFields
      );
      useHistory.push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  // function for inputhandler
  function inputHandler(e) {
    setInputFields((input) => ({ ...input, [e.target.name]: e.target.value }));
  }
  return (
    <div class="gfg-div-regs">
      <div class="gfg-title">Register</div>

      <div class="gfg-input-fields">
        <div class="gfg-email">
          <input
            name="username"
            onChange={inputHandler}
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="gfg-email">
          <input
            name="password"
            onChange={inputHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="gfg-email">
          <input
            name="email"
            onChange={inputHandler}
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <button onClick={register} class="gfg-button">
        Sign Up
      </button>
      <div class="gfg-link">
        <a href="/login">Already have an account? Click here</a>
      </div>
    </div>
  );
}

export default Registration;
