import React, { useEffect, useId, useState } from 'react'
import Sidebar from '../Sidebar';
import Track from './SearchPage/Track'
import Artist from './SearchPage/Artist'
import Album from './SearchPage/Album'


import {
    SearchIcon,
} from "@heroicons/react/outline";

function Search(props) {
    const id = useId();
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState({
        albums: {
            singles: [],
            albums: []
        },
        artists: [],
        songs: []
    });

    function getSearchResult() {
        const theQuery = encodeURIComponent(query.trim()) === '' ? '∂∂∂∂' : encodeURIComponent(query.trim());
        fetch(`/spotify/search/${theQuery}`)
            .then((response) => response.json())
            .then((data) => setSearchResult(data));
     }

    useEffect(() => {
        getSearchResult();
    }, [query])
  return (
    <div className='bg-blakish-500 h-screen overflow-y-hidden scrollbar-hide font-light'>
        <div className=' absolute lg:w-[calc(100vw-15rem)] md:w-[calc(100vw-12rem)] w-[calc(100vw)]
      lg:left-[15rem] md:left-[12rem] h-screen overflow-y-scroll'>
        <div className='mt-5 flex bg-spotify-400 md:mx-10 mx-3 rounded-2xl '>
            <label htmlFor={id}><SearchIcon className='text-black ml-1 w-8 h-8'/></label>
            <input className='bg-inherit px-2 py-1 w-[100%] outline-none mr-4 placeholder-gray-900 text-black' id={id} value={query} placeholder="Artists, songs or albums" onInput={e => setQuery(e.target.value)}/>
        </div>
        
        <div className='bg-blakish-600 md:mx-10 mx-3 rounded-2xl mt-5 min-h-[175px]'>
            <div className='search-result min-h-[150px] rounded-2xl'>
                
            <h1 className='text-3xl p-5 text-white font-bold'>Results</h1>
            <hr className="border-t-[1px] border-gray-500 mb-2 self-center pb-5 mx-2" />
            </div>
            {/*tracks go here */}
            {searchResult.songs.length !== 0 ?
                <div className='pb-3'>
                    <p className='text-3xl p-5 font-bold'>Tracks</p>
                    <div className='flex overflow-x-auto mx-2 overflow-y-hidden'>
                        {searchResult.songs.map((song) => (
                            <Track key={song.id}
                                artists={song.artists}
                                image={song.image}
                                title={song.title}
                                album={song.album}
                                id={song.id}
                            />
                        ))}
                    </div>

                </div>
            : ""}
            {/* artists go here */}
            
            {searchResult.artists.length !== 0 ?
                <div className='pb-3'>
                    <p className='text-3xl p-5 font-bold'>Artists</p>
                    <div className='flex overflow-x-auto mx-2 overflow-y-hidden'>
                    {searchResult.artists.map((artist) => (
                        <Artist key={artist.id}
                            artistId={artist.id}
                            name={artist.name}
                            followers={artist.followers}
                            image={artist.image}
                        />
                    ))}
                    </div>
                </div>
            : ""}
            
            {/* albums go here */}
            
            {searchResult.albums.albums.length !== 0 ?
                <div className='pb-3'>
                    <p className='text-3xl p-5 font-bold'>Albums</p>
                    <div className='flex overflow-x-auto mx-2 overflow-y-hidden'>
                    {searchResult.albums.albums.map((album) => (
                        <Album key={album.id}
                        albumName={album.album_name}
                        albumId={album.id}
                        releaseDate={album.release_date}
                        image={album.image}
                        artists={album.artists}
                        type='single'
                        />
                    ))}
                    </div>
                </div>
            :""}    
            
            {/* singles go here */}
            
            {searchResult.albums.singles.length !== 0 ?
                <div className='pb-3'>
                    <p className='text-3xl p-5 font-bold'>Singles & EPs</p>
                    <div className='flex overflow-x-auto mx-2 overflow-y-hidden'>
                    {searchResult.albums.singles.map((album) => (
                        <Album key={album.id}
                        albumName={album.album_name}
                        albumId={album.id}
                        releaseDate={album.release_date}
                        image={album.image}
                        artists={album.artists}
                        type='single'
                        />
                    ))}
                    </div>
                </div>
            :""}    
        </div>
        <div className='h-3'></div>
        {props.windowDimensions.width < 768 ? <div className='h-16'></div> : <div className='h-14'></div>}
 
      </div>

        <Sidebar />
    </div>
  )
}

export default Search