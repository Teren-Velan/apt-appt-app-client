import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import SearchSuggestion from "./SearchSuggestion";
import NavLink from "react-bootstrap/NavLink";
import {Link} from "react-router-dom";

function SearchSuggestions({searchField, showSuggestions, setSearchingSpinner, setShowSuggestions}) {


  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    if (searchField.length > 0) {
      autocompleteSearch(searchField)
    }

  }, [searchField])


  async function autocompleteSearch() {
    console.log("search for ", searchField)
    try {
      setSearchingSpinner(true)
      console.log("searching...")
      let {data} = await axios.get(`http://localhost:80/event`, {
        params: {
          searchField: searchField
        }
      })
      setSearchResults(data)
      console.log("searchResults: ", searchResults)
      // console.log("searchResults users: ",  searchResults.users)
      setSearchingSpinner(false)
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log(err.message)
      }
      console.log(err)
    }
  }


  let render
  // console.log(Object.keys(searchResults.users).length)
  if (Object.keys(searchResults).length === 0) {
    render = ""
  } else {
    if (searchResults.users) {
      render = searchResults.users.map((user) => {
        return <SearchSuggestion user={user} key={user._id} setShowSuggestions={setShowSuggestions} searchField={searchField}/>
      })
    }
  }


  return (
    <div className="searchSuggestions">
      {render}
    </div>
  );
}

export default SearchSuggestions