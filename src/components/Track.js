import React from 'react'

function Track({ track, saveToTracklist, isPlaylist }) {
  return (
    <li>
      <h3>{track.name}</h3>
      <button className='add-btn' onClick={() => saveToTracklist(track)}>
        {isPlaylist ? '-' : '+'}
      </button>
      <span>
        {track.artist} | {track.album}
      </span>
      <hr />
    </li>
  )
}

export default Track
