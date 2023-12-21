import React from 'react'
import Track from './Track'

function TrackList({ tracks, saveToTracklist, isPlaylist }) {
  return (
    <ul>
      {/* Add Track Component */}
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          saveToTracklist={saveToTracklist}
          isPlaylist={isPlaylist}
        />
      ))}
    </ul>
  )
}

export default TrackList
