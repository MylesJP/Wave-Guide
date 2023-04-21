import React from "react";

export default function SearchBar({ location, setLocation, clickFunctions }) {
  const shouldDisplayClear = location.length > 0;

  const searchOnEnter = (event) => {
    if (event.key === "Enter") {
      clickFunctions();
    }
  };

  return (
    <>
      <div className="fa fa-search" onClick={clickFunctions}></div>
      <input
        value={location}
        type="text"
        onKeyDown={searchOnEnter}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Enter Location or lat/long"
      />
      {shouldDisplayClear && (
        <div className="fa fa-times" onClick={() => setLocation("")}></div>
      )}
    </>
  );
}