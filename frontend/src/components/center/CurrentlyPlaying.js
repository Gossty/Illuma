import React from 'react'
import { useNavigate } from 'react-router-dom';
import SpotifyIcon from "../../images/spotifyicon.png"


function CurrentlyPlaying(props) {

  let flag = false;
  let navigate = useNavigate();

  const toArtist = (artistId) => {
    if (!flag) {
      flag = true
      const link = `/artist/${artistId}`
      navigate(link, { state: { id: artistId } });
    }
  }

  const toAlbum = (albumId) => {
    if (!flag) {
      flag = true
      const link = `/album/${albumId}`
      navigate(link, { state: { id: albumId } });
    }
  }

  const toTrack = (trackId) => {
    if (!flag) {
      flag = true;
      const link = `/track/${trackId}`
      navigate(link, { state: { id: trackId } });
    }
  }

  let artists = ""
  if (props.artists != undefined) {
    artists = props.artists.map((artist) => {
      return <p key={artist.artist_name + ""} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-white hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
    })
  }

  return (
    <div className='flex mx-2 px-3 py-2 rounded font-light hover:cursor-pointer currently-playing-song hover:text-violet-500' onClick={() => toTrack(props.id)}>
        <img className='w-28 h-28 rounded-md' src={props.image === undefined ? SpotifyIcon : props.image} />
        <div className='ml-3'>
        <p className='lg:text-[24px] md:text-[18px]  hover:underline
                      w-[160px] flex text-clip whitespace-nowrap overflow-x-auto scrollbar-hide'
          
          onClick={() => toAlbum(props.album.id)}>{props.title}</p>
        {props.artists ?
          <div className=' w-[160px] text-[14px] flex text-clip overflow-x-auto scrollbar-hide'>
            {artists}
          </div>
        :""}
        
        </div>
    </div>
  )
}

export default CurrentlyPlaying