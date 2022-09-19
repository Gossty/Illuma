import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    ChartSquareBarIcon,
} from "@heroicons/react/outline";

function Sidebar(props) {
    const [playlists, setPlaylists] = useState([]);
    let navigate = useNavigate();

    const toDashboard = () => {
        const link = "/dashboard";
        navigate(link);
    }

    const toCharts = () => {
        const link = "/charts";
        navigate(link);
    }

    const toSearch = () => {
        const link = "/search";
        navigate(link);
    }

    const toStatistics = () => {
        const link = '/statistics'
        navigate(link);
    }
    
    const toPlaylist = (playlistId) => {
        const link = `/playlist/${playlistId}`
        navigate(link, { state: { id: playlistId } });
    }
    
    function getPlaylists() {
        fetch('/spotify/get-playlists')
          .then((response) => response.json())
          .then((data) => setPlaylists(data.items)) 
      }
    
      useEffect(() => {
        getPlaylists()
      }, [props])
    return (
        <div className="text-gray-500 p-5 text-sm border-r-[0.11px]
         border-r-gray-500 overflow-y-scroll scrollbar-hide h-screen
         sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex" >
            <div className="space-y-4">

                <button className="flex items-center space-x-2 
                hover:text-white" onClick={toDashboard}>
                    <HomeIcon className="h-5 w-5"  />
                    <p>Dashboard</p>
                </button>

                <button className="flex items-center space-x-2 
                hover:text-white" onClick={toSearch}>
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>

                <button className="flex items-center space-x-2 
                hover:text-white" onClick={toStatistics}>
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Statistics</p>
                </button>

                <button className="flex items-center space-x-2 
                hover:text-white" onClick={toCharts}>
                    <ChartSquareBarIcon className="h-5 w-5" />
                    <p>Your Charts</p>
                </button>


                <hr className="border-t-[0.1px] border-gray-500" />
                
                {playlists.map((playlist) => (
                    <p key={playlist.id}
                        className="cursor-pointer hover:text-white" onClick={() => toPlaylist(playlist.id)}>
                        {playlist.name}
                    </p>
                    
                ))}
            <div className='h-5'></div>

            </div>

        </div>
    )
}

export default Sidebar