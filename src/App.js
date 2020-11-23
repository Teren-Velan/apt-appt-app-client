import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"
import Registration from "./components/auth/Registration"
import Login from "./components/auth/Login"
import Dashboard from "./components/pages/dashboard/Dashboard"
import {BrowserRouter as Router, Route, Switch, NavLink, useHistory, Redirect} from 'react-router-dom'

import {Navbar, Nav, FaHome} from "react-bootstrap"
import { tokenCheck } from "./functions/func";
import Topbar from "./components/ui/topbar/Topbar";
import Event from "./components/pages/dashboard/Event"



function App() {
//states
  const [userInfo, setUserInfo] = useState({})
  const [isAuth, setIsAuth] = useState(false);
  let history = useHistory()


  useEffect(()=>{
    tokenCheck(setIsAuth, setUserInfo)
  },[])


  function logout() {
    localStorage.removeItem("token")
    setUserInfo({})
    setIsAuth(false)
    history.push("/profile")
  }




  let welcomePage = ""
  if (isAuth) {
    welcomePage = [<div className="welcome-note-div">
      <h2>Welcome back, {userInfo.username}!</h2>
    </div>]
  } else {
    welcomePage = [
      <div className="welcome-note-div">

        <h2>Welcome to Apt Appt App, <br/> please login or register</h2>
      </div>
    ]
  }

  return (
    <Router>

      <Navbar bg="light" expand="lg">

        <Navbar.Brand href="#home">AAA
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">


          </Nav>
          <Nav>{isAuth ?
            <>
              <Nav.Link href={`/profile/${userInfo.username}`}><h2>{userInfo.username}</h2></Nav.Link>
              <Nav.Link className="mt-2 mr-auto" href="/">
                something
              </Nav.Link>



              <Nav.Link className="mt-2" color="black" href="/" onClick={logout}> something
              </Nav.Link></> : <>
              <Nav.Link href="/login"><h4>LOGIN</h4></Nav.Link>
              <Nav.Link href="/register"><h4>REGISTER</h4></Nav.Link>
            </>
          }
          </Nav>

        </Navbar.Collapse>
      </Navbar>


      {/* switch routes below */}
      <Switch>
        <Route path="/" exact>
          {welcomePage}
        </Route>
        <Route path="/topbar">
          <Topbar/>
        </Route>


        <Route path="/register" exact>
          <Registration/>
        </Route>
        <Route path="/login">
          <Login setUserInfo={setUserInfo} setIsAuth={setIsAuth}/>
        </Route>


    <Route path="/dashboard/:username/event">
      <Dashboard/>
    </Route>

    
    <Route path="/event/:eventid">
      <Event />
    </Route>


      </Switch>
    </Router>

  );
}

export default App;


// confirm compoenents needed

//topbar

//routes

//plan how to display 
