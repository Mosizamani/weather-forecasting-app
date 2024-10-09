import React, { useState } from 'react';

const SearchBar = ({ onSearch, inputValue, setInputValue }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city..."
      />
      <button type="submit">Get Weather</button>
    </form>
  )
}

export default SearchBar