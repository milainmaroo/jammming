import React from 'react'
import Track from './Track'

function TrackList({ tracks, isPlaylist, addTrack, removeTrack }) {
  return (
    <ul>
      {/* Add Track Component */}
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          isPlaylist={isPlaylist}
          addTrack={addTrack}
          removeTrack={removeTrack}
        />
      ))}
    </ul>
  )
}

export default TrackList
