import React from 'react'

function SearchResults({ tracks }) {
  return (
    <div className='results'>
      <h1>Results</h1>
      <ul>
        {tracks.map((track, id) => (
          <li key={id}>
            <h3 className='name'>{track.name}</h3>
            {/* <button>+</button> */}
            <span>
              {track.artist} | {track.album}
            </span>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
