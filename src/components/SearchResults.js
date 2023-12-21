import React from 'react'
import TrackList from './TrackList'

function SearchResults({ tracks, saveToTracklist }) {
  // receive tracks prop from SearchResults
  return (
    <div className='results box'>
      <h1>Results</h1>
      {/* Add TrackList Component */}
      <TrackList tracks={tracks} saveToTracklist={saveToTracklist} />
    </div>
  )
}

export default SearchResults
