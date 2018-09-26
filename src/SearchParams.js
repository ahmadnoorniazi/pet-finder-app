import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class Search extends React.Component {
  search() {
    navigate("/");
  }
  render() {
    return (
      <div className="search-route">
        <SearchBox search={this.search} />
      </div>
    );
  }
}

export default Search;
