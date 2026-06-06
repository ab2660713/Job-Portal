import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch, showLocation = true }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
      </div>

      {showLocation && (
        <div className="search-input-group">
          <FaMapMarkerAlt className="search-icon" />
          <input
            type="text"
            placeholder="City, state, or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      <button type="submit" className="search-button">
        Search Jobs
      </button>
    </form>
  );
};

export default SearchBar;
