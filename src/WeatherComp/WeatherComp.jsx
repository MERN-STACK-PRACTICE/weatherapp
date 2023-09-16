import { useState } from 'react';
import React from 'react';
import axios from 'axios';
 import './WeatherComp.css'

const WeatherComp = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null); // Initialize as null

    const api = {
        key: "e33a23b1cd7eb9fd7dbfcb1b62591155",
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    const fetchData = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api.key}`)
            .then((response) => {
                console.log(response.data);
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error(error);
                setWeatherData(null); // Set weatherData to null in case of an error
            });
    }

    const kelvinToCelcius = (value) => {
        return (value - 273.15).toFixed(2); // Convert Kelvin to Celsius with 2 decimal places
    }

    return (
        <React.Fragment>
            <div className='main-body'>
            <div className='main-content'>
                <h1>Weather Application</h1>
                <input
                    type="text"
                    placeholder="Enter City Name"
                    value={cityName}
                    onChange={(event) => setCityName(event.target.value)}
                />
                </div>
                <button onClick={fetchData}>Get Weather</button>
                <div className='result'>
                    {weatherData !== null && ( 
                        <div>
                            <p>Timezone: {weatherData.timezone}</p>
                            <p>City: {weatherData.name}</p>
                            <p>Temperature: {kelvinToCelcius(weatherData.main.temp)} °C</p>
                            <p>Feels Like: {kelvinToCelcius(weatherData.main.feels_like)} °C</p>
                            <p>Minimum Temperature: {kelvinToCelcius(weatherData.main.temp_min)} °C</p>
                            <p>Maximum Temperature: {kelvinToCelcius(weatherData.main.temp_max)} °C</p>
                        </div>
                    ) }
                </div>
            </div>
        </React.Fragment>
    );
}

export default WeatherComp;
