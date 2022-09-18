import React from 'react'
import { useNavigate } from 'react-router-dom';

function Track(props) {

  const style = {
    bgColor: '',
  }

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
      <div className='flex mx-1 px-2 py-3 rounded hover:cursor-pointer hover:scale-[1.05] hover:text-violet-500' onClick={() => toTrack(props.id)}>
        <div className='w-40'>
          <div className='relative'>

          {props.order ? <p className='track-order-album text-3xl rounded-md absolute m-2 font-bold text-white'>#{props.order}</p> : ""}
          <img className='border-4 border-blakish-600 shadow-lg w-36 h-36 rounded-lg' src={props.image === undefined ? SpotifyIcon : props.image} />
          </div>
          <div className=''>
          <p className='whitespace-nowrap overflow-x-auto scrollbar-hide w-36 text-[20px] hover:underline'
              onClick={() => {
                props.album === undefined ? "" : toAlbum(props.album.id)
              }
              }>{props.title}</p>
          {props.artists ?
            <div className='whitespace-nowrap overflow-x-auto scrollbar-hide w-36 text-[14px]'>
              {artists}
            </div>
          :""}
          </div>
        </div>
      </div>
    )
}

export default Track