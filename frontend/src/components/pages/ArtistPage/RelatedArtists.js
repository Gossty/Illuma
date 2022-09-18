import React from 'react'
import { useNavigate } from 'react-router-dom';

function RelatedArtists(props) {

  let followers = props.followers.toString()
  let counter = 0;
  for (let i = followers.length - 1; i >= 0; i--) {
    if (counter == 3) {
      followers = followers.substring(0, i + 1) + "," + followers.substring(i + 1)
      counter = counter % 3;
    }
    counter++;
  }
  let navigate = useNavigate(); 


  const toArtist = () => {
    const link = `/artist/${props.artistId}`
    navigate(link, { state: { id: props.artistId } });
  }

  return (
    <div className='flex mb-5 font-light mx-1 px-2 hover:scale-[1.05] top-artists-artist pt-3 hover:cursor-pointer hover:text-violet-500'
         onClick={toArtist}
    >
      <p className='pt-16 mr-4 text-gray-500 text-2xl'>{props.order}</p>
      <div className='w-40'>
        <img className='border-4 border-blakish-600 shadow-lg rounded-lg w-36 h-36 mr-2' src={props.image} />
        <p className='whitespace-nowrap overflow-x-auto scrollbar-hide w-36 text-[20px]'>{props.name}</p>
        <p className='text-gray-500 text-[15px]'>Followers: {followers}</p>
      </div>
    </div>
  )
}

export default RelatedArtists