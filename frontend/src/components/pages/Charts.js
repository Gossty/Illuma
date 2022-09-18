import React, { useEffect, useState } from 'react'
import TopArtists from './ChartsPage/TopArtists';
import Sidebar from '../Sidebar'
import Tracks from './ChartsPage/Tracks';

function Charts(props) {

  const terms = ['short_term', 'medium_term', 'long_term'];
  const types = ['tracks', 'artists'];
  const [termState, setTermState] = useState(0);
  const [typeState, setTypeState] = useState(0);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  let topSongCount = 1;
  let topArtistCount = 1;

  const styles = {
    backgroundColor: "rgb(76 29 149)"
  }

  function getTopTracks(term = terms[termState]) {
    fetch(`spotify/top-tracks/${term}`)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data)
      }
      )
  }

  function getTopArtists(term = terms[termState]) {
    fetch(`spotify/top-artists/${term}`)
      .then((response) => response.json())
    .then((data) => setTopArtists(data))
  }

  useEffect(() => {
    getTopTracks();
    getTopArtists();
  }, [termState, typeState]);
  return (
    <div className='h-screen bg-blakish-500 overflow-y-scroll scrollbar-hide'>
      <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
      lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>
          <div className=' pt-5 overflow-auto'>
            <p className='text-3xl p-5 font-bold'>Your Charts</p>
        </div>

        <div className='flex p-5 items-center justify-center text-2xl font-light border-1 border-black '>
          <p style={typeState === 0 ? styles : null } className='bg-violet-500 sm:text-xl p-3 text-base  rounded-l-2xl w-[200px] border-2 border-black hover:cursor-pointer'
            onClick={() => { setTypeState(0); }}>Tracks</p>
          <p style={typeState === 1 ? styles : null } className='bg-violet-500 sm:text-xl p-3 text-base rounded-r-2xl border-2 w-[200px] border-black hover:cursor-pointer'
          onClick={() => setTypeState(1)}>Artists</p>
        </div>

        <div className='flex p-2 items-center justify-center text-2xl font-light border-1 border-black '>
          <p style={termState === 0 ? styles : null } className='bg-violet-500 sm:text-xl p-3 text-base  rounded-l-2xl w-[200px] border-2 border-black hover:cursor-pointer'
          onClick={() => setTermState(0)}>4 Weeks</p>
          <p style={termState === 1 ? styles : null } className='bg-violet-500 sm:text-xl p-3 text-base border-1 w-[200px] border-black hover:cursor-pointer'
          onClick={() => setTermState(1)}>6 Months</p>
          <p style={termState === 2 ? styles : null } className='bg-violet-500 sm:text-xl p-3 text-base rounded-r-2xl border-2 w-[200px] border-black hover:cursor-pointer'
          onClick={() => setTermState(2)}>All Time</p>
        </div>

       { typeState === 0 ? <div className='bg-blakish-600 mx-4 mt-4 rounded-2xl'>
          <div className='text-3xl p-5 font-bold'>
              <h1>Top Tracks</h1>
              { props.windowDimensions.width > 420 ?
              <div className='flex font-light text-gray-500 lg:text-xl md:text-lg text-base mt-5'>
                <div className='flex w-[320px]'>
                  <p className=''> #</p>
                    <p className='ml-[120px] font-light'>Title</p>
                </div>

                {props.windowDimensions.width > 640 ? <p className='w-[200px] ml-7'>Album</p>
                  : <p className='w-[100px] ml-[30%]'>Time</p>}
                
                {props.windowDimensions.width > 850 ?
                <div className='whitespace-nowrap w-[300px]'>
                    <p className='ml-32'>Date</p>
                </div>
                  : ""}
                
                {props.windowDimensions.width > 1024 ?
                <div className='w-[300px]'>
                    <p className='ml-[80%]'>Time</p>
                </div>
                    : ""}
                </div>
                : ""
              }
              {props.windowDimensions.width > 420 ? <hr className="border-t-[1px] border-gray-500 mt-2 mb-5 self-center" /> : ""}
            </div>

            <div className='overflow-auto'>
            {topTracks.map((track) => (
                  <Tracks key={track.id + "" + topSongCount}
                  song_name={track.title}
                  duration={track.duration}
                  trackId={track.id}
                  albumName={track.album.album_name}
                  releaseDate={track.album.release_date}
                  albumId={track.album.id}
                  image={track.image}
                  artists={track.artists}
                  order={topSongCount++}
                  windowDimensions={props.windowDimensions}
                  />
            ))}
            <div className='h-3'></div>
          </div>
        </div> : ""}

        { typeState === 1 ? <div className='bg-blakish-600 mx-4 mt-4 rounded-2xl min-w-[18rem]'>
            <h1 className='text-3xl p-5 font-bold'>Top Artists</h1>
            <div className='overflow-auto grid md:grid-cols-3 grid-cols-2 min-w-[20rem]'>
            {topArtists.map((artist) => (
              <TopArtists key={artist.id + topArtistCount}
                name={artist.name}
                followers={artist.followers}
                image={artist.image}
                id={artist.id}
                order={topArtistCount++}
              />
              ))}
           
            <div className='h-3'></div>
          </div>
        </div> : ""}
        
        <div className='h-3 p-3'></div>
        {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}


      </div>


      <Sidebar />
    </div>
  )
}

export default Charts