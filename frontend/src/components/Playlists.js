import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Playlists() {

  const [playlists, setPlaylists] = useState([]);
  let navigate = useNavigate();


  function getPlaylists() {
    fetch('/spotify/get-playlists')
      .then((response) => response.json())
      .then((data) => setPlaylists(data.items)) 
  }

  const toPlaylist = (playlistId) => {
    const link = `/playlist/${playlistId}`
    navigate(link, { state: { id: playlistId } });
  }

  useEffect(() => {
    getPlaylists();
  }, [])

  return (
    <div className='h-screen bg-blakish-500 overflow-y-auto'>
      <div className='h-5'></div>
        <div className='bg-blakish-400 mx-5'>
            <div className='bg-blakish-600 min-h-screen rounded-2xl'>
              <p className='text-3xl text-violet-500 px-5 pt-5 pb-2 font-bold'>Your Playlists</p>
              <div className='pl-5 font-light text-gray-500 mb-6'>
                {playlists.map((playlist) => (
                      <p key={playlist.id}
                      className="cursor-pointer hover:text-white my-6" onClick={() => toPlaylist(playlist.id)}>
                      {playlist.name}
                  </p>
                ))}
              <div className='h-3'></div>
              </div>
        </div>
        </div>
        <div className='p-8'></div>

    </div>
  )
}

export default Playlists