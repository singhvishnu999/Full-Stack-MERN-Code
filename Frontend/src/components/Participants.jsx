import React from 'react'
import { IoClose } from "react-icons/io5";

const Participants = ({data, setData}) => {
  return (
    <div className='bg-slate-200 h-[40vh] w-[40vw] p-5 text-black font-bold text-2xl'>
        <div className='flex justify-around'>Participants are : <IoClose className='cursor-pointer' onClick={()=>setData()}/> </div>
        {data && data.map((participants, idx)=> 
            <div key={idx} className='text-xl text-black font-semibold'>
                <span className='p-3'>{participants.name}</span>
                <span className='p-3'>{participants.email}</span>
                <span className='p-3'>{participants.contact}</span>
            </div>
        )}
    </div>
  )
}

export default Participants