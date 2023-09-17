
import React, { useEffect, useState } from 'react';

const api = {
  key: "[ENTER YOUR KEY HERE]",
  base: "https://api.openweathermap.org/data/3.0/",
  geobase: "http://api.openweathermap.org/geo/1.0/",
  mateobase: "https://api.open-meteo.com/v1/forecast?"
}



function App() {

  const[query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [location, setLocation] = useState({});
  const [temp, setTemp] = useState('');
  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.geobase}direct?q=${query}&limit=5&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        
        setLocation(result[0]);
        setQuery('');
        console.log(result);
        console.log("one");
        setLat(result[0].lat);
        setLon(result[0].lon);
        setLat(50);
        console.log(result[0].lon);
        console.log(lon);
        /*
        return fetch(`${api.mateobase}latitude=${result[0].lat}&longitude=${result[0].lon}&hourly=weathercode&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            console.log("two");
            console.log(result);
          });
          */
      })
      
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  }

  useEffect(() => {
    console.log("useffect triggered")
    console.log(lon);
    fetch(`${api.mateobase}latitude=${lat}&longitude=${lon}&hourly=weathercode&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            console.log("two");
            console.log(result);
          });
  }, [lat, lon]);
  
  
  let weatherCode = (code) => {
    if(code == 0) {
      return "Clear Skies"
    }
    if(code == 1) {
      return "Mainly Clear"
    }

    if(code === 2) {
      return "Partly Cloudy"
    }
    
    if(code == 3) {
      return "Overcast"
    }

    if(code == 45 || code == 48) {
      return "Foggy"
    }

    if(code == 51 || code == 53 || code == 55) {
      return "Drizzle"
    }

    if(code == 56 || code == 57) {
      return "Freezing Drizzle"
    }

    if(code == 61 || code == 63 || code == 65) {
      return "Rain"
    }

    if(code == 66 || code == 67) {
      return "Freezing Rain"
    }

    if(code == 71 || code == 73 || code == 75 || code === 77) {
      return "Snow"
    }

    if(code > 79 && code < 83) {
      return "Rain showers"
    }

    if(code === 85 || code === 86) {
      return "Snow Showers"
    }

    if(code < 100 && code > 94) {
      return "Thunderstorms"
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month= months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className="app">
      
      <main>
      <div className = "search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          //event.target is the text element
          //event.target.value is the literal value of it 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
      </div>
 
      {(lat && lon && weather.current_weather ? 
      
      <div>
      <div className="location-box">
      
        <div className="location">{location.name}, {location.state}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
        {weather.current_weather.temperature}°F
        </div>
        <div className="weather">{weatherCode(weather.current_weather.weathercode)}</div>
      </div>
      </div>
      : ('') )}
      </main>
    </div>
  );
}

export default App;
