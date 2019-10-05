import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";
function Search() {
  function search() {
    navigate("/");
  }
  return (
    <div className="search-route">
      <SearchBox search={search} />
    </div>
  );
}

export default Search;
