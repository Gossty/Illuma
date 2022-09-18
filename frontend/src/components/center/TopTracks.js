import React from 'react'
import { MdAlbum } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

function TopTracks(props) {

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  let flag = false;
  let navigate = useNavigate();

  let parts  = props.releaseDate.split('-');
  let date = new Date(parts[0], parts[1] - 1, parts[2]); 
  date = date.toDateString().substring(4)

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

  const duration = millisToMinutesAndSeconds(props.duration)
  const artists = props.artists.map((artist) => {
    return <p key={artist.artist_name + "" + props.order} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-white hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
  }) 
  if (props.windowDimensions.width > 1024)
  {
      return (
        <div className=' top-artist-song flex mx-3 px-1 font-light hover:cursor-pointer hover:text-violet-500 rounded-xl' onClick={() => toTrack(props.id)}>
          <div className='flex py-[0.375rem] lg:w-[360px] w-[230px]'>
            <div className='flex min-w-[100px] '>
              <p className='text-gray-500 text-[20px] w-[30px] mt-4'>{props.order}</p>
              <img src={props.image} className='w-16 h-16 mr-3'/>
            </div>
    
            <div className=''>
              <p className='whitespace-nowrap overflow-x-auto scrollbar-hide max-w-[130px]'>{props.title}</p>
                <div className='flex text-clip overflow-x-auto scrollbar-hide max-w-[130px]'>
                          {artists}
                </div>
            </div>
          </div>
    
          <div className='text-white whitespace-nowrap overflow-x-auto scrollbar-hide lg:w-[180px] hover:text-spotify-400 hover:underline' onClick={() => toAlbum(props.album.id)}>
              {props.albumName}
          </div>
    
          <div className='text-gray-500'>
            {duration}
          </div>
        </div>
      )
  }
  return (
    <div className='top-artist-song flex mx-3 font-light hover:cursor-pointer hover:text-violet-500 rounded-xl' onClick={() => toTrack(props.id)}>

    <div className='flex py-[0.375rem] w-[320px]'>
        <p className='text-gray-500 lg:text-2xl md:text-xl text-lg w-12 pt-5 ml-2 mr-2'> {props.order}</p>
        <img src={props.image} className='w-16 h-16 mr-3' />
      <div>
        <p className='whitespace-nowrap w-[130px] overflow-x-auto scrollbar-hide'  onClick={() => {
                props.windowDimensions.width <= 640 ? toAlbum(props.album.id)
                  : ""
                }} >{props.title}</p>
            <div className=' w-[130px] flex text-clip overflow-x-auto scrollbar-hide'>
                {artists}
            </div>
      </div>
    </div>

    {/* album */}
    {props.windowDimensions.width > 640 ?
      <div className='flex pb-3 w-[200px] py-[0.375rem] ml-10 text-white'>
        <p className='whitespace-nowrap w-[130px] overflow-x-auto scrollbar-hide hover:underline hover:cursor-pointer hover:text-spotify-400' onClick={() => toAlbum(props.album.id)}>{props.albumName}</p>
      </div>
      :
      <div className='w-[100px] text-gray-500'>
      <p className='ml-[65%]'>{duration}</p>
      </div>
    }

    {props.windowDimensions.width > 850 ?
      <div className='whitespace-nowrap w-[300px] py-[0.375rem] '>
          <p className='ml-24 mr-10 text-gray-500'>{date}</p>
      </div>
      : ""}
    
    {props.windowDimensions.width > 1024 ?
      <div className='w-[300px] text-gray-500 py-[0.375rem]'>
          <p className='ml-[80%]'>{duration}</p>
      </div>
      : ""}

  </div>
  )
}
export default TopTracks