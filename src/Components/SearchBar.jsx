import React, { useState } from 'react';

function SearchBar ({ onSearch })  {
  const [search, setSearch] = useState(null);

  function handleChange (event) {
    setSearch(event.target.value);
  }

  function handleSearch () {
    onSearch(search);
  }

  return (
    <div>
      <input className='form-control form-size' type="text" value={search} placeholder="Search" onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;