import React from "react";

export default function CurrentConditions(props) {
  return (
    <>
      <h2>Current Conditions</h2>
      <div className="current-conditions">
        <div className="condition">
          <p>
            <b>Wave height:</b> {props.waveData[0].waveHeight.noaa} m
          </p>
        </div>
        <div className="condition">
          <p>
            <b>Wind speed:</b> {Math.round(props.waveData[0].windSpeed.noaa*3.6)} km/h
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
