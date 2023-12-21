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

  const playlistN = 'Default Playlist Name'
  const playlistT = [
    {
      id: 4,
      name: 'Example PlayList Name',
      artist: 'Example Artist',
      album: 'Example Album',
    },
    {
      id: 5,
      name: 'Example PlayList Name 2',
      artist: 'Example Artist 2',
      album: 'Example Album 2',
    },
  ]

  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlayListName] = useState(playlistN)
  const [playlistTracks, setPlayListTracks] = useState([])

  // // Function to update playlist name
  // const handlePlaylistNameChange = (newName) => {
  //   setPlayListName(newName)
  // }

  // // Function to update playlist tracks
  // const handlePlaylistTracksChange = (newTracks) => {
  //   setPlayListTracks(newTracks)
  // }

  // // Add Track to Playlist
  // const addTrack = (track) => {
  //   if (playlistTracks.find((playlistTrack) => playlistTrack.id === track.id))
  //     return
  //   setPlayListTracks((prevTracks) => [...prevTracks, track])
  // }

  // // Remove Track to Playlist
  // const removeTrack = (track) => {
  //   const isPresent = playlistTracks.filter(
  //     (playlistTrack) => playlistTrack.id !== track.id
  //   )
  //   setPlayListTracks(isPresent)
  // }

  // // Update Playlist Name
  // const updatePlaylistName = (name) => {
  //   setPlayListName(name)
  // }

  // // Save Playlist
  // const savePlaylist = () {
  //   const trackURIs = playListTracks.map(track => track.uri)
  // }

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

  // Save to Tracklist function
  const saveToTracklist = (track) => {
    setPlayListTracks([...playlistTracks, track])
  }

  return (
    <div className='App'>
      <h1 className='title'>
        Ja<span>mmm</span>ing
      </h1>
      <SearchBar searchTracklist={searchTracklist} />

      <div className='container'>
        <SearchResults
          tracks={searchResults}
          saveToTracklist={saveToTracklist}
        />
        <PlayList playlistName={playlistName} playlistTracks={playlistTracks} />
      </div>
    </div>
  )
}

export default App
