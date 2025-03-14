import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ConfirmRidePopup = (props) => {
    if(!props.newRideData){
        return <div>
            No ride
        </div>
    }

    const [otp, setOtp] = useState('')
    const navigate = useNavigate();

    const submitHandler=(e)=>{
        e.preventDefault()
        const verifyOtp = async()=>{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/verify-otp`,{
                otp : otp,
                rideId : props.newRideData._id
            },{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });

            const ride = response.data.ride;
            if(ride){
                navigate('/captain-riding',{ state :  {rideData : props.newRideData}})
            }else{
                console.log("Wrong Otp")
            }
        }
        verifyOtp();
    }

   
    
    return (
        <div>
            <h5 onClick={(e)=>{props.setRidePopupPanel(false)}}
            className='text-2xl text-center' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
            <h3 className='text-2xl font-semibold m-auto'>Enter OTP to confirm the Ride</h3>
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

            <form onSubmit={submitHandler}>
                <input onChange={(e)=>{setOtp(e.target.value)}} type="number" maxLength={4} value={otp} placeholder='Enter OTP' className='w-full h-10 bg-[#E6E6E6] text-black text-lg font-medium px-5 py-6 rounded-lg mt-3' />
            < div className='flex flex-col gap-3 py-3'>
                <button onClick={()=>{
                    props.setRidePopupPanel(false)
                    props.setConfirmRidePopupPanel(false)
                }} className=' py-2 px-4 text-lg rounded-lg font-semibold bg-red-500 '>Ignore</button>
                <Link  onClick={submitHandler} className='bg-green-500  text-center py-2 px-4 rounded-lg text-lg font-semibold'>Confirm</Link>
            </div>
            </form>
        </div>
    )
}

export default ConfirmRidePopup