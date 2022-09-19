import React, { useEffect, useState } from 'react'
import Center from './Center';
import Sidebar from './Sidebar';
import SpotifyIcon from "../images/spotifyicon.png"


export default function Dashboard(props) {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topTracks, setTopTracks] = useState([])
  const [TopArtists, setTopArtists] = useState([]);
  const [CurrentlyPlaying, setCurrentlyPlaying] = useState({
      image: SpotifyIcon,
      title: "Play Song in Spotify",
  });

  function getRecentlyPlayed() {
    fetch('spotify/recently-played')
    .then((response) => response.json())
      .then((data) => setRecentlyPlayed(data))
  }

  function getTopTracks(term = "short_term") {
    fetch(`spotify/top-tracks/${term}`)
      .then((response) => response.json())
    .then((data) => setTopTracks(data))
  }

  function getTopArtists(term = "short_term") {
    fetch(`spotify/top-artists/${term}`)
    .then((response) => response.json())
      .then((data) => setTopArtists(data))
  }

  function getCurrentlyPlaying() {
    let isSong = true;
    fetch('spotify/current-song').then((response) => {
      if (response.status === 204) {
        isSong = false;
        return "no song playing"
      }
      return response.json();
    }).then((data) => {
      if (isSong) {
        setCurrentlyPlaying(data);
      }
      else {
        setCurrentlyPlaying({
            image: SpotifyIcon,
            title: "Play Song in Spotify",
        })
      }
    });
  }


  useEffect(() => {
    getRecentlyPlayed();
    getTopTracks();
    getTopArtists();
    getCurrentlyPlaying();
  }, [])



  return (
    <div className='h-screen bg-blakish-500 overflow-y-hiddem'>
      <Center recentlyPlayed={recentlyPlayed}
        topTracks={topTracks}
        topArtists={TopArtists}
        CurrentlyPlaying={CurrentlyPlaying}
        windowDimensions={props.windowDimensions}
      />
      <Sidebar />
      
    </div>
  )
}

