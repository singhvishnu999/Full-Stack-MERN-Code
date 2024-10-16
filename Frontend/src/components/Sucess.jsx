import React, { useState } from 'react'

const Success = ({data}) => {
    
  return (
    <>
    <div className={`flex justify-center items-center w-screen h-[10vh] text-white
    ${data.success ? 'bg-green-500' : 'bg-red-600'} text-xl font-bold`}>
       {data.message} 
    </div>
    </>
  )
}

export default Success