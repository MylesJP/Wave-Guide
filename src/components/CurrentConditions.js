import React from "react";

export default function CurrentConditions(props) {
  const { nextTide, nextTideHeight, nextTideType } = props.tideData;

  // Convert tide times to PST and format them
  let date = new Date(nextTide);
  const offsetMillis = date.getTimezoneOffset() * 60 * 1000; // This is the offset for the local timezone where the browser is running
  const pstOffsetMillis = 8 * 60 * 60 * 1000; // This is the offset for PST (standard time)
  const pdtOffsetMillis = 7 * 60 * 60 * 1000; // This is the offset for PDT (daylight saving time)
  const isDst = date.getMonth() > 2 && date.getMonth() < 11; // This is a simple check for daylight saving time
  date = new Date(date.getTime() - offsetMillis + (isDst ? pdtOffsetMillis : pstOffsetMillis));
  const nextTideTimePST = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <h2>Current Conditions</h2>
      <div className="current-conditions">
        <div className="condition">
          <p>
            <b>Wave height:</b> {props.waveData[0].waveHeight.sg} m
          </p>
        </div>
        <div className="condition">
          <p>
            <b>Wind speed:</b> {Math.round(props.waveData[0].windSpeed.noaa * 3.6)} km/h
          </p>
        </div>
        <div className="condition">
          <p>
            <b>Next tide ({nextTideType}):</b> {nextTideHeight.toFixed(2)} m at{" "}
            {nextTideTimePST}
          </p>
        </div>
      </div>
    </>
  );
}
