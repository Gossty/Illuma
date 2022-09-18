import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Song from './Statistics/Song';
import {
    LibraryIcon,
} from "@heroicons/react/outline";
import RightBar from './Statistics/RightBar';
import Chart from "react-apexcharts";
import { Grid, CircularProgress } from '@mui/material';

function Statistics(props) {

    const [songs, setSongs] = useState([]);
    const [songDetails, setSongDetails] = useState(new Map());
    const [xAxis, setXAxis] = useState('energy');
    const [yAxis, setYAxis] = useState('tempo');
    const [clicked, setClicked] = useState(false);
    const [chart, setChart] = useState({
        series: [],
        options: {
          chart: {
              height: 1000,
              width: 1000,
              type: 'scatter',
            },
            
          legend: {
              show: false,
          },

          tooltip: {
              theme: true
          },

          markers: {
            colors: ['#1db954'],
            size: 1,
            radius: 1,
            strokeWidth: 0,
          },
            
            xaxis: {
              tickAmount: 10,
              labels: {
                formatter: function(val) {
                  return parseFloat(val).toFixed(1)
                },

              },
              title: {
                text: "Undefined",
                style: {
                    color: '#fff',
                }
              }
            },
            
            yaxis: {
              tickAmount: 10,
              title: {
                text: "Undefined",
                style: {
                    color: '#fff',
                }
              }
            },

          },
    })

    function getLikedSongs() {
      fetch('/spotify/get-liked-songs')
          .then((response) => response.json())
        .then((data) => {
          setSongs(data);
        })
    }

    function getSongsDetails() {
            const requestOptions = {
                method: 'POST',
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(songs)
            };
            fetch(`/spotify/get-details`, requestOptions)
            .then(response => response.json())
            .then(data => setSongDetails(new Map(Object.entries(data))))
    }
    
  function fillChart(x = 'energy', y = 'tempo') {
      chart.options.xaxis.title.text = x[0].toUpperCase() + x.slice(1)
      chart.options.yaxis.title.text = y[0].toUpperCase() + y.slice(1)
      let array = []
      for (let [key, value] of songDetails) {
        const series = {
          name: key,
          data: [[value[x], value[y]]]
        }
        array.push(series);
      }
    
      setChart(prevChart => {
        return {
          ...prevChart,
          series: array
          }
        })
  }
  
    
  function handleChangeX(event) {
    setXAxis(event.target.value);
  }

  function handleChangeY(event) {
    setYAxis(event.target.value);
  }

  function flipClick() {
    setClicked(!clicked);
  }
  

    let order = 1;
    useEffect(() => {
        getLikedSongs();
    }, [])
  
    useEffect(() => {
      getSongsDetails();
    }, [songs])
  
    useEffect(() => {
      fillChart(xAxis, yAxis);
    }, [songDetails, xAxis, yAxis])


  return (
      <div className='h-screen bg-blakish-500 overflow-y-scroll scrollbar-hide font-light'>
        <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
            lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>
              <div className='bg-blakish-600 mx-4 mt-4 rounded-2xl'>
                  <div style={{ backgroundImage: `linear-gradient(to right, rgb(139 92 246), rgb(21, 20, 25) 60%)` }}
                    className='p-5 rounded-2xl flex'
                  >
                      
                      <div style={{ background: `linear-gradient(142deg, rgb(139 92 246), rgb(21, 20, 25))` }}
                          className='border-blakish-600 border-4 rounded-xl shadow-2xl lg:w-96 lg:h-96 md:w-72 md:h-72 sm:h-40 sm:w-40 h-32 w-32'>
                                <LibraryIcon className='lg:w-48 lg:h-48 lg:m-[5.41rem] md:w-36 md:h-36 md:m-[4.0rem] sm:h-20 sm:w-20 sm:m-9 h-16 w-16 m-7' />
                      </div>
                      <div className=''>
                        <h1 className='text-3xl font-normal p-5'>Your Statistics</h1>
                      </div>
                  </div>
              </div>
              
        <div className='bg-blakish-600 mx-4 mt-4 rounded-2xl'>
          <div className='sm:grid sm:grid-cols-2 flex'>
            <div className='flex pb-3 pr-2'>
              <p className='m-2 sm:text-[20px] text-[12px]'> Y axis </p>
                  <select value={yAxis} onChange={handleChangeY} className='text-black rounded-md max-h-[20px] truncate max-w-[120px] mt-3'>
                    <option defaultValue="acousticness">Acousticness</option>
                    <option value="danceability">Danceability</option>
                    <option value="energy">Energy</option>
                    <option value="instrumentalness">Instrumentalness</option>
                    <option value="speechiness">Speechiness</option>
                    <option value="tempo">Tempo</option>
                    <option value="valence">Valence</option>
                    <option value="liveness">Liveness</option>
                    <option value="loudness">Loudness</option>
              </select>
            </div>

            <div className='flex'>
              <p className='m-2 sm:text-[20px] text-[12px]'> X axis</p>
                  <select value={xAxis} onChange={handleChangeX} className='text-black rounded-md max-h-[20px] truncate max-w-[120px] mt-3'>
                    <option defaultValue="acousticness">Acousticness</option>
                    <option value="danceability">Danceability</option>
                    <option value="energy">Energy</option>
                    <option value="instrumentalness">Instrumentalness</option>
                    <option value="speechiness">Speechiness</option>
                    <option value="tempo">Tempo</option>
                    <option value="valence">Valence</option>
                    <option value="liveness">Liveness</option>
                    <option value="loudness">Loudness</option>
                  </select>
            </div>
          </div>
          {props.windowDimensions.width < 640 ?
            <div>
              {chart.series.length > 0 ?
                <div> 
                  {clicked ?
                  <button onClick={flipClick} className='text-violet-500 ml-2 hover:underline'>
                    Close Chart
                  </button>
                    : 
                    <button onClick={flipClick} className='text-violet-500 ml-2 hover:underline'>
                    Show Chart
                  </button>
                  }
                  {clicked ? 
                    <div className='overflow-auto w-[800px] bg-slate-900'>
                              <Chart options={chart.options}
                                  series={chart.series}
                                  type={"scatter"}
                        />
                    </div>
                    : ""}
                </div>
                :
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: '100px' }}>
                    <Grid item xs={3}>
                      <CircularProgress color='inherit'/>
                    </Grid>   
                </Grid> 

            }
            </div>

            :
              chart.series.length > 0 ?
                      <Chart options={chart.options}
                          series={chart.series}
                          type={"scatter"}
                />
              : 
              <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '100px' }}>
                <Grid item xs={3}>
                  <CircularProgress color='inherit'/>
                </Grid>   
              </Grid> 
          }
                  <p className='text-3xl font-bold p-5 pb-0'>Liked Songs</p>
                    <div className='p-5'>
                        { props.windowDimensions.width > 420 ?
                        <div className='flex font-light text-gray-500 lg:text-xl md:text-lg text-base mt-5'>
                            <div className='flex w-[320px]'>
                            <p className=''> #</p>
                                <p className='ml-[140px] font-light'>Title</p>
                            </div>

                            {props.windowDimensions.width > 640 ? <p className='w-[200px] ml-7'>Album</p>
                            : <p className='w-[100px] ml-[30%]'>Time</p>}
                            
                            {props.windowDimensions.width > 850 ?
                            <div className='whitespace-nowrap w-[300px]'>
                                <p className='ml-24'>Date Added</p>
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
                        {songs.map((track) => (
                            <Song key={track.id + "" + order}
                            song_name={track.title}
                            duration={track.duration}
                            trackId={track.id}
                            albumName={track.album.album_name}
                            dateAdded={track.added_at}
                            albumId={track.album.id}
                            image={track.image}
                            artists={track.artists}
                            order={order++}
                            windowDimensions={props.windowDimensions}
                            />
                        ))}
            <div className='h-3'></div>
                    </div>
            {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}
                    
            </div>
            
        </div>
        {/* <RightBar /> */}
        <Sidebar />
    </div>
    
  )
}

export default Statistics