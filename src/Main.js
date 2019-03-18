import React from 'react';
import {
    Router,
    Link
  } from "@reach/router";
  import Details from "./Details";
  import SearchParams from "./SearchParams";
  import Results from "./Results";

const Main = () => {
    return (
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
            <Link to="/search-params">
              <span aria-label="search" role="img">
                🔍
              </span>
            </Link>
          </header>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </div>
    );
}

export default Main;
