import React, { useState } from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Main from "./Main";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default function App() {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleAnimalChange(event) {
    setAnimal(event.target.value);
    setBreed("");
    getBreeds();
  }

  function handleBreedChange(event) {
    setBreed(event.target.value);
  }

  function getBreeds() {
    if (animal) {
      petfinder.breed
        .list({
          animal: animal
        })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            setBreeds(data.petfinder.breeds.breed);
          } else {
            setBreeds([]);
          }
        });
    }
  }
  const searchContext = {
    location,
    animal,
    breed,
    breeds,
    handleAnimalChange,
    handleBreedChange,
    handleLocationChange,
    getBreeds
  };
  return (
    <Provider value={searchContext}>
      <Main />
    </Provider>
  );
}
render(React.createElement(App), document.getElementById("root"));
