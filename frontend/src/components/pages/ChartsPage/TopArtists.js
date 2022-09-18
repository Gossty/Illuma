import React from 'react'
import { useNavigate } from 'react-router-dom';

function TopArtists(props) {

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
    const link = `/artist/${props.id}`
    navigate(link, { state: { id: props.id } });
  }

  return (
    <div className='flex mb-5 font-light hover:scale-[1.05] top-artists-artist sm:mx-2 pt-5 sm:px-2 hover:cursor-pointer hover:text-violet-500 pr-5 min-w-[12rem]'
         onClick={toArtist}
    >
      <p className='pt-16 w-10 mr-1 text-gray-500 text-2xl'>{props.order}</p>
      <div className=''>
        <img className='border-4 border-blakish-600 shadow-lg rounded-lg min-w-[9rem] max-w-[9rem] min-h-[9rem] max-h-[9rem]' src={props.image} />
        <p className='whitespace-nowrap overflow-x-auto scrollbar-hide w-36 text-[20px]'>{props.name}</p>
        <p className='text-gray-500 text-[15px]'>Followers: {followers}</p>
      </div>
    </div>
  )
}

export default TopArtists