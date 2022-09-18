import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar';
import analyze from 'rgbaster'
import SpotifyIcon from "../../images/spotifyicon.png"
import Tracks from './ChartsPage/Tracks';


function PlaylistPage(props) {
    const { state } = useLocation();
    const playlistId = state.id;

    const [playlist, setPlaylist] = useState({
        name: "",
        image: SpotifyIcon,
        songs: [],
        followers: 0
    });
    const [background, setBackground] = useState("rgb(21, 20, 25)");
    let songCount = 1;
    
    let followers = playlist.followers.toString()
    let counter = 0;
    for (let i = followers.length - 1; i >= 0; i--) {
      if (counter == 3) {
        followers = followers.substring(0, i + 1) + "," + followers.substring(i + 1)
        counter = counter % 3;
      }
      counter++;
    }


    var _splitRGB = function(rgb) {
        var c = (rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')'))).split(',');
        c = c.map(function(n,i) {
            return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n);
        });
        if (c[0] + c[1] + c[2] < 100) {
          c[0] += 80
          c[1] += 75
          c[2] += 110
        }
        var rgb = `rgb(${c[0]},${c[1]},${c[2]})`
        return rgb;
    };


    function getPlaylist(playlistId) {
        fetch(`/spotify/get-playlist/${playlistId}`)
        .then(response => response.json())
            .then(data => {
                if (data.image === "") {
                    data.image = SpotifyIcon;
                }
                setPlaylist(data)   
                getBackground(data.image);
        })
    }

    function getBackground(image) {
        analyze(image)
          .then((data) => {
            let color = _splitRGB(data[55].color)
            setBackground(color)
        })
        .catch((err) => console.log(err))
      }

    useEffect(() => {
        getPlaylist(playlistId);
    }, [playlistId])
  return (
      <div className='h-screen bg-blakish-600 overflow-y-scroll scrollbar-hide'>
          <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
                lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>
              
              <div className='m-5 bg-blakish-400 rounded-2xl'>
                  
                    <div className='h-3'></div>
                  
                  <div style={{ backgroundImage: `linear-gradient(to right, ${background}, rgb(21, 20, 25) 60%)` }}
                      className='flex font-light bg-blakish-600 rounded-3xl mx-4'>
                      <img src={playlist.image} className='rounded-xl shadow-2xl lg:w-96 lg:h-96 md:w-72 md:h-72 sm:h-40 sm:w-40 h-32 w-32 m-5' />
                      <div className='pt-5 ml-2 font-light'>
                        <p className='lg:text-[36px] md:text-[28px] text-[20px] text-violet-500'>{playlist.name}</p>
                        <p className='lg:text-[24px] md:text-[15px] text-[14px] text-gray-500'>{playlist.description} </p>
                        
                        <hr className="border-t-[1px] border-gray-500 mt-2 mb-5 self-center mr-4" />

                          <div className='my-5 lg:text-[22px] md:[text-15px] text-[12px] text-white'>
                              <div className='flex'> <p>Followers: </p> <p className='text-spotify-400 ml-1'>{followers}</p></div>
                              <div className='flex'> <p>By </p> <p className='text-spotify-400 ml-1'> {playlist.owner}</p></div>
                          </div>

                      </div>
                  </div>
                  <div className='h-3'></div>


                  
                <div className='h-3'></div>
                  <div className='overflow-auto bg-blakish-600 mx-4 rounded-3xl min-h-[200px]'>
                    <p className='text-3xl font-bold p-5'>Songs</p>
                    {playlist.songs.length === 0 ? <p className='text-gray-500 font-light px-5 text-xl'>Looks like there's no songs in this playlist</p> : ""}
                  {playlist.songs.map((track) => (
                        <Tracks key={track.id + "" + songCount}
                        song_name={track.title}
                        duration={track.duration}
                        trackId={track.id}
                        albumName={track.album.album_name}
                        releaseDate={track.album.release_date}
                        albumId={track.album.id}
                        image={track.image}
                        artists={track.artists}
                        order={songCount++}
                        windowDimensions={props.windowDimensions}/>
                  ))}
                  <div className='h-3'></div>
                  </div>
                  <div className='h-3'></div>

                  </div>
          
              <div className='h-3 p-3'></div>
        {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}
                  


          </div>

          
      <Sidebar />
      </div>
      
  )
}

export default PlaylistPage