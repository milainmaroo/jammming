import React from 'react'
import TrackList from './TrackList'

function PlayList({ playlistTracks, removeTrack, updatePlaylistName }) {
  // Pass down Playlist name and tracks from App component
  return (
    <div className='playlist box'>
      <input
        type='text'
        placeholder='Add your playlist...'
        onChange={(e) => updatePlaylistName(e.target.value)}
      />
      <hr />
      {/* Add TrackList Component */}
      <TrackList
        tracks={playlistTracks}
        isPlaylist={true}
        removeTrack={removeTrack}
      />

      <button className='save-btn'>Save to Spotify</button>
    </div>
  )
}

export default PlayList
