import React from 'react'
import { useNavigate } from 'react-router-dom';

function ArtistAlbums(props) {
  let navigate = useNavigate();

  let flag = false;

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
    return <p key={artist.artist_name + "" + props.order} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-spotify-400 hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
  }) 

  return (
    <div className='artist-album mx-1 px-2 flex mb-5 font-light pt-5 hover:text-violet-500 hover:scale-[1.05] hover:cursor-pointer' onClick={() => toAlbum(props.albumId)}>
      <p className='pt-16 mr-4 text-gray-500 text-2xl'>{props.order}</p>

      <div className='w-40'>
        <img className='w-36 h-36 rounded-lg mr-2' src={props.image} />
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

export default ArtistAlbums