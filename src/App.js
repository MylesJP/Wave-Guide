import SearchBar from "./components/SearchBar";
import Faves from "./components/Faves";
import ThreeDays from "./components/ThreeDays";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import CurrentConditions from "./components/CurrentConditions";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [forecastData, setforecastData] = useState({});

  function clickFunctions() {
    //searchLocation() TODO
    //getForecast() TODO
    console.log({ location }.location);
  }

  const searchLocation = () => {
    // This will be where the microservice passes me information
    console.log("location goes here");
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <SearchBar
            location={location}
            setLocation={setLocation}
            clickFunctions={clickFunctions}
          />
        </div>
        <div className="faves">
          <Faves />
        </div>
        <div className="top">
          <div className="location">
            <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#ffffff" }} />
            <h1>Tofino, BC</h1>
            <p id="temp">22°C</p>
          </div>
          <div className="temp"></div>
          <div className="warning">
            <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#ffae00" }} />
            <p id="warning">Dangerous conditions reported.</p>
          </div>
        </div>
        <div className="current-cond-container">
          <CurrentConditions />
        </div>
        <div className="three-day-container">
          <ThreeDays />
        </div>
      </div>
    </div>
  );
}

export default App;
