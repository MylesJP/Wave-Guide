import SearchBar from "./components/SearchBar";
import Faves from "./components/Faves";
import ThreeDays from "./components/ThreeDays";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faTriangleExclamation,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import CurrentConditions from "./components/CurrentConditions";
import axios from "axios";

const API_KEY =
  "b6b2605c-dfec-11ed-bce5-0242ac130002-b6b26124-dfec-11ed-bce5-0242ac130002";
const endpoint = "https://api.stormglass.io/v2/weather/point";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [forecastData, setforecastData] = useState({});
  const [searchString, setsearchString] = useState("");

  const sendEmail = () => {
    const confirmed = window.confirm("Open email client to email developer?");
    if (confirmed) {
      window.location.href = "mailto:pennermy@oregonstate.edu";
    }
  };

  const geocoding = async () => {
    // I pass my partner a search term string and he returns a pair of lat/long coords
    // Note that the results from Mapbox are sorted by relevance
    if (location){
      axios
        .get(
          `https://mapbox-api.onrender.com/get/${location}`
        )
        .then((response) => {
          console.log(response.data);
          setsearchString(response.data.text)
        })
        .catch(error => {
          console.log(error)
      });
    }
  };

  function clickFunctions() {
    searchLocation();
    // callStormglass();
    geocoding();
  }

  function callStormglass() {
    axios
      .get(endpoint, {
        params: {
          lat: 49.122754,
          lng: -125.895136,
          params: "windSpeed",
        },
        headers: {
          Authorization: API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const searchLocation = () => {
    // This will be where the microservice passes me information
    console.log(`Searching for ${location}`);
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
            <h1>{searchString}</h1>
            <FontAwesomeIcon icon={faWater} style={{ color: "#ffffff" }} />
            <p id="temp">8°C</p>
            <FontAwesomeIcon icon={faWind} style={{ color: "#ffffff" }} />
            <p id="temp">22°C</p>
          </div>
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
      <div className="feedback">
        <button onClick={sendEmail}>Feedback</button>
      </div>
    </div>
  );
}

export default App;
