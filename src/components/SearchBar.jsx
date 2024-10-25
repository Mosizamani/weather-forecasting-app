import React, { useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, inputValue, setInputValue }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALcj43SbYPxgq6GadxWwZgkjOmMYOR77A&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;  // Initialize autocomplete when script is loaded
      document.head.appendChild(script);
    }

    const initAutocomplete = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setInputValue(place.formatted_address);
        } else if (place.name) {
          setInputValue(place.name);
        }
      });
    };

    if (!window.google) {
      loadScript();
    } else {
      initAutocomplete();
    }
  }, [setInputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city..."
      />
      <br />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default SearchBar;

