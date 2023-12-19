import React from 'react'
import TrackList from './TrackList'

function PlayList({
  playlistName,
  playlistTracks,
  onPlaylistNameChange,
  onPlaylistTracksChange,
}) {
  const handleNameChange = (event) => {
    onPlaylistNameChange(event.target.value)
  }

  // Pass down Playlist name and tracks from App component
  return (
    <div className='playlist box'>
      <input
        type='text'
        value={playlistName}
        onChange={handleNameChange}
        defaultValue={'New Playlist'}
      />
      {/* Add TrackList Component */}
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className='save-btn'>Save to Spotify</button>
    </div>
  )
}

export default PlayList
