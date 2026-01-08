import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'
import Title from './Title'

const ExclusiveOffers = () => {
  return (
    <div>
        <div className=' bg-gray-100 flex flex-col md:flex-row py-10 items-center justify-evenly w-full'>
            <Title align='left' title='Exclusive Offers' subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.'/>
                <button className=' group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
                        View All Offers
                       <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all' />
                </button>

            </div>
            <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 mx-20'>
                {exclusiveOffers.map((item)=>(
                  <div key={item._id} className='group relative flex flex-col item-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center' style={{backgroundImage: `url(${item.image})`}} >
                      <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'> {item.priceOff}% OFF</p>
                      <div>
                        <p className='text-2xl font-medium font-playfair'>{item.title}</p>
                        <p>{item.description}</p>
                        <p className='text-xs text-white/70 mt-3'>Expires {item.expireDate}</p>
                      </div>
                      <button className='flex item-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
                        View offers
                        <img className='invert group-hover:translate-x-1 transiton-all' src={assets.arrowIcon} alt="arrow-icon" />
                      </button>
                  </div>
                  
                ))}
            </div>
    </div>
  )
}

export default ExclusiveOffers