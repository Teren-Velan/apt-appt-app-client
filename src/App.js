import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"
import Registration from "./components/auth/Registration"
import Login from "./components/auth/Login"
import {BrowserRouter as Router, Route, Switch, NavLink, useHistory, Redirect} from 'react-router-dom'

function App() {
//states
const [userInfo, setUserInfo] = useState({})
const [isAuth, setIsAuth] = useState(false);


  return (
  <Router>

    <div className="App">
      
    </div>






    {/* switch routes below */}
    <Switch>
    <Route path="/register" exact>
      <Registration/>
    </Route>
    <Route path="/login">
      <Login setUserInfo = {setUserInfo} setIsAuth ={setIsAuth}/>
    </Route>


    </Switch>
  </Router>

  );
}

export default App;


// confirm compoenents needed

//navbar

//routes

//plan how to display 
