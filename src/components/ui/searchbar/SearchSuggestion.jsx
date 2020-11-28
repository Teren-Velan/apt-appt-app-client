import React, { useEffect } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import Axios from "axios";

function SearchSuggestion({
  user,
  searchField,
  setShowSuggestions,
  setUserInfo,
}) {
  useEffect(() => {});

  async function addFriend() {
    //pushing to backend to meet the format
    let userInfo = {
      username: user.username,
    };
    let token = localStorage.token;

    try {
      // **** hardcoded
      await Axios.post("http://localhost:80/dashboard/addfriend", userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let userData = await Axios.get("http://localhost:80/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserInfo(userData.data.user);
    } catch (err) {
      console.log(err);
    }
  }

  const searchFieldArr = searchField.split(" ");
  let id = user._id;
  let username = user.username;

  for (const word of searchFieldArr) {
    if (word !== "") {
      let cleanWord = word.replace(/[^a-zA-Z0-9]/g, ""); // clean up word of any illegal regex characters
      let searchFieldRegex = new RegExp(cleanWord, "gi");
      username = username.replace(searchFieldRegex, "<strong>$&</strong>");
    }
  }

  return (
    <Route>
      <div className="suggestion-card" id={id} key={id}>
        {/*<img src={imageUrl} alt=""></img>*/}
        <div className="suggestion-text">
          <span dangerouslySetInnerHTML={{ __html: username }}></span>
        </div>
        <div className="add-friend-button" onClick={() => addFriend()}>
          <p>add friend</p>
        </div>
      </div>
    </Route>
  );
}

export default SearchSuggestion;
