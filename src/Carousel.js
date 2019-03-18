import React, {useState, useEffect} from "react";

function Carousel({media}){
  const [pics, setPics] = useState([])
  const [active, setActive] = useState(0)
  const [prevState, setPrevState] = useState(null)

  useEffect(() => getPhotos(), [media])

  function handleIndexClick(event){
    setActive(+event.target.dataset.index);
  };

function getPhotos(){
  // let mediaArray = media
  let photos = []
  if (prevState !== media &&  media && media.photos && media.photos.photo) {
    photos = (media.photos.photo.filter(photo => photo["@size"] === "pn"))
    setPrevState(media)
  }
  return setPics(photos)
}
   return (
      <div className="carousel">
        <img src={pics.length ? pics[active].value : ""} alt="animal" />
          <div className="carousel-smaller">
            {pics.map((photo, index) => (
              /* eslint-disable-next-line */
              <img
                onClick={handleIndexClick}
                data-index={index}
                key={photo.value}
                src={photo.value}
                className={index === active ? "active" : ""}
                alt="animal thumnbail"
              />
            ))}
          </div>
      </div>
    );
  }

export default Carousel;