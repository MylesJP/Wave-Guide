import React from "react";

export default function CurrentConditions() {
  return (
    <>
      <h2>Current Conditions</h2>
      <div className="current-conditions">
        <div className="condition">
          <p>
            <b>Wave height:</b> 1.2 - 1.5 m
          </p>
        </div>
        <div className="condition">
          <p>
            <b>Wind speed:</b> 25 - 35 km/h SE
          </p>
        </div>
        <div className="condition">
          <p>
            <b>High tide:</b> 3.7 m at 18:32
          </p>
        </div>
        <div className="condition">
          <p>
            <b>Low tide:</b> 0.2 m at 23:54
          </p>
        </div>
      </div>
    </>
  );
}
