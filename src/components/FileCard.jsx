import React from 'react'
import { useSelector, useDispatch } from "react-redux";


export default function FileCard({fileName, index}) {
  const dispatch = useDispatch();
  const currentFileID = useSelector((state) => state.fileSelectorState.index)

  return (
    <button 
        onClick={()=> {
            dispatch({ type: "SET_CURRENT_FILE_ID", payload: index })
        }}
        className= {
            index === currentFileID ?
            'flex h-full justify-center items-center bg-[#dddddd] text-sm px-2 cursor-default font-bold'
            : 'flex h-full justify-center items-center text-gray-500 text-sm hover:bg-[#f0f0f0] px-2'
        }>
        <p className='select-none'>{fileName}</p>
    </button>
  )
}
