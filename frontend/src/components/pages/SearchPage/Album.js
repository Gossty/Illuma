import React from 'react'
import { useNavigate } from 'react-router-dom';

function Album(props) {
    let navigate = useNavigate();

    let flag = false;
    let order = 0;
  
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
  
    const artists = props.artists.map((artist) => {
      return <p key={artist.artist_name + "" + order++} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-spotify-400 hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
    }) 
  
    return (
      <div className=' mx-1 px-2 flex py-3 hover:text-violet-500 hover:scale-[1.05] hover:cursor-pointer' onClick={() => toAlbum(props.albumId)}>
        <div className='w-40'>
          <img className='border-4 border-blakish-600 shadow-lg w-36 h-36 rounded-lg' src={props.image} />
          <p className='whitespace-nowrap w-36 overflow-x-auto scrollbar-hide text-[20px] cursor-pointer'>{props.albumName}</p>
          {props.type === 'appears' ? "" :
            <div className=' w-36 flex text-clip overflow-x-auto scrollbar-hide '>
                        {artists}
            </div>  
          }
        </div>
  
      </div>
    )
}

export default Album