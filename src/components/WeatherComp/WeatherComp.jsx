import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import 'font-awesome/css/font-awesome.min.css';
import './WeatherComp.css';
import warm from '../../assets/warm.png'
import rain from '../../assets/rain.png'
import clouds from '../../assets/clouds.png'
import thunderstorm from '../../assets/thunderstorm.png'
import clear from '../../assets/clear.png'
import haze from '../../assets/haze.png'
import warmBg from '../../assets/warmBg.jpg'
import rainyBg from '../../assets/rainyBg.jpg'
import cloudyBg from '../../assets/cloudyBg.jpg'
import thunderstormBg from '../../assets/thunderstormBg.jpg'
import clearBg from '../../assets/clearBg.jpg'
//import 'font-awesome/css/font-awesome.min.css';
import CityAutocomplete from '../AutoSuggestComp/AutoSuggestComp';

const WeatherComp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const api = {
    key: 'e33a23b1cd7eb9fd7dbfcb1b62591155',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const fetchData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api.key}`)
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      })

  };
  const handleKeyPress=(event)=>{
if(event.key=='enter')
{fetchData}
  }
  

  const kelvinToCelsius = (value) => {
    return (value - 273.15).toFixed(2);
  };

  const handleCityChange = (newCityName) => {
    setCityName(newCityName); 
  };


  const weatherIcons = {
    Mist: warm,
    Rain: rain,
    Clouds : clouds ,
    Thuderstorm:thunderstorm,
    Clear:clear,
    Haze: haze,


  };
  const weatherBg = {
    Mist: warmBg,
    Rain: rainyBg,
    Clouds : cloudyBg ,
    Thuderstorm:thunderstormBg,
    Clear:clearBg,
    Haze:rainyBg

  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ position.coords.latitude}&lon=${position.coords.longitude}&appid=${api.key}`)
      .then((response) => {
        setWeatherData(response.data);
      })
    });
  }, []); 

  return (
    <React.Fragment>

    
      <div className="container">
          <div className="quote">
            <h4>
              Check the best and accurate <span className="active">Weather Report</span>
            </h4>
          </div>
        <div className='result-container'>
        <div className='img-box'>
          <div className="main-content" onKeyDown={handleKeyPress}>
            <CityAutocomplete onCityChange={handleCityChange} />
            <button 
            onClick={fetchData} >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="11" cy="11" r="8" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" />
</svg>
            </button>
          </div>
                <div className='image-main'>
            {weatherData!=null && weatherData.weather.map((condition) => (
                      <img
                        src={weatherBg[condition.main]}
                        alt={condition.main}
                      />
            ))}
            </div>
           </div>
        <div className='content-2'>
       
        <div className='image'>
  {weatherData != null && weatherData.weather.length > 0 && (
    <img
      src={weatherIcons[weatherData.weather[0].main]}
      alt={weatherData.weather[0].main}
    />
  )}

        </div>
        <div className="main-body">
          <div className="result">
            {weatherData !== null && (
              <div className="result-content">
              <div className='display-num'>{kelvinToCelsius(weatherData.main.temp)} °C</div>
                <p><<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="6" />
  <path d="M12 2a5 5 0 0 1 5 5c0 5-5 10-5 10s-5-5-5-10a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3c0 1.96 1.79 5.36 3 6.96 1.21-1.6 3-5 3-6.96a3 3 0 0 0-3-3z" />
</svg>
 {weatherData.name}</p>
                 
                <p >Feels Like {kelvinToCelsius(weatherData.main.feels_like)} °C</p>
                <div className='min-max'>
                <p>Min: <span>{kelvinToCelsius(weatherData.main.temp_min)} °C</span> </p>
                <p>Max: <span> {kelvinToCelsius(weatherData.main.temp_max)} °C</span> </p>
              </div>
              </div>
            )}
          </div>
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WeatherComp;
