import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import { debounce } from "throttle-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch } from "react-icons/fa";
import OutsideAlerter from "./OutsideAlerter";
import { Redirect } from "react-router-dom";
import SearchSuggestion from "./SearchSuggestion";

function SearchBar({ setUserInfo }) {
  const [searchField, setSearchField] = useState("");
  const [searchingSpinner, setSearchingSpinner] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSetField = debounce(500, setSearchField);
  let debounced;
  const latestSearchField = useRef("");
  useEffect(() => {
    if (latestSearchField.current === "") {
      // console.log("search field is empty")
      setSearchField("");
      setShowSuggestions(false);
      setSearchingSpinner(false);
    } else {
      // console.log(searchField)
    }
  }, [searchField]);

  function searchFieldChangeHandler(e) {
    latestSearchField.current = e.target.value;
    // console.log("latest ", latestSearchField)
    if (latestSearchField.current === "") {
      setSearchField("");
      debounced && debounced.cancel();
    } else {
      if (
        latestSearchField.current.charAt(
          latestSearchField.current.length - 1
        ) !== " "
      ) {
        debounced = debouncedSetField(latestSearchField.current);
      }

      setShowSuggestions(true);
    }
  }

  function searchFieldKeyHandler(e) {
    if (e.key === "Enter") {
      // console.log("enter pressed")
      // console.log('Redirect :', searchField)
      // return <Redirect to="/search/something"/>
    }
    if (e.keyCode === 27) {
      setShowSuggestions(false);
      // console.log("escape pressed")
    }
  }

  function clickedOutOfSearchBar() {
    // alert("You clicked outside of me!");
    setShowSuggestions(false);
  }

  function clickedOnSearchBar() {
    setShowSuggestions(true);
  }

  function searchButtonClick() {
    console.log("Search Button Clicked");
  }

  return (
    <OutsideAlerter clickedOut={clickedOutOfSearchBar}>
      <div className="searchBar">
        {searchingSpinner ? (
          <div className="small-loader"></div>
        ) : (
          <FaSearch
            onClick={searchButtonClick}
            className="search-icon"
            icon={"search"}
          />
        )}
        <input
          onChange={searchFieldChangeHandler}
          onClick={clickedOnSearchBar}
          onKeyDown={searchFieldKeyHandler}
          type="text"
          placeholder="Search for events or users..."
        />

        {searchField === "" || showSuggestions === false || (
          <SearchSuggestions
            searchField={searchField}
            showSuggestions={showSuggestions}
            setSearchingSpinner={setSearchingSpinner}
            setShowSuggestions={setShowSuggestions}
            setUserInfo={setUserInfo}
          />
        )}
      </div>
    </OutsideAlerter>
  );
}

export default SearchBar;
