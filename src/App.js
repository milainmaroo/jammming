import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import PlayList from './components/PlayList'

const CLIENT_ID = 'd745391f1c7542ed9ec2825f027562de'
const CLIENT_SECRET = '79b6cad0660b4f7a9ab622aa2a14c9b3'
// const REDIRECT_URI = 'http://localhost:3000'

function App() {
  // const trackList = [
  //   {
  //     id: 1,
  //     name: 'Gorgeous',
  //     artist: 'Taylor Swift',
  //     album: 'reputation',
  //   },
  //   {
  //     id: 2,
  //     name: 'Euphoria',
  //     artist: 'BTS',
  //     album: 'Love Yourself',
  //   },
  //   {
  //     id: 3,
  //     name: 'Galway Girl',
  //     artist: 'Ed Sheeran',
  //     album: 'Divide',
  //   },
  // ]
  const [searchResults, setSearchResults] = useState([])
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [playlistName, setPlaylistName] = useState('')

  const [token, setToken] = useState('')

  // Get API Access Token
  useEffect(() => {
    let options = {
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
    fetch('https://accounts.spotify.com/api/token', options)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token))
      .catch((error) => console.log(error))
  }, [])

  // Save Playlist
  const savePlaylist = async (name, trackUris) => {
    let userId = ''
    await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => result.json())
      .then((userData) => {
        console.log(`userData: ${userData}`)
        userId = userData.id
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: { Authorization: `Bearer ${token}` },
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
          .then((result) => result.json())
          .then((playlistData) => {
            console.log(`playlistData: ${playlistData}`)
            const playlistId = playlistData.id
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: { Authorization: `Bearer ${token}` },
              method: 'POST',
              body: JSON.stringify({ uris: trackUris }),
            })
          })
        setPlaylistName(name)
        setPlaylistTracks(trackUris)
      })
      .catch((error) => console.log(error))
  }

  const getTracks = (keyword) => {
    let options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
    // https://developer.spotify.com/documentation/web-api/reference/search
    fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=track`, options)
      .then((result) => result.json())
      .then((data) => {
        //console.log(data)
        const items = data.tracks.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            album: item.album.name,
            artist: item.artists[0].name,
            uri: item.uri,
          }
        })
        //console.log(items)
        setSearchResults(items)
      })
      .catch((error) => console.log(error))
  }

  // Search Tracklist function - to get hardcoded data - trackList
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

  // Search Results
  // const search = (keyword) => {
  //   Spotify.search(keyword).then((result) => {
  //     //setSearchResults(result)
  //     console.log(result)
  //   })
  // }

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
  // const savePlaylist = () => {
  //   console.log('Saving playlist:', playlistName, playlistTracks)
  // }

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
