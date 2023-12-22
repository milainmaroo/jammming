import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import PlayList from './components/PlayList'

const CLIENT_ID = 'd745391f1c7542ed9ec2825f027562de'
const CLIENT_SECRET = '79b6cad0660b4f7a9ab622aa2a14c9b3'
const REDIRECT_URI = 'http://localhost:3000'

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

  const [token, setToken] = useState('')

  useEffect(() => {
    // API Access Token
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token))
      .catch((error) => console.log(error))
  }, [])

  // useEffect(() => {
  //   getTracks()
  // }, [token])

  const getTracks = (keyword) => {
    let options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=track`, options)
      .then((result) => result.json())
      .then((data) => {
        const items = data.tracks.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            album: item.album.name,
            artist: item.artists[0].name,
          }
        })
        setSearchResults(items)
      })
      .catch((error) => console.log(error))
  }

  // Search Tracklist function
  // name, artist, album from objects contain search 'keyword'
  // const searchTracklist = (keyword) => {
  //   keyword = keyword.toUpperCase()
  //   const results = trackList.filter((track) => {
  //     return (
  //       track.name.toUpperCase().includes(keyword) ||
  //       track.artist.toUpperCase().includes(keyword) ||
  //       track.album.toUpperCase().includes(keyword)
  //     )
  //   })
  //   setSearchResults(results)
  // }

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
  const savePlaylist = () => {
    console.log('Saving playlist:', playlistName, playlistTracks)
  }

  return (
    <div className='App'>
      <h1 className='title'>
        Ja<span>mmm</span>ing
      </h1>
      <SearchBar searchTracklist={getTracks} />

      <div className='container'>
        <SearchResults tracks={searchResults} addTrack={addTrack} />
        <PlayList
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          updatePlaylistName={updatePlaylistName}
          savePlaylist={savePlaylist}
        />
      </div>
    </div>
  )
}

export default App
