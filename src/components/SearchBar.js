import React, { useState } from 'react'

function SearchBar({ searchTracklist }) {
  const [searchText, setSearchText] = useState('')

  return (
    <div className='search-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search...'
        onChange={(e) => setSearchText(e.target.value)}
      ></input>{' '}
      <br />
      <button
        className='search-btn'
        onClick={() => searchTracklist(searchText)}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
