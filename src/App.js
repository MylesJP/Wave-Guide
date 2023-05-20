import SearchBar from "./components/SearchBar";
import Faves from "./components/Faves";
import ThreeDays from "./components/ThreeDays";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faTriangleExclamation,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import CurrentConditions from "./components/CurrentConditions";
import axios from "axios";

const apiKey = process.env.REACT_APP_STORMGLASS_API_KEY;
const endpoint = "https://api.stormglass.io/v2/weather/point";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [forecastData, setforecastData] = useState({});
  const [searchString, setsearchString] = useState("");
  const [searchLat, setsearchLat] = useState("");
  const [searchLong, setsearchLong] = useState("");

  const sendEmail = () => {
    const confirmed = window.confirm("Open email client to email developer?");
    if (confirmed) {
      window.location.href = "mailto:pennermy@oregonstate.edu";
    }
  };

  async function clickFunctions() {
    await geocoding();
    // callStormglass(searchLat, searchLong);
  }

  async function geocoding() {
    // I pass my partner a search term string and he returns a pair of lat/long coords
    // Note that the results from Mapbox are sorted by relevance
    if (location) {
      await axios
        .get(`https://mapbox-api.onrender.com/get/${location}`)
        .then((response) => {
          console.log(response.data);
          setsearchString(response.data.text);
          setsearchLong(response.data.center[0]);
          setsearchLat(response.data.center[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (searchLat && searchLong) {
      callStormglass(searchLat, searchLong);
    }
  }, [searchLat, searchLong]);

  async function callStormglass(searchLat, searchLong) {
    console.log("stormglass called");
    console.log(searchLat);
    console.log(searchLong);
    console.log(apiKey);
    axios
      .get(endpoint, {
        params: {
          lat: searchLat,
          lng: searchLong,
          params: "windSpeed,airTemperature,waterTemperature,waveHeight",
        },
        headers: {
          Authorization: apiKey,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          {/* <div className="warning">
            <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#ffae00" }} />
            <p id="warning">Dangerous conditions reported.</p>
          </div> */}
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
