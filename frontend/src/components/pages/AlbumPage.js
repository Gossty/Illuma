import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import SpotifyIcon from "../../images/spotifyicon.png"
import analyze from 'rgbaster'
import RoundProgress2 from '../RoundProgress2'
import Track from './SearchPage/Track'

function AlbumPage(props) {
  const { state } = useLocation();
  const [background, setBackground] = useState("rgb(21, 20, 25)")
  const [album, setAlbum] = useState({
    title: "",
    image: SpotifyIcon,
    label: "",
    artists: [],
    date: "0-0-0",
    popularity: 0,
    songs: [],
    total_tracks: ""
  })
  const albumId = state.id;

  let parts  = album.date.split('-');
  let date = new Date(parts[0], parts[1] - 1, parts[2]); 
  let order = 1;
  date = date.toDateString().substring(4);
  


  if (album.date.length < 10){
    date = album.date;
  }

  function _splitRGB(rgb) {
    var c = (rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')'))).split(',');
    c = c.map(function (n, i) {
      return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n);
    });
    if (c[0] + c[1] + c[2] < 100) {
      c[0] += 80
      c[1] += 75
      c[2] += 110
    }
    var rgb = `rgb(${c[0]},${c[1]},${c[2]})`
    return rgb;
  }

  function getAlbum() {
    fetch(`/spotify/get-album/${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data)
        getBackground(data.image)
    })
  }


  let flag = false;
  let navigate = useNavigate();

  function getBackground(image) {
    analyze(image)
      .then((data) => {
        let color = _splitRGB(data[55].color)
        setBackground(color)
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAlbum()
  }, [])



  const toArtist = (artistId) => {
    if (!flag) {
      flag = true
      const link = `/artist/${artistId}`
      navigate(link, { state: { id: artistId } });
    }
  }


  const artists = album.artists.map((artist) => {
    return <p key={artist.artist_name + "" + props.order} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-white hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
  }) 

  return (
    <div className='h-screen bg-blakish-500 overflow-y-scroll scrollbar-hide'>
      <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
        lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>

        <div className='m-5 bg-blakish-400 rounded-2xl'>

            <div className='h-3'></div>
          {/* Album General Information */}
          
              <div style={{ backgroundImage: `linear-gradient(to right, ${background}, rgb(21, 20, 25) 60%)` }}
                    className='flex font-light bg-blakish-600 rounded-2xl mx-4'>
                  <img src={album.image} className='rounded-3xl border-blakish-600 shadow-2xl lg:w-96 lg:h-96 md:w-72 md:h-72 sm:h-40 sm:w-40 h-32 w-32 m-5'></img>
                  
                <div className='pt-5 ml-2 w-[70%]'>
                    
                    <p className='w-[70%] overflow-x-auto text-violet-500 scrollbar-hide
                                  lg:text-[30px] md:text-[24px] sm:text-[18px] text-[12px] mr-5
                    '  style={{}}>{album.title}</p>
                    
                    <div className='w-[70%] mr-2 flex text-clip overflow-x-auto scrollbar-hide
                                    lg:text-[22px] md:text-[18px] sm:text-[14px] text-[10px] '>
                            {artists}
                    </div>


                    <hr className="w-[70%] border-t-[1px] border-gray-500 mt-2 mb-5 self-center" />
                    
                    <div className='mt-5 lg:text-[22px] md:[text-14px] text-[10px] text-white '>
                      <div className='flex'>
                        <p className=''>Release Date: </p>
                        <p className='ml-1 text-spotify-400'>{date}</p>
                      </div>  
                    
                      <div className='flex'>
                        <p className=''>Label: </p>
                        <p className='ml-1 text-spotify-400'>{album.label}</p>
                      </div>  
                      
                      <div className='flex'>
                        <p className=''>Popularity: </p>
                        <p className='ml-1 text-spotify-400'>{album.popularity}</p>
                      </div>
                      
                      <div className='flex'>
                        <p className=''>Total Tracks: </p>
                        <p className='ml-1 text-spotify-400'>{album.total_tracks}</p>
                      </div>  
                    </div>
                  </div>
              </div>
          </div>
        

        <div className='bg-blakish-600 mx-5 rounded-2xl px-5'>
          <div className='flex overflow-x-auto mx-2 overflow-y-hidden'>
            {
            album.songs.map((song) => (
                <Track key={song.id}
                  artists={song.artists}
                  image={album.image}
                  title={song.title}
                  album={song.album}
                  id={song.id}
                  order={order++}
                  albumId={albumId}
                />
              ))
            }
          </div>
            
            </div>
        {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}
        


        </div>
          
    <Sidebar />
    </div>
  )
}

export default AlbumPage
