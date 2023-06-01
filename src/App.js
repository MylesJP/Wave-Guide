import SearchBar from "./components/SearchBar";
import Faves from "./components/Faves";
import ThreeDays from "./components/ThreeDays";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faWater, faWind } from "@fortawesome/free-solid-svg-icons";
import CurrentConditions from "./components/CurrentConditions";
import axios from "axios";

const apiKey = process.env.REACT_APP_STORMGLASS_API_KEY;
const endpoint = "https://api.stormglass.io/v2/weather/point";

function App() {
  const [location, setLocation] = useState("");
  // const [data, setData] = useState({});
  const [searchString, setsearchString] = useState("");
  // const [searchLat, setsearchLat] = useState("");
  // const [searchLong, setsearchLong] = useState("");
  const [waveData, setwaveData] = useState([]);
  const [tempData, settempData] = useState([]);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  const sendEmail = () => {
    const confirmed = window.confirm("Open email client to email developer?");
    if (confirmed) {
      window.location.href = "mailto:pennermy@oregonstate.edu";
    }
  };

  function addToFavourites() {
    // Check if location is already in favorites
    if (!favourites.includes(location)) {
      // If not, add it
      const newFavourites = [...favourites, location];

      // But check if there are already three favorites
      if (newFavourites.length > 3) {
        // If so, remove the first element from the array
        newFavourites.shift();
      }

      // Update state
      setFavourites(newFavourites);

      // Update localStorage
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    }
  }

  async function clickFunctions() {
    await geocoding();
  }

  async function geocoding() {
    // I pass my partner a search term string and he returns a pair of lat/long coords
    try {
      if (location) {
        const response = await axios.get(
          `https://mapbox-api.onrender.com/get/${location}`
        );
        console.log(response.data);
        setsearchString(response.data.text);
        // setsearchLong(response.data.center[0]);
        // setsearchLat(response.data.center[1]);
        callStormglass(response.data.center[1], response.data.center[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function callStormglass(searchLat, searchLong) {
    try {
      const endDate = new Date()
      const currentDate = new Date()
      endDate.setDate(currentDate.getDate() + 3)
      const endDateString = endDate.toISOString().split('T')[0]
      const response = await axios.get(endpoint, {
        params: {
          lat: searchLat,
          lng: searchLong,
          params: "windSpeed,airTemperature,waterTemperature,waveHeight",
          end: endDateString
        },
        headers: {
          Authorization: apiKey,
        },
      });
      const temperatures = await extractTemperatures(response.data.hours);
      const waves = await extractWaves(response.data.hours);
      settempData(temperatures);
      setwaveData(waves);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function extractWaves(hours) {
    const currentDate = new Date().toISOString().split("T")[0];
    return hours
      .filter((hour) => {
        const date = new Date(hour.time);
        const hourDate = date.toISOString().split("T")[0];
        return hourDate === currentDate && date.getUTCHours() === 22;
      })
      .map((hour) => {
        return {
          time: hour.time,
          waveHeight: hour.waveHeight,
          windSpeed: hour.windSpeed,
        };
      });
  }

  async function extractTemperatures(hours) {
    const currentDate = new Date().toISOString().split("T")[0];
    return hours
      .filter((hour) => {
        const date = new Date(hour.time);
        const hourDate = date.toISOString().split("T")[0];
        return hourDate === currentDate && date.getUTCHours() === 22;  // 22:00 UTC is 3pm PST
      })
      .map((hour) => {
        return {
          time: hour.time,
          airTemperature: hour.airTemperature,
          waterTemperature: hour.waterTemperature,
        };
      });
  }

  useEffect(() => {
    console.log(tempData[0]);
    console.log(waveData[0]);
  }, [tempData, waveData]);

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
        {tempData.length > 0 && waveData.length > 0 && searchString && (
          <>
            <div className="top">
              <div className="location">
                <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#ffffff" }} />
                <h1>{searchString}</h1>
                <br/>
                <FontAwesomeIcon icon={faWater} style={{ color: "#ffffff" }} />
                <p id="temp">{Math.round(tempData[0].waterTemperature.sg)}°C</p>
                <FontAwesomeIcon icon={faWind} style={{ color: "#ffffff" }} />
                <p id="temp">{Math.round(tempData[0].airTemperature.sg)}°C</p>
              </div>
            </div>
            <div className="current-cond-container">
              <CurrentConditions waveData={waveData}/>
            </div>
            <div className="three-day-container">
              <ThreeDays />
            </div>
          </>
        )}
      </div>
      {/* Move feedback to the bottom */}
      <div className="feedback">
        <button onClick={sendEmail}>Feedback</button>
      </div>
    </div>
  );
}

export default App;
