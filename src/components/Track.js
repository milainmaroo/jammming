import React from 'react'

function Track({ track, isRemoval, onAdd, onRemove }) {
  const renderAction = () => {
    if (isRemoval) {
      return <button onClick={removeTrack}>-</button>
    } else {
      return <button>+</button>
    }
  }

  const addTrack = () => {
    onAdd(track)
  }

  const removeTrack = () => {
    onRemove(track)
  }

  return (
    <div>
      <h3>{track.name}</h3>
      <p>
        {track.artist} | {track.album}
      </p>
      {renderAction()}
    </div>
  )
}

export default Track
