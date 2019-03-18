import React, { useState, useEffect } from "react";
import pf from "petfinder-client";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
function Details(props){
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModel] = useState(false)
  const [name, setName] = useState("")
  const [animal, setAnimal] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [media, setMedia] = useState("")
  const [breed, setBreed] = useState("")

  function toggleModal(){
    setShowModel(!showModal);
  }

  function fetchData(){
     petfinder.pet.get({
      output: "full",
      id: props.id
    }).then(data => {
      let breed;
      const pet = data.petfinder.pet;
      if (Array.isArray(pet.breeds.breed)) {
        breed = pet.breeds.breed.join(",");
      } else {
        breed = pet.breeds.breed;
      }
      setAnimal(pet.animal)
      setName(pet.name)
      setLocation(`${pet.contact.city},  ${pet.contact.state}`)
      setDescription(pet.description)
      setMedia(pet.media)
      setBreed(breed)
      setLoading(false)
    })
  }

  useEffect( () => {
    fetchData()
  },[])
    return (
      loading ? <h1>loading ....</h1> :
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={toggleModal}>Adopt {name}</button>;
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={toggleModal}>Yes</button>
                <button onClick={toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }

export default Details;
