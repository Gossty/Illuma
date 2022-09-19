import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import SpotifyIcon from "../../images/spotifyicon.png"
import TopArtistSong from "./ArtistPage/TopArtistSong"
import analyze from 'rgbaster'
import ArtistAlbums from './ArtistPage/ArtistAlbums'
import RelatedArtists from "./ArtistPage/RelatedArtists"


function ArtistPage(props) {
  const { state } = useLocation();
  const [artist, setArtist] = useState({
    name: "",
    followers: 0,
    genres: [],
    image: SpotifyIcon,
    popularity: 0,
  });
  const [artistTopTracks, setArtistTopTracks] = useState([])
  const [albums, setAlbums] = useState({
    albums: [],
    singles: [],
    appears: []
  })
  const [relatedArtists, setRelatedArtists] = useState([])
  const [background, setBackground] = useState("rgb(21, 20, 25)")
  const artistId = state.id;


  
  let followers = artist.followers.toString()
  let counter = 0;
  for (let i = followers.length - 1; i >= 0; i--) {
    if (counter == 3) {
      followers = followers.substring(0, i + 1) + "," + followers.substring(i + 1)
      counter = counter % 3;
    }
    counter++;
  }

  const genres = artist.genres.map((genre) => {
    return <p key={genre} className='ml-3 text-spotify-400 lg:text-[18px] md:text-[14px] text-[12px] mr-2'> • {genre}</p>
  })

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
  let topSongCount = 1;
  let albumCount = 1;
  let singlesCount = 1;
  let appearsCount = 1;
  let relatedArtistsCount = 1;

  function getBackground(image) {
    analyze(image)
      .then((data) => {
        let color = _splitRGB(data[55].color)
        setBackground(color)
    })
    .catch((err) => console.log(err))
  }

  function getArtist() {
    fetch(`/spotify/get-artist/${artistId}`)
    .then((response) => response.json())
      .then((data) => {
        setArtist(data)
        getBackground(data.image)
      })
  }

  function getArtistTopTracks() {
    fetch(`/spotify/artist-top-tracks/${artistId}`)
      .then((response) => response.json())
      .then((data) => setArtistTopTracks(data))
  }

  function getAlbums() {
    fetch(`/spotify/artist-albums/${artistId}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data)
      })
  }

  function getRelatedArtists() {
    fetch(`/spotify/related-artists/${artistId}`)
      .then((response) => response.json())
    .then((data) => setRelatedArtists(data))
  }

  useEffect(() => {
    getArtist();
    getArtistTopTracks();
    getAlbums();
    getRelatedArtists();
  }, [artistId])

  return (
    <div className='h-screen bg-blakish-500 overflow-y-hidden scrollbar-hide '>
      <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
      lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>

        <div className='m-5 bg-blakish-400 rounded-2xl'>

          {/* dummy to make space */}
          <div className='h-3'></div>
          
          <div style={{ backgroundImage: `linear-gradient(to right, ${background}, rgb(21, 20, 25) 60%)` }}
               className='flex font-light bg-blakish-600 rounded-2xl mx-4'>
            <img src={artist.image} className='rounded-3xl shadow-2xl lg:w-96 lg:h-96 md:w-72 md:h-72 sm:h-40 sm:w-40 h-32 w-32 m-5'></img>
            
            <div className='pt-5 ml-2'>
              <p className='lg:text-[36px] md:text-[28px] text-[20px] text-violet-500'>{artist.name}</p>
                <p className='lg:text-[28px] md:text-[18px] text-[15px] text-gray-500'>Followers: {followers} </p>

              <hr className="border-t-[1px] border-gray-500 mt-2 mb-5 self-center" />
                      <div className='mt-5 lg:text-[22px] md:[text-15px] text-[12px] text-white '>
                        <p className=''>Genres: </p>
                        {genres}
                              <div className='flex pb-5'>
                                <p>Popularity:</p>
                                <p className='ml-1 text-spotify-400'> 
                                      {artist.popularity}
                                </p>
                              </div>
                      </div>
                  </div>
          </div>

          <div className='bg-blakish-600 mx-4 mt-4 rounded-2xl'>
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

            <div className='overflow-auto h-[300px]'>
            {artistTopTracks.map((track) => (
              <TopArtistSong key={track.song_id + "" + topSongCount}
                song_name={track.song_name}
                duration={track.duration}
                trackId={track.song_id}
                albumName={track.album.album_name}
                releaseDate={track.album.release_date}
                albumId={track.album.id}
                image={track.album.image}
                artists={track.artists}
                order={topSongCount++}
                windowDimensions={props.windowDimensions}
                />
              ))}
            </div>
            {albums.albums.length > 0 ?
            
              <div className='w-[100%] pt-8'
                style={{
                  backgroundImage: `linear-gradient(rgb(21, 20, 25), ${background} 525%)`
                }}>
                <h1 className='text-3xl p-5 font-bold'>{artist.name}   Albums</h1>
                <div className=' flex overflow-x-auto'>
                  {albums.albums.map((album) => (
                    <ArtistAlbums key={album.id + "" + albumCount}
                      albumName={album.album_name}
                      albumId={album.id}
                      releaseDate={album.release_date}
                      image={album.image}
                      artists={album.artists}
                      order={albumCount++}
                      type={'album'}
                    />
                  ))}
                </div>
              </div>
              : ""}
            {albums.singles.length > 0 ?

              <div className='w-[100%] pt-8'
                style={{
                  backgroundImage: `linear-gradient(to top, rgb(21, 20, 25), ${background} 525%)`
                }}>
                <h1 className='text-3xl px-5 pb-5 pt-3 font-bold'>{artist.name}   Singles {'&'} EPs</h1>
                <div className=' flex overflow-x-auto'>
                  {albums.singles.map((album) => (
                    <ArtistAlbums key={album.id + "" + singlesCount}
                      albumName={album.album_name}
                      albumId={album.id}
                      releaseDate={album.release_date}
                      image={album.image}
                      artists={album.artists}
                      order={singlesCount++}
                      type='single'
                    />
                  ))}
                </div>
              </div>
                : ""
              }
              
            {albums.appears.length > 0 ? 
              <div className='w-[100%] pt-3'>
                <h1 className='text-3xl p-5 pt-2 font-bold'>{artist.name}   Appears On</h1>
                <div className=' flex overflow-x-auto'>
                  {albums.appears.map((album) => (
                    <ArtistAlbums key={album.id + "" + appearsCount}
                      albumName={album.album_name}
                      albumId={album.id}
                      releaseDate={album.release_date}
                      image={album.image}
                      artists={album.artists}
                      order={appearsCount++}
                      type='appears'
                    />
                  ))}
                </div>
              </div>
              : ""
            }
            {/* dummy to make space */}
          <div className='h-3'></div>
          </div>
          <div className='mx-4 mt-4 rounded-2xl bg-blakish-600'>
                <h1 className='text-3xl p-5 font-bold'>{artist.name}   Related Artists</h1>
                <div className=' flex overflow-x-auto'>
                  {relatedArtists.map((artist) => (
                    <RelatedArtists key={artist.id + "" + relatedArtistsCount}
                      artistId={artist.id}
                      name={artist.name}
                      followers={artist.followers}
                      image={artist.image}
                      order={relatedArtistsCount++}
                    />
                  ))}
                </div>
              </div>
                      {/* dummy to make space */}
          <div className='h-3'></div>
          
        </div>
        {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}

      </div>
      <Sidebar /> 
    </div>
  )
}

export default ArtistPage