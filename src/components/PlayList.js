import React from 'react'
import TrackList from './TrackList'

function PlayList({ playlistName, playlistTracks }) {
  // Pass down Playlist name and tracks from App component
  return (
    <div className='playlist box'>
      <input type='text' />
      {/* Add TrackList Component */}
      <TrackList tracks={playlistTracks} />
      <ul>
        {playlistTracks.map((track, id) => (
          <li key={id}>
            <h3>{track.name}</h3>
            <button className='add-btn'>+</button>
            <span>
              {track.artist} | {track.album}
            </span>
            <hr />
          </li>
        ))}
      </ul>
      <button className='save-btn'>Save to Spotify</button>
    </div>
  )
}

export default PlayList
