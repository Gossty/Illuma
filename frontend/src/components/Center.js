import React from 'react'
import CurrentlyPlaying from './center/CurrentlyPlaying';
import RecentlyPlayed from './center/RecentlyPlayed'
import TopArtists from './center/TopArtists';
import TopTracks from './center/TopTracks';
export default function Center(props) {
    
    let currentTime = new Date();
    let greeting = ""
    if (currentTime.getHours() < 12 && currentTime.getHours() > 5)
        greeting = "Morning! 🌇"
    else if (currentTime.getHours() >= 12 && currentTime.getHours() < 18)
        greeting = "Afternoon! 🏙"
    else
        greeting = "Evening! 🌃"

    let index = 0;
    let countTopSong = 1;
    let countTopArtist = 1;
    
    if (props.length != 0 && props.topArtists != undefined && props.topTracks != undefined) {
        return (
            <div className='absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[100vw] h-[100vh] lg:left-[15rem] md:left-[12rem] overflow-auto'>
                <div className='parent pt-5 overflow-auto'>
                    <div className='lg:flex'>
                        <div className='lg:mr-0 sm:ml-12 mx-5'>
                            <h1 className=' w-[350px] lg:text-[40px] text-[30px]'>Good {greeting}</h1>
                            <div className='mb-5 recently-played scrollbar-hide overflow-auto max-h-[280px] lg:w-[350px]'>
                                <div className=''>
                                        <h1 className='text-3xl p-5 font-bold'> Recently Played</h1>
                                        <div className='ml-5 grid grid-cols-2 font-light text-gray-500'>
                                            <div className='ml-3 lg:w-40 md:w-30'>
                                            <p className='center--title font-light'>When Played</p>
                                            </div>
                                            <p className='center--album truncate'>Title</p>
                                        </div>
                                    <hr className="border-t-[1px] border-gray-500 m-[20px] mt-2 mb-5 self-center" />
                                </div>
                                    {props.recentlyPlayed.map((song) => (
                                        <RecentlyPlayed key={song.id + "" + index++}
                                            album={song.album}
                                            title={song.title}
                                            artists={song.artists}
                                            duration={song.duration}
                                            image={song.image}
                                            id={song.id}
                                            time={song.timePlayed}
                                            currentTime={currentTime}
                                        />
                                    ))}
                            </div>

                            <div className='currently-playing min-h-[240px] lg:w-[350px]'>
                                <h1 className='text-3xl p-5 font-bold'>Currently Playing</h1>
                                <CurrentlyPlaying
                                    title={props.CurrentlyPlaying.title}
                                    artists={props.CurrentlyPlaying.artists}
                                    image={props.CurrentlyPlaying.image}
                                    album={props.CurrentlyPlaying.album}
                                    id={props.CurrentlyPlaying.id}
                                />
                            </div>
                    </div>


                        <div className=' lg:ml-5 sm:ml-12 mx-5 top-tracks lg:mt-0 mt-5 max-h-[615px]'>
                            <div className=''>
                                <div className=''>
                                    <h1 className='text-3xl p-5 font-bold'> Top Tracks This Month</h1>
                                    {
                                        props.windowDimensions.width > 1024 ?
                                            <div className='flex ml-5 font-light text-gray-500'>
                                                <div className='flex'>
                                                    <p className='w-24 text-2xl'> #</p>
                                                </div>
                                                <div className='ml-1 w-64'>
                                                    <p className='font-light'>Title</p>
                                                </div>
                                                <p className='w-[135px] truncate'>Album</p>
                                                <p className='center--time ml-11'>Time</p>
                                            </div>
                                        :
                                         props.windowDimensions.width > 420 ?
                                        <div className='flex font-light text-gray-500 lg:text-xl md:text-lg text-base mt-5'>
                                            <div className='flex w-[320px]'>
                                            <p className='ml-8'> #</p>
                                            
                                            <p className='ml-[140px] font-light'>Title</p>
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


                                    

                                    <hr className="border-t-[1px] border-gray-500 m-[20px] mt-2 mb-5 self-center " />
                                </div>
                                <div className='overflow-auto h-[450px]'>
                                    {props.topTracks.map((song) => (
                                            <TopTracks key={song.id + "" + index++ + "" + index}
                                                album={song.album}
                                                albumName={song.album.album_name}
                                                title={song.title}
                                                artists={song.artists}
                                                duration={song.duration}
                                                image={song.image}
                                                order={countTopSong++}
                                                releaseDate={song.album.release_date}
                                                windowDimensions={props.windowDimensions}
                                                id={song.id}>
                                            </TopTracks>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <div className='mt-5 top-artists sm:ml-12 mx-5 mb-5 lg:w-[975px]'>
                        <h1 className='text-3xl p-5 font-bold'> Top Artists This Month</h1>
                        <div className='flex overflow-x-auto'>
                            {props.topArtists.map((artist) => (
                                <TopArtists
                                    key={artist.id + "" + index}
                                    order={countTopArtist++}
                                    name={artist.name}
                                    image={artist.image}
                                    followers={artist.followers}
                                    id={artist.id}
                                    />
                            ))}
                        </div>
                    </div>


                </div>
                {props.windowDimensions.width < 768 ? <div className='h-40'></div> : <div className='h-14'></div>}

            </div>

        )
    }
}
