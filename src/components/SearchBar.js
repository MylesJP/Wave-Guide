import React from "react";

export default function SearchBar({ setLocation, userInput, setUserInput }) {
  const shouldDisplayClear = userInput.length > 0;

  const searchOnEnter = (event) => {
    if (event.key === "Enter") {
      setLocation(userInput);
    }
  };

  return (
    <>
      <div className="fa fa-search" onClick={() => setLocation(userInput)}></div>
      <input
        value={userInput}
        type="text"
        onKeyPress={searchOnEnter}
        onChange={(event) => setUserInput(event.target.value)}
        placeholder="Enter beach"
      />
      {shouldDisplayClear && (
        <div className="fa fa-times" onClick={() => setUserInput("")}></div>
      )}
    </>
  );
}