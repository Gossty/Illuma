import React from 'react'
import { MdOutlineReplay } from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import {
  ClockIcon
} from "@heroicons/react/outline";

function RecentlyPlayed(props) {
  let timePlayed = new Date(props.time);
  let minutes = Math.round((props.currentTime - timePlayed) / (1000 * 60));
    
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

  const artists = props.artists.map((artist) => {
    return <p key={artist.artist_name + "" + props.order} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-white hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
  }) 

  while (minutes.toString().length < 4) {
      minutes += " "
    }
    return (
      <div className='recently-played-song mt-5 mx-2 p-3 py-2 rounded grid grid-cols-2 font-light hover:scale-[1.01] hover:text-violet-500 hover:cursor-pointer' onClick={() => toTrack(props.id)}>
        <div className='flex'>
          <p className=' text-center w-16 text-xs text-gray-500'> <ClockIcon className='h-5 w-5'/> {minutes} min</p>
          <img className='w-16 h-16' src={props.image} />
        </div>
          <div>
            <p className='song--title pb-1 hover:underline w-[130px] flex text-clip whitespace-nowrap overflow-x-auto scrollbar-hide ' onClick={() => toAlbum(props.album.id)}>{props.title}</p>
            <div className=' w-[130px] text-[14px] flex text-clip overflow-x-auto scrollbar-hide'>
                  {artists}
            </div>
          </div>
        </div>
    )
}

export default RecentlyPlayed