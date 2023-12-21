import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import PlayList from './components/PlayList'

function App() {
  const trackList = [
    {
      id: 1,
      name: 'Gorgeous',
      artist: 'Taylor Swift',
      album: 'reputation',
    },
    {
      id: 2,
      name: 'Euphoria',
      artist: 'BTS',
      album: 'Love Yourself',
    },
    {
      id: 3,
      name: 'Galway Girl',
      artist: 'Ed Sheeran',
      album: 'Divide',
    },
  ]

  const [searchResults, setSearchResults] = useState([])
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [playlistName, setPlaylistName] = useState('')

  // Search Tracklist function
  // name, artist, album from objects contain search 'keyword'
  const searchTracklist = (keyword) => {
    keyword = keyword.toUpperCase()
    const results = trackList.filter((track) => {
      return (
        track.name.toUpperCase().includes(keyword) ||
        track.artist.toUpperCase().includes(keyword) ||
        track.album.toUpperCase().includes(keyword)
      )
    })
    setSearchResults(results)
  }

  // Add Track function / Save to Tracklist
  const addTrack = (track) => {
    if (
      !playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)
    ) {
      setPlaylistTracks([...playlistTracks, track])
    }
  }

  // Remove Track function
  const removeTrack = (track) => {
    const updatedTracks = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    )
    setPlaylistTracks(updatedTracks)
  }

  // Update PlaylistName function
  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  // Save Playlist

  return (
    <div className='App'>
      <h1 className='title'>
        Ja<span>mmm</span>ing
      </h1>
      <SearchBar searchTracklist={searchTracklist} />

      <div className='container'>
        <SearchResults tracks={searchResults} addTrack={addTrack} />
        <PlayList
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          updatePlaylistName={updatePlaylistName}
        />
      </div>
    </div>
  )
}

export default App
