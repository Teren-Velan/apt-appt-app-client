import React from "react";

function WelcomePage() {

  

  return (
    <>
      <div className="width_screen">
        <div className="row fixed">
          <div className="get_started flex col-5 hoveringleft">
            <div className="float_right">get</div>
            <div className="float_right">Started</div>
            <div className="float_right">TOday</div>
            <a href="/register" className="signupcont">
            <button className="signupButton">Join</button>
            </a>
          </div>
          <div className="divider col-1">
            <div className="line"></div>
          </div>
          <div>
            <div id="container" className="col-6 hoveringright">
              Make
              <div id="flip">
                <div>
                  <div>APPOINTMent</div>
                </div>
                <div>
                  <div>Meetup</div>
                </div>
                <div>
                  <div>Meetings</div>
                </div>
              </div>
              easier!
              <div>
                <a href="/login">
                  <button className="loginButton">Login</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
