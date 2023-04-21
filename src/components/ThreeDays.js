import React from "react";

export default function ThreeDays() {
  return (
    <>
      <h2>Three Day Forecast</h2>
      <div className="three-day">
        <div className="day">
          <h3>Monday</h3>
          <div className="rating">
            <p>
              <b>Surf rating:</b> 3/5
            </p>
          </div>
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
            <br/>
          </div>
        </div>
        <div className="day">
          <h3>Tuesday</h3>
          <div className="rating">
            <p>
              <b>Surf rating:</b> 3/5
            </p>
          </div>
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
          <br/>
        </div>
        <div className="day">
          <h3>Wednesday</h3>
          <div className="rating">
            <p>
              <b>Surf rating:</b> 3/5
            </p>
          </div>
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
      </div>
    </>
  );
}
