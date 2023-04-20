import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [forecastData, setforecastData] = useState({});

  function clickFunctions() {
    //searchLocation()
    //getForecast()
    console.log("Some stuff");
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
      </div>
    </div>
  );
}

export default App;
