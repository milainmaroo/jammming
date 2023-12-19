import React from 'react'
import Track from './Track'

function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div>
      {/* Add Track Component */}
      {tracks.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        )
      })}
    </div>
  )
}

export default TrackList
