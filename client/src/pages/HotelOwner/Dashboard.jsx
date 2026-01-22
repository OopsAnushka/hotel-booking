import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast' // Import toast directly

const Dashboard = () => {
  // Removed 'toast' from context destructuring to avoid conflict with import
  const { currency, user, getToken, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  })

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      
      // FIX 1: Changed method to GET
      // FIX 2: Changed URL to likely Dashboard/Hotel-Booking route (Verify this matches your backend route!)
      // FIX 3: Corrected 'headres' to 'headers'
      const { data } = await axios.get('/api/booking/hotel', { 
        headers: { Authorization: `Bearer ${token}` } 
      })

      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        // FIX 4: Use data.message, not error.message here
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user])

  return (
    // FIX 5: Fixed invalid class 'w-max-100+' to 'w-full'
    <div className='pb-28 w-full'> 
      
      <Title align='left' font='outfit' title='Dashboard' subTitle='Monitor your room listing, track bookings and analyse revenue-all in one place. Stay updated with real-time insights to ensure smooth operations.' />

      <div className='flex flex-wrap gap-4 my-8'>
        {/* Total Booking */}
        <div className='bg-primary/5 border border-primary/10 rounded flex p-4 pr-8 items-center shadow-sm'>
          <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10 w-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Bookings</p>
            <p className='text-neutral-600 text-xl font-bold'>{dashboardData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className='bg-green-50/50 border border-green-100 rounded flex p-4 pr-8 items-center shadow-sm'>
          <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10 w-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-green-600 text-lg'>Total Revenue</p>
            <p className='text-neutral-600 text-xl font-bold'> {currency} {dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
      <div className='w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-[400px] overflow-y-auto overflow-x-auto shadow'>
        <table className='w-full min-w-[600px]'>
          <thead className='bg-gray-100 sticky top-0'>
            <tr>
              <th className='px-4 py-3 text-gray-800 font-semibold text-left'>User Name</th>
              <th className='px-4 py-3 text-gray-800 font-semibold text-left max-sm:hidden'>Room Name</th>
              <th className='px-4 py-3 text-gray-800 font-semibold text-center'>Total Amount</th>
              <th className='px-4 py-3 text-gray-800 font-semibold text-center'>Payment Status</th>
            </tr>
          </thead>
          <tbody className='text-sm divide-y divide-gray-200 bg-white'>
            {dashboardData.bookings.length > 0 ? (
              dashboardData.bookings.map((item, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='py-3 px-4 text-gray-700'>
                    {/* Added optional chaining ?. just in case user/room is null */}
                    {item.user?.username || "Unknown User"}
                  </td>
                  <td className='py-3 px-4 text-gray-700 max-sm:hidden'>
                    {item.room?.roomType || "Unknown Room"}
                  </td>
                  <td className='py-3 px-4 text-gray-700 text-center font-medium'>
                    {currency} {item.totalPrice}
                  </td>
                  <td className='py-3 px-4 text-gray-700 text-center'>
                    <span className={`py-1 px-3 text-xs font-medium rounded-full ${item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {/* Assuming your DB field is 'paymentStatus' or checking 'isPaid' boolean */}
                      {item.payment ? 'Paid' : 'Pending'} 
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">No bookings found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
