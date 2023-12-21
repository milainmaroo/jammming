import React from 'react'

function Track({ track, isPlaylist, addTrack, removeTrack }) {
  return (
    <div className='track'>
      <li>
        <h3>{track.name}</h3>
        {isPlaylist ? (
          <button className='btn' onClick={() => removeTrack(track)}>
            -
          </button>
        ) : (
          <button className='btn' onClick={() => addTrack(track)}>
            +
          </button>
        )}
        <span>
          {track.artist} | {track.album}
        </span>
        <hr />
      </li>
    </div>
  )
}

export default Track
