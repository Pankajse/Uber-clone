import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()
    const finishRideHandler= async()=>{
        try {
             const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
                rideId : props.rideData?._id
            },{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.status == 200){
                navigate('/captain-home');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h5 onClick={(e)=>{props.setFinishRidePanel(false)}}
            className='text-2xl text-center' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
            <h3 className='text-2xl font-semibold m-auto'>Finish this Ride</h3>
            <hr />
            <div className='flex justify-between items-center py-2 my-3 bg-yellow-400 p-3 rounded-lg'>
                <div className='flex gap-2 items-center'>
                    <img className='w-16 h-16 object-cover rounded-full' src="https://1.bp.blogspot.com/--XUYNIK_S2E/Xya7g4FqHBI/AAAAAAAABgU/I5rKyBodTPsZqQ3IkdWU__Tkd6C5N-5EgCPcBGAsYHg/s1200/IMG-20200802-WA0017.jpg" alt="" />
                    <h3 className='text-xl font-medium '>{props.rideData?.user.fullname.firstname} {props.rideData?.user.fullname.lastname}</h3>
                </div>

                <div>
                    <h4 className='text-xl font-semibold'>2.5km</h4>
                </div>
            </div>
            <div className='py-2'>
                <h5 className='text-base font-medium text-gray-500 py-1'>Pick UP</h5>
                <h3 className='text-xl font-medium py-1'>{props.rideData?.pickup}</h3>
            </div>
            <hr />

            <div className='py-2'>
                <h5 className='text-base font-medium text-gray-500 py-1'>Drop OFF</h5>
                <h3 className='text-xl font-medium py-1'>{props.rideData?.destination}</h3>
            </div>
            <div className='py-3'>
                <h3 className='text-xl font-medium'>{props.rideData?.fare}</h3>
                <h5 className='text-base font-medium text-gray-500'>Cash</h5>
            </div>
            <Link onClick={finishRideHandler} className='bg-green-500 w-full block text-center py-2 px-4 rounded-lg text-lg font-semibold'>Finish Ride</Link>
        </div>
    )
}

export default FinishRide