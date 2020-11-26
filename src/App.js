import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.scss';
import './Welcome.scss'
import "./Dashboard.scss";
import "./EventPage.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"
import Registration from "./components/auth/Registration"
import Login from "./components/auth/Login"
import Dashboard from "./components/pages/dashboard/Dashboard"
import WelcomePage from "./components/pages/welcome/WelcomePage"
import {BrowserRouter as Router, Route, Switch, NavLink, useHistory, Redirect} from 'react-router-dom'
import {Navbar, Nav, FaHome} from "react-bootstrap"
import {tokenCheck} from "./functions/func";
import Topbar from "./components/ui/topbar/Topbar";
import Event from "./components/pages/event/Event"
import FriendsList from "./components/ui/friendslist/FriendsList";
import Chatbox from "./components/ui/chat/Chatbox";
import "react-datepicker/dist/react-datepicker.css"



function App() {
//states
  const [userInfo, setUserInfo] = useState({})
  const [isAuth, setIsAuth] = useState(false);
  let history = useHistory()


  useEffect(() => {
    tokenCheck(setIsAuth, setUserInfo)
  }, [])


  function logout() {
    localStorage.removeItem("token")
    setUserInfo({})
    setIsAuth(false)
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

      <div className="main-div">
        {Object.keys(userInfo).length !== 0 ?
          <Topbar type="user" userInfo={userInfo} logout={logout} setUserInfo={setUserInfo}/> :
          <Topbar type="blank" userInfo={userInfo} logout={logout} setUserInfo={setUserInfo}/>}


        <Switch>
          <Route path="/" exact>
            {isAuth ? <p>Welcome back, go to your <NavLink to="/dashboard">dashboard</NavLink></p> : <WelcomePage/>}
          </Route>
          <Route path="/register" exact>
            <Registration/>
          </Route>
          <Route path="/login">
            <Login setUserInfo={setUserInfo} setIsAuth={setIsAuth}/>
          </Route>

          <Route path="/dashboard">

            <Dashboard userInfo={userInfo} setUserInfo={setUserInfo}/>

            <footer>
              {/* <div className="footer-icon">
                <FaInstagram/>
                <FaFacebook/>
                <FaTwitch/>
              </div>

              <div className="footer-text">
                <div className="copy">
                  <p>copy right reseerved</p>
                </div>
                
                <div className="terms">
                  <p>Terms</p>
                  <p>Privacy</p>
                  <p>Security</p>
                </div>
              </div> */}
            </footer>


          </Route>

          <Route path="/event/:eventid">
            <Event userInfo={userInfo}/>

            <footer>
             
            </footer>

            <footer></footer>

          </Route>

        </Switch>

      </div>

    



    </Router>

  );
}

export default App;

