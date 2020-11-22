import React, {useEffect} from 'react';
import {Link, NavLink, Route} from "react-router-dom";
import Axios from 'axios'


function SearchSuggestion({user, searchField, setShowSuggestions}) {


  useEffect(() => {

  })

  async function addFriend(id){
    try {
      // **** hardcoded
      await Axios.post('http://localhost:80/jonaswong/')
    } catch (err) {
      console.log(err)
    }
  }


  const searchFieldArr = searchField.split(" ")
  let id = user._id
  let username = user.username
  // let id = book['best_book'][0]['id'][0]['_']

  // let author = book['best_book'][0]['author'][0]['name'][0]
  // let imageUrl = book['best_book'][0]['image_url'][0]

  for (const word of searchFieldArr) {
    if (word !== "") {
      let cleanWord = word.replace(/[^a-zA-Z0-9]/g, '') // clean up word of any illegal regex characters
      let searchFieldRegex = new RegExp(cleanWord, 'gi')
      username = username.replace(searchFieldRegex, "<strong><u>$&</u></strong>")
      // author = author.replace(searchFieldRegex, "<strong><u>$&</u></strong>")
    }
  }

  // author = "by " + author


  return (

    <Route>
      <Link to={`/user/${id}`} onClick={()=>setShowSuggestions(false)}>
        <div className="suggestion-card" id={id} key={id}>
          {/*<img src={imageUrl} alt=""></img>*/}
          <div className="suggestion-text">
            <span dangerouslySetInnerHTML={{__html: username}}></span>
          </div>
          <div onClick={()=>addFriend(id)}>add friend</div>
        </div>
      </Link>
    </Route>


  );
}

export default SearchSuggestion;