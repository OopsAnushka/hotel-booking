import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturesDestintion = () => {
  const {rooms, navigate} = useAppContext();


    return rooms.length > 0 && (
    <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-5 bg-slate-50 py-10'>
    
      <Title title='Featured Destination' subTitle='Discover our handpicked selection for exceptional properties around the world, offering unparalleled luxury and unforgettable experience.'/>

    <div className='flex flex-wrap items-center justify-evenly gap-6 mt-10'>
        {rooms.slice(0,4).map((room, index)=>(
            <HotelCard key={room._id} room={room} index={index}/>
        ))}
       </div>
       <button  onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-200 transition-all cursor-pointer '>
        View All Destinations
       </button>
    </div>
  )
}

export default FeaturesDestintion