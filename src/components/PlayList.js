import React from 'react'
import TrackList from './TrackList'

function PlayList({ playlistName, playlistTracks }) {
  // Pass down Playlist name and tracks from App component
  return (
    <div className='playlist box'>
      <h1>Playlists</h1>
      <input type='text' />
      {/* Add TrackList Component */}
      <TrackList tracks={playlistTracks} isPlaylist={true} />

      <button className='save-btn'>Save to Spotify</button>
    </div>
  )
}

export default PlayList
