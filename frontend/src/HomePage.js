import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'

export default function HomePage(props) {

  if (props.logged) {
    return (
      <div>
        <Navigate to="/dashboard"/>
      </div>
    )
  }

    const [authenticated, setAuthenticated] = useState({
      spotifyAuthenticated: false
    })
  
  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        props.authenticate(data.status);
        setAuthenticated({ spotifyAuthenticated: data.status })
        console.log("skdajnkajda")
        console.log(data.status)
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  if (authenticated.spotifyAuthenticated) {
    return ( 
        <div>
          <Navigate to="/dashboard" />
        </div>
      )
  }
  
  return (
    <div className='bg-blakish-500 h-screen font-light'>
        <nav className='h-14 bg-blakish-600 flex items-center '>
          <h1 className='ml-2'>
              Illuma
          </h1>
          <button className='text-center px-3 py-1 rounded-xl bg-violet-500  ml-auto mr-4' onClick={authenticateSpotify}>
              Log In To Spotify
          </button>
      </nav>
      <div className='mx-[25%] mt-[100px]'>
        <div className='p-3 text-[28px]'>
          
          <div className='flex'>
            <p className='text-violet-500 mr-1'> Illuma </p>
            <p className='m-0'>- Personalized Statistics for your </p>
            <p className='text-spotify-400 mx-1'> Spotify </p>
            <p className='m-0'>account</p> 
          </div>
        </div>
        <div className='text-center p-3 text-[20px]'>Log in to Spotify to view this project</div>
        <div className='text-center p-3 text-[20px] text-red-600'>To get access to the website, email here sgolzari@ucsd.edu</div>

      </div>
    </div>
  )
}

