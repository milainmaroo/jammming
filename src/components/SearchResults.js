import React from 'react'
import TrackList from './TrackList'

function SearchResults({ tracks, onAdd }) {
  return (
    <div className='results box'>
      <h1>Results</h1>
      {/* Add TrackList Component */}
      <TrackList tracks={SearchResults} onAdd={onAdd} isRemoval={false} />
      {/* <ul>
        {tracks.map((track, id) => (
          <li key={id}>
            <h3>{track.name}</h3>
            <button className='add-btn'>+</button>
            <span>
              {track.artist} | {track.album}
            </span>
            <hr />
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default SearchResults
