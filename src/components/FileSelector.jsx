import React from 'react'
import { BiPlus } from 'react-icons/bi'
import FileCard from './FileCard'
import { useSelector } from 'react-redux'

export default function FileSelector() {
    const fileArray = useSelector((state) => state.fileSelectorState.fileInfoArrays)
  return (
    <div className=' z-[98] w-full flex gap-3 pl-3 shadow-sm shadow-[#979797]'>
        {
           fileArray.map((val, index)=> 
                <FileCard fileName={val.title} index={index} key={index}/>
           ) 
        }
        <button 
            className='
                flex justify-center items-center hover:bg-[#aaaaaa] 
                text-gray-500 hover:text-black aspect-square'

        > 
            <BiPlus/>
        </button>
    </div>
  )
}
