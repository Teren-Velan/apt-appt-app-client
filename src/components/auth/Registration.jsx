import React, {useState} from 'react'
import {Form, Card , Row} from "react-bootstrap"
import Axios from 'axios'
import {useHistory} from "react-router-dom"

function Registration() {
// states
const [inputFields, setInputFields] = useState({})
const history = useHistory()

// functions
async function register() {
  try {
    let res = await Axios.post("http://localhost:80/auth/register", inputFields)
    useHistory.push("/login")
  } catch (err) {
    console.log(err)
  }
}

// function for inputhandler
function inputHandler(e) {
  setInputFields((input) => ({...input, [e.target.name]: e.target.value}))
}
  return (
    <div>
      <Card className="card" style={{width: '40rem', margin: '0 auto'}}>
        <Card.Body className="card-body">
            <Form.Group as={Row}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" className="form-control" name="username" onChange={inputHandler}/>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" className="form-control" name="password" onChange={inputHandler}/>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" className="form-control" name="email" onChange={inputHandler}/>
            </Form.Group>

            <button onClick={register} className="btn btn-primary my-3" style={{width: '100%'}}>Register
            </button>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Registration
