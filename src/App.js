import React from 'react'
import SearchBar from './components/search/SearchBar'
import SearchResults from './components/search/SearchResults'
import PlayList from './components/PlayList'
import TrackList from './components/track/TrackList'
import Track from './components/track/Track'

function App() {
  return (
    <div className='App'>
      <h1 className='title'>
        Ja<span>mmm</span>ing
      </h1>
      <SearchBar />
      <SearchResults />

      <PlayList />
      <TrackList />
      <Track />
    </div>
  )
}

export default App
