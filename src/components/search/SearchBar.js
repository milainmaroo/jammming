import React from 'react'

function SearchBar() {
  return (
    <div className='search-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search...'
      ></input>{' '}
      <br />
      <button className='search-button' type='submit'>
        Search
      </button>
    </div>
  )
}

export default SearchBar
