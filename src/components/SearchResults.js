import React from 'react'
import TrackList from './TrackList'

function SearchResults({ tracks, addTrack }) {
  // receive tracks prop from SearchResults Component
  return (
    <div className='results box'>
      <h1>Results</h1>
      {/* Add TrackList Component */}
      <TrackList tracks={tracks} addTrack={addTrack} />
    </div>
  )
}

export default SearchResults
