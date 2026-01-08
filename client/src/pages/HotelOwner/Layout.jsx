import React from 'react'
import Navbar from '../../components/HotelOwner/Navbar'
import Sidebar from '../../components/HotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex flex-1 overflow-hidden'>
        <div className='hidden md:block'> 
      <Sidebar/>
        </div>
        <div className='flex-1 p-4 pt-10 md:px-10 overflow-y-scroll'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
