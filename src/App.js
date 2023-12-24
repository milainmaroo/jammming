import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import PlayList from './components/PlayList'

const CLIENT_ID = 'd745391f1c7542ed9ec2825f027562de'
const CLIENT_SECRET = '79b6cad0660b4f7a9ab622aa2a14c9b3'
// const REDIRECT_URI = 'http://localhost:3000'

const generateRandomString = (length) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

const codeVerifier = generateRandomString(64)

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed)
console.log(codeChallenge)

const redirectUri = 'http://localhost:3000'

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
    // let options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body:
    //     'grant_type=client_credentials&client_id=' +
    //     CLIENT_ID +
    //     '&client_secret=' +
    //     CLIENT_SECRET,
    // }
    // fetch('https://accounts.spotify.com/api/token', options)
    //   .then((result) => result.json())
    //   .then((data) => setToken(data.access_token))
    //   .catch((error) => console.log(error))
    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    getToken(code)
  }, [])

  const authenticate = () => {
    const scope = 'user-read-private user-read-email playlist-modify-private'
    const authUrl = new URL('https://accounts.spotify.com/authorize')

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier)

    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString()
    window.location.href = authUrl.toString()
  }

  const getToken = async (code) => {
    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier')

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }

    const body = await fetch('https://accounts.spotify.com/api/token', payload)
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
        if (data?.access_token) {
          setToken(data.access_token)
          localStorage.setItem('access_token', data.access_token)
        }
      })
      .catch((error) => console.log(error))
  }

  // useEffect(() => {
  //   savePlaylist()
  // }, [accessToken])

  // Save Playlist
  const savePlaylist = async () => {
    const accessToken = localStorage.getItem('access_token')
    let userId = ''
    await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((result) => result.json())
      .then((userData) => {
        console.log('userData', userData)
        userId = userData.id
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: JSON.stringify({ name: playlistName }),
        })
          .then((result) => result.json())
          .then((playlistData) => {
            console.log('playlistData', playlistData)
            const trackUris = playlistTracks.map((track) => track.uri).join(',')
            console.log(trackUris)
            const playlistId = playlistData.id
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              method: 'POST',
              body: JSON.stringify({ uris: trackUris }),
            })
              .then((result) => result.json())
              .then((data) => {
                console.log(data)
              })
          })

        // setPlaylistTracks(trackUris)
      })
      .catch((error) => console.log(error))
  }

  const getTracks = (keyword) => {
    const accessToken = localStorage.getItem('access_token')
    let options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
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
      <button onClick={authenticate}>Log in</button>
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
