import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faWater, faWind } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import Faves from "./components/Faves";
import ThreeDays from "./components/ThreeDays";
import CurrentConditions from "./components/CurrentConditions";
import axios from "axios";

const stormglassAPIKey = process.env.REACT_APP_STORMGLASS_API_KEY;
const mapboxAPIKey = process.env.REACT_APP_MAPBOX_API_KEY;
const waveEndpoint = "https://api.stormglass.io/v2/weather/point";
const tideEndpoint = "https://api.stormglass.io/v2/tide/extremes/point";

function App() {
  const [userInput, setUserInput] = useState("");
  const [location, setLocation] = useState("");
  const [searchString, setsearchString] = useState("");
  const [waveData, setwaveData] = useState([]);
  const [tideData, settideData] = useState([]);
  const [tempData, settempData] = useState([]);
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    if (location) {
      geocoding();
      setUserInput("");
      console.log(location);
    }
  }, [location]);

  const sendEmail = () => {
    const confirmed = window.confirm("Open email client to email developer?");
    if (confirmed) {
      window.location.href = "mailto:pennermy@oregonstate.edu";
    }
  };

  function addToFavourites() {
    if (!favourites.includes(location)) {
      const newFavourites = [...favourites, location];

      if (newFavourites.length > 3) {
        newFavourites.shift();
      }
      setFavourites(newFavourites);
      // Update localStorage
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    }
  }

  async function geocoding() {
    try {
      if (location) {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxAPIKey}`
        );
        setsearchString(response.data.features[0].text);
        getWaveData(
          response.data.features[0].center[1],
          response.data.features[0].center[0]
        );
        getTideData(
          response.data.features[0].center[1],
          response.data.features[0].center[0]
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getWaveData(searchLat, searchLong) {
    try {
      const endDate = new Date();
      const currentDate = new Date();
      endDate.setDate(currentDate.getDate() + 4);
      const endDateString = endDate.toISOString().split("T")[0];
      const response = await axios.get(waveEndpoint, {
        params: {
          lat: searchLat,
          lng: searchLong,
          params: "windSpeed,airTemperature,waterTemperature,waveHeight",
          end: endDateString,
        },
        headers: {
          Authorization: stormglassAPIKey,
        },
      });

      const threeDayForecast = calculateThreeDayForecast(response.data.hours);
      setThreeDayForecast(threeDayForecast);
      settempData(await extractTemperatures(response.data.hours));
      setwaveData(await extractWaves(response.data.hours));
    } catch (error) {
      console.log(error);
    }
  }

  function calculateThreeDayForecast(hoursData) {
    return [1, 2, 3].map((day) => {
      const startDay = new Date();
      startDay.setUTCDate(startDay.getUTCDate() + day);
      startDay.setUTCHours(0, 0, 0, 0); // Start of the day
      const endDay = new Date(startDay);
      endDay.setUTCDate(endDay.getUTCDate() + 1);
      endDay.setUTCHours(23, 59, 59, 999); // End of the day
      const dayData = hoursData.filter((hour) => {
        const hourDate = new Date(hour.time);
        return hourDate >= startDay && hourDate < endDay;
      });

      const waveHeightMax = Math.max(...dayData.map((d) => d.waveHeight?.sg || 0));
      const windSpeedMax = Math.max(...dayData.map((d) => d.windSpeed?.sg || 0));

      return {
        day: startDay.toLocaleDateString("en-US", { weekday: "long" }),
        waveHeightMax,
        windSpeedMax,
      };
    });
  }

  async function getTideData(searchLat, searchLong) {
    try {
      const currentDate = new Date();
      const utcDate = new Date(
        currentDate.getTime() + currentDate.getTimezoneOffset() * 60000
      );
      const pstDateInUTC = new Date(utcDate.getTime() - 7 * 60 * 60 * 1000);
      const startDateString = pstDateInUTC.toISOString();
      const response = await axios.get(tideEndpoint, {
        params: {
          lat: searchLat,
          lng: searchLong,
          start: startDateString,
        },
        headers: {
          Authorization: stormglassAPIKey,
        },
      });
      const jsonData = response.data;
      const futureTideEvents = jsonData.data
        .filter((event) => new Date(event.time) > currentDate)
        .sort((a, b) => new Date(a.time) - new Date(b.time));

      const nextTideEvent = futureTideEvents[0]; // The nearest tide event in the future
      settideData({
        nextTide: nextTideEvent?.time,
        nextTideHeight: nextTideEvent?.height,
        nextTideType: nextTideEvent?.type, // high or low
      });
    } catch (error) {
      console.error(`Failed to fetch tide times: ${error.message}`);
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
        return hourDate === currentDate && date.getUTCHours() === 22; // 22:00 UTC is 3pm PST
      })
      .map((hour) => {
        return {
          time: hour.time,
          airTemperature: hour.airTemperature,
          waterTemperature: hour.waterTemperature,
        };
      });
  }

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <SearchBar
            location={location}
            setLocation={setLocation}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </div>
        <div className="faves">
          <Faves setLocation={setLocation} />
        </div>
        {tempData.length > 0 && waveData.length > 0 && searchString && (
          <>
            <div className="top">
              <div className="location">
                <div className="faves" onClick={addToFavourites}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                  <h1>{searchString}</h1>
                </div>
                <br />
                <FontAwesomeIcon icon={faWater} style={{ color: "#ffffff" }} />
                <p id="temp">{Math.round(tempData[0].waterTemperature.sg)}°C</p>
                <FontAwesomeIcon icon={faWind} style={{ color: "#ffffff" }} />
                <p id="temp">{Math.round(tempData[0].airTemperature.sg)}°C</p>
              </div>
            </div>
            <div className="current-cond-container">
              <CurrentConditions waveData={waveData} tideData={tideData} />
            </div>
            <div className="three-day-container">
              <ThreeDays forecasts={threeDayForecast} />
            </div>
          </>
        )}
      </div>
      <div className="feedback">
        <button onClick={sendEmail}>Feedback</button>
      </div>
    </div>
  );
}

export default App;
