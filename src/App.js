import SearchBar from "./components/SearchBar";
import Faves from "./components/Faves";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons'

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
          <Faves/>
        </div>
        <div className="top">
          <div className="location">
            <p>
              <FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ffffff",}} />
              <h1>Tofino, BC</h1>              
            </p>

          </div>
          <div className="temp">
            <p>25°C</p>
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.main !== undefined && <h2>36 Hours</h2>}
      </div>
    </div>
  );
}

export default App;
