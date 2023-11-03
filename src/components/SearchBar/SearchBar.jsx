import React, { useState } from 'react';
import CSS from './SearchBar.module.css';
import PropTypes from 'prop-types';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    props.handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    props.handleClear();
  };

  return (
    <header className={CSS.header}>
      <form onSubmit={handleSearch}>
        <button className={CSS.button} type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <input
          className={CSS.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
          required
        />
        <button className={CSS.button} type="button" onClick={handleClear}>
          Clear search results
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default SearchBar;
