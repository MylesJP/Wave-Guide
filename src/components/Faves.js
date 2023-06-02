import React from "react";

export default function Faves({setLocation}) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const handleFavouriteClick = (location) => {
    setLocation(location)
  }

  return (
    <>
      <div className="favebox">
        {favourites.map((favourite, index) => (
          <div className="fave" key={index} onClick={() => handleFavouriteClick(favourite)}>
            {favourite}
          </div>
        ))}
      </div>
    </>
  );
}
