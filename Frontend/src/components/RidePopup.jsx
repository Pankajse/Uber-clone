import axios from 'axios'
import React from 'react'

const RidePopup = (props) => {
    if(!props.newRideData){
        return <div>
            No ride
        </div>
    }
    return (
        <div>
            <h5 onClick={(e)=>{props.setRidePopupPanel(false)}}
            className='text-2xl text-center' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
            <h3 className='text-2xl font-semibold m-auto'>New Ride Available</h3>
            <hr />
            <div className='flex justify-between items-center py-2 my-3 bg-yellow-400 p-3 rounded-lg'>
                <div className='flex gap-2 items-center'>
                    <img className='w-16 h-16 object-cover rounded-full' src="https://1.bp.blogspot.com/--XUYNIK_S2E/Xya7g4FqHBI/AAAAAAAABgU/I5rKyBodTPsZqQ3IkdWU__Tkd6C5N-5EgCPcBGAsYHg/s1200/IMG-20200802-WA0017.jpg" alt="" />
                    <h3 className='text-xl font-medium '>{props.newRideData.user.fullname.firstname} {props.newRideData.user.fullname.lastname}</h3>
                </div>

                <div>
                    <h4 className='text-xl font-semibold'>₹{props.newRideData.fare}</h4>
                    <h5 className='text-base font-normal text-gray-600'>2.5km</h5>
                </div>
            </div>
            <div className='py-2'>
                <h5 className='text-base font-medium text-gray-500 py-1'>Pick UP</h5>
                <h3 className='text-xl font-medium py-1'>{props.newRideData.pickup}</h3>
            </div>
            <hr />

            <div className='py-2'>
                <h5 className='text-base font-medium text-gray-500 py-1'>Drop OFF</h5>
                <h3 className='text-xl font-medium py-1'>{props.newRideData.destination}</h3>
            </div>

            < div className='flex justify-end gap-4 py-3'>
                <button onClick={()=>{
                    props.setRidePopupPanel(false)
                }} className=' py-2 px-4 text-lg rounded-lg font-semibold'>Ignore</button>
                <button onClick={()=>{
                    async function rideAccepted(){
                        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/accepted`,{
                            rideId : props.newRideData._id
                        },{
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                              },
                        });
                        return response.data.ride;
                    }
                    const ride = rideAccepted();
                    if(ride){
                        props.setConfirmRidePopupPanel(true);
                    }
                }} className='bg-yellow-500 py-2 px-4 rounded-lg text-lg font-semibold'>Accept</button>
            </div>
        </div>
    )
}

export default RidePopup