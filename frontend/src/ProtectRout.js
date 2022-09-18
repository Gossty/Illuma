import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//TODO
export default function ProtectRout(props) {
  return props.spotifyAuthenticated ? <Outlet /> : ""
}
