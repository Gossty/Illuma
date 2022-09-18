import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ArtistPage from './components/pages/ArtistPage';
import Dashboard from './components/Dashboard';
import HomePage from './HomePage'
import ProtectRout from './ProtectRout';
import AlbumPage from './components/pages/AlbumPage';
import TrackPage from './components/pages/TrackPage';
import Charts from './components/pages/Charts';
import Search from './components/pages/Search';
import Statistics from './components/pages/Statistics';
import Navbar from './components/Navbar';
import PlaylistPage from './components/pages/PlaylistPage';
import Playlists from './components/Playlists';
export default function App() {
    const [state, setState] = useState(false);
    function authenticate(a) {
      setState(x => x = a)
    }
  
    function authenticateSpotify() {
      fetch("/spotify/is-authenticated")
        .then((response) =>
          response.json())
        .then((data) => {
          authenticate(data.status);
        });
    }
  
    useEffect(() => {
      authenticateSpotify();
    }, [])
    
  
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
        <div className='text-white overflow-hidden h-screen'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage authenticate={authenticate} logged={state} />}/>
                    <Route element={<ProtectRout spotifyAuthenticated={state} />}>
                        <Route path="/dashboard" element={<Dashboard windowDimensions={windowDimensions} />} /> 
                        <Route path="/artist/:artistId" element={<ArtistPage windowDimensions={windowDimensions} />} />
                        <Route path="/album/:albumtId" element={<AlbumPage windowDimensions={windowDimensions} />} />
                        <Route path="/track/:trackId" element={<TrackPage windowDimensions={windowDimensions} />} />
                        <Route path="/playlist/:trackId" element={<PlaylistPage windowDimensions={windowDimensions} />} />
                        <Route path="/charts" element={<Charts windowDimensions={windowDimensions} />} />
                        <Route path="/search" element={<Search windowDimensions={windowDimensions} />} />
                        <Route path="/statistics" element={<Statistics windowDimensions={windowDimensions} />} />
                        <Route path="/navigation" element={<Playlists windowDimensions={windowDimensions} />} />
                    </Route>
                    
                </Routes>
          {windowDimensions.width < 768 ? <Navbar logged={state} /> : ""}
        </Router>
        
        </div>
    )
}