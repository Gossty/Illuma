import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import SpotifyIcon from "../../images/spotifyicon.png"
import analyze from 'rgbaster'
import TrackFeatures from './TrackPage/TrackFeatures'
import RoundProgress2 from '../RoundProgress2'

import { HeartIcon as HeartIconSolid} from '@heroicons/react/solid'
import {HeartIcon as HeartIconOutline} from '@heroicons/react/outline'


function TrackPage(props) {
  const { state } = useLocation();
  const [background, setBackground] = useState("rgb(21, 20, 25)")
  const trackId = state.id;
  const [track, setTrack] = useState({
    name: "",
    popularity: "",
    image: SpotifyIcon,
    artists: [],
    album: {
      album_name: "",
      album_id: "",
      release_date: "0-0-0"
    }
  });
  const [trackFeatures, setTrackFeatures] = useState({
    tempo: 0,
    key: ""
  });

  const [personalFeatures, setPersonalFeatures] = useState({
    liked: false,
    short: false,
    medium: false,
    long: false,
  })

  let parts  = track.album.release_date.split('-');
  let date = new Date(parts[0], parts[1] - 1, parts[2]); 
  date = date.toDateString().substring(4);
  
  let key = "";
  let duration = "0:00";

  if (trackFeatures != undefined) {
    const mode = trackFeatures.mode;
    duration = millisToMinutesAndSeconds(trackFeatures.duration_ms);
    key = trackFeatures.key;
    if (mode == 1) {
      switch (key) {
        case 0: key = "C Major"; break;
        case 1: key = "D♭"; break;
        case 2: key = "D Major"; break;
        case 3: key = "E♭"; break;
        case 4: key = "E Major"; break;
        case 5: key = "F Major"; break;
        case 6: key = "F#"; break;
        case 7: key = "G Major"; break;
        case 8: key = "A♭"; break;
        case 9: key = "A Major"; break;
        case 10: key = "B♭"; break;
        case 11: key = "B Major"; break;
      }
    }
    else {
      switch (key) {
        case 0: key = "C Minor"; break;
        case 1: key = "C#"; break;
        case 2: key = "D Minor"; break;
        case 3: key = "E♭"; break;
        case 4: key = "E Minor"; break;
        case 5: key = "F Minor"; break;
        case 6: key = "F# Minor"; break;
        case 7: key = "G Minor"; break;
        case 8: key = "G#"; break;
        case 9: key = "A Minor"; break;
        case 10: key = "B♭ Minor"; break;
        case 11: key = "B Minor"; break;
      }
    }
  }

  if (track.album.release_date.length < 10){
    date = track.album.release_date;
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

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
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

  function getTrack() {
    fetch(`/spotify/get-track/${trackId}`)
      .then((response) => response.json())
      .then((data) => {
        setTrack(data)
        getBackground(data.image)
    })
  }

  function getShortTopTracks(term = "short_term") {
    fetch(`/spotify/top-tracks/${term}`)
      .then((response) => response.json())
      .then((data) => {
        let counter = 1;
        for (let song of data) {
          if (trackId === song.id) {
            setPersonalFeatures((prevPersonalFeatures) => {
              return {
                ...prevPersonalFeatures,
                short: counter
              }
            })
            break;
          }
          counter++;
        }
      }
    )}
    
    function getMediumTopTracks(term = "medium_term") {
      fetch(`/spotify/top-tracks/${term}`)
        .then((response) => response.json())
        .then((data) => {
          let counter = 1;
          for (let song of data) {
            if (trackId === song.id) {
              setPersonalFeatures((prevPersonalFeatures) => {
                return {
                  ...prevPersonalFeatures,
                  medium: counter
                }
              })
              break;
            }
            counter++;
          }
        }
      )}

      function getLongTopTracks(term = "long_term") {
        fetch(`/spotify/top-tracks/${term}`)
          .then((response) => response.json())
          .then((data) => {
            let counter = 1;
            for (let song of data) {
              if (trackId === song.id) {
                setPersonalFeatures((prevPersonalFeatures) => {
                  return {
                    ...prevPersonalFeatures,
                    long: counter
                  }
                })
                break;
              }
              counter++;
            }
          }
        )}
      

  function getTrackFeatures() {
    fetch(`/spotify/get-track-features/${trackId}`)
      .then((response) => response.json())
      .then((data) => {
        setTrackFeatures(data);
    })
  }

  function isLiked() {
    fetch(`/spotify/check-liked/${trackId}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonalFeatures((prevPersonalFeatures) => {
        return {
          ...prevPersonalFeatures,
          liked: data[0]
        }
      })})}


  useEffect(() => {
    getTrack(),
    getTrackFeatures(),
    isLiked(),
    getShortTopTracks(),
    getMediumTopTracks(),
    getLongTopTracks()
  }, [])



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

  const artists = track.artists.map((artist) => {
    return <p key={artist.artist_name + "" + props.order} className='text-gray-500 flex whitespace-nowrap mr-1 hover:text-white hover:underline hover:cursor-pointer' onClick={() => toArtist(artist.artist_id)}>{artist.artist_name}</p>
  }) 

  return (
    <div className='h-screen bg-blakish-500 overflow-y-hidden scrollbar-hide'>
      <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
        lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>

        <div className='m-5 bg-blakish-400 rounded-2xl'>

            <div className='h-3'></div>
            {/* Track General Information */}
            <div style={{ backgroundImage: `linear-gradient(to right, ${background}, rgb(21, 20, 25) 60%)` }}
                  className='flex font-light bg-blakish-600 rounded-2xl mx-4'>
                <img src={track.image} className='rounded-3xl border-blakish-600 shadow-2xl lg:w-96 lg:h-96 md:w-72 md:h-72 sm:h-40 sm:w-40 h-32 w-32 m-5'></img>
                
            <div className='pt-5 ml-2 w-[70%]'
            >
                
                <p className='w-[70%] overflow-x-auto text-violet-500 scrollbar-hide
                              lg:text-[30px] md:text-[24px] sm:text-[18px] text-[12px] mr-5
                '  style={{}}>{track.song_name}</p>
                
                <div className='w-[70%] mr-2 flex text-clip overflow-x-auto scrollbar-hide
                                lg:text-[22px] md:text-[18px] sm:text-[14px] text-[10px] '>
                        {artists}
                </div>

                <p className='w-[70%] text-gray-500 overflow-x-auto whitespace-nowrap mr-1 hover:text-spotify-400 
                                hover:underline hover:cursor-pointer scrollbar-hide
                                lg:text-[22px] md:text-[18px] sm:text-[14px] text-[10px]
                                '
                  onClick={() => toAlbum(track.album.album_id)}
                >{track.album.album_name}</p>

                <hr className="w-[70%] border-t-[1px] border-gray-500 mt-2 mb-5 self-center" />
                
                <div className='mt-5 lg:text-[22px] md:[text-14px] text-[10px] text-white '>
                  <div className='flex'>
                    <p className=''>Release Date: </p>
                    <p className='ml-1 text-spotify-400'>{date}</p>
                  </div>  

                  <div className='flex pb-5'>
                    <p>Popularity:</p>
                    <p className='ml-1 text-spotify-400'>{track.popularity}</p>
                  </div>
                  
                <div className='flex'>
                  <p>Tempo:</p>
                  <p className='ml-1 text-spotify-400'>{parseInt(trackFeatures.tempo)} BPM</p>
                </div>

                <div className='flex'>
                  <p>Key:</p>
                  <p className='ml-1 text-spotify-400'>{key}</p>
                </div>

                <div className='flex pb-5'>
                  <p>Duration:</p>
                  <p className='ml-1 text-spotify-400'>{duration}</p>
                </div>

                </div>
                
              </div>
            </div>
            {/* Track Audio Features */}
            
            <div className=''>
              <TrackFeatures
                key={track.song_id}
                trackFeatures={trackFeatures}
                windowDimensions={props.windowDimensions}
              />
            </div>
            
            <div className='bg-blakish-600 mx-5 rounded-2xl px-5'>
            <p className='text-3xl font-bold py-5'>Personal Features</p>
            <div className='sm:ml-5 overflow-auto grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 min-w-[20rem] pb-5'>
              <div className='text-center text-violet-500 sm:ml-5 pb-5'>
                {personalFeatures.liked ?
                  <p className='p-0 lg:text-2xl text-lg font-bold w-[100px] 
                  whitespace-nowrap overflow-x-auto scrollbar-hide '>Added</p>
                  :
                  <p className='p-0 lg:text-2xl text-lg font-bold w-[100px] 
                  whitespace-nowrap overflow-x-auto scrollbar-hide '>Not Added</p>}
                
                  <div className='w-[100px] h-[100px] p-0'>
                  {personalFeatures.liked ?
                      <RoundProgress2 offset={300}
                      size={100}
                      liked={true}
                      text={<HeartIconSolid />}
                    />
                :
                      <RoundProgress2 offset={300}
                      size={100}
                      liked={true}
                      text={<HeartIconOutline />}
                    />
                  }
                </div>
              </div>
              
                  {personalFeatures.short ?
                <div className='text-center text-violet-500 sm:ml-5 pb-5'>
                  <div className='w-[100px] h-[100px] p-0'>
                      <p className='p-0 lg:text-2xl text-lg font-bold w-[100px] 
                      whitespace-nowrap overflow-x-auto scrollbar-hide '>4 Weeks</p>
                      <RoundProgress2 offset={300}
                      size={100}
                      liked={false}
                      text={personalFeatures.short}
                    />
                  </div> 
                </div>
                : ""}
              
              {personalFeatures.medium ?
                <div className='text-center text-violet-500 sm:ml-5 pb-5'>
                  <div className='w-[100px] h-[100px] p-0'>
                      <p className='p-0 lg:text-2xl text-lg font-bold w-[100px] 
                      whitespace-nowrap overflow-x-auto scrollbar-hide '>6 Months</p>
                      <RoundProgress2 offset={300}
                      size={100}
                      liked={false}
                      text={personalFeatures.medium}
                    />
                  </div> 
                </div>
                : ""}
              
              {personalFeatures.long ?
                <div className='text-center text-violet-500 sm:ml-5 pb-5'>
                  <div className='w-[100px] h-[100px] p-0'>
                      <p className='p-0 lg:text-2xl text-lg font-bold w-[100px] 
                      whitespace-nowrap overflow-x-auto scrollbar-hide '>All Time</p>
                      <RoundProgress2 offset={300}
                      size={100}
                      liked={false}
                      text={personalFeatures.long}
                    />
                  </div> 
                </div>
                : ""}
            </div>

            
            </div>
            {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}
            
          </div>
        </div>
          
    <Sidebar />
    </div>
  )
}

export default TrackPage