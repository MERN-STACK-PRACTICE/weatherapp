import React, { useState } from 'react';
import axios from 'axios';
import './AutoSuggestComp.css'

const CityAutocomplete = ({ onCityChange }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
      const response = await axios.get(
        `http://api.geonames.org/searchJSON?q=${inputValue}&maxRows=5&username=lathikasunder_`
      );
      const cityNames = response.data.geonames.map((city) => city.name);
      setSuggestions(cityNames);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    fetchSuggestions(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    onCityChange(suggestion);
    setSuggestions([]); 
  };

  return (
    <div className="city-autocomplete">
      <input
        type="text"
        placeholder="Enter a city name"
        value={value}
        onChange={handleChange}
      />
      <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityAutocomplete;
