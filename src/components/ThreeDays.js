import React from "react";

export default function ThreeDays({forecasts}) {
  return (
    <>
      <h2>Three Day Forecast</h2>
      <div className="three-day">
        {forecasts.map((forecast) => (
          <div className="day" key={forecast.day}>
            <h3>{forecast.day}</h3>
            <div className="condition">
              <p>
                <b>Wave height:</b> {forecast.waveHeightMax.toFixed(1)} m
              </p>
            </div>
            <div className="condition">
              <p>
                <b>Wind speed:</b> {Math.round(forecast.windSpeedMax*3.6)} km/h
              </p>
            </div>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
