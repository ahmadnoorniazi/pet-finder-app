import React, {useState, useEffect, useContext} from "react";
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { SearchContext } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

function Results(props){
  const [pets, setPets] = useState([])
  useEffect(() => search(),[])
  function search(){
    petfinder.pet
      .find({
        location: props.searchParams.location,
        animal: props.searchParams.animal,
        breed: props.searchParams.breed,
        output: "full"
      })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        setPets(pets);
      });
  };
    return (
      <div className="search">
        <SearchBox search={search} />
        {pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(",");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }

export default function ResultsWithContext(props) {
  const context = useContext(SearchContext)
  return (
    <Results {...props} searchParams={context} />
  );
}
