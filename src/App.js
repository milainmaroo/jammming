import React, { useState } from 'react'
import SearchBar from './components/search/SearchBar'
import SearchResults from './components/search/SearchResults'
import PlayList from './components/PlayList'
import TrackList from './components/track/TrackList'
import Track from './components/track/Track'

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

  const [searchResults, setSearchResults] = useState(trackList)

  return (
    <div className='App'>
      <h1 className='title'>
        Ja<span>mmm</span>ing
      </h1>
      <SearchBar />

      <div className='container'>
        <SearchResults tracks={searchResults} />
        <PlayList />
      </div>
    </div>
  )
}

export default App
