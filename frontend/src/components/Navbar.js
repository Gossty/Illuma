import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  LogoutIcon,
  ChartSquareBarIcon,
} from "@heroicons/react/outline";


export default function Navbar(props) {
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
  
  const toPlaylists = () => {
    const link = '/navigation'
    navigate(link);
}
  



  if (props.logged) {
    return (
      <nav className='h-16 bg-black sticky bottom-0 border-t-[0.11px] border-gray-500'>
          <div className='grid grid-cols-5 justify-center items-center text-violet-500 py-[1rem] ml-3'>
            <HomeIcon className='w-5 h-5 ml-5' onClick={toDashboard} />
            <SearchIcon className='w-5 h-5 ml-5'onClick={toSearch}/>
            <LibraryIcon className='w-5 h-5 ml-5' onClick={toStatistics}/>
            <ChartSquareBarIcon className='w-5 h-5 ml-5' onClick={toCharts}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-5" onClick={toPlaylists}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
      </nav>
    )
  }
  return ""
}



