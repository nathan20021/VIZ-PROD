import { maxHeight } from "@mui/system"
import React, {useState} from "react"

const TestButton = (props) => {
    return(
        <div className="flex justify-center items-center gap-4">
            <button className="py-2 px-3 rounded-sm bg-[#333333] text-[#ffffff] hover:bg-[#555555]"
                onClick={()=>{props.decreaseCounter(props.index)}}
            >
                -
            </button>
            <h1>{props.counter}</h1>
            <button className="py-2 px-3 rounded-sm bg-[#333333] text-[#ffffff] hover:bg-[#555555]"
                onClick={()=>{props.increaseCounter(props.index)}}
            >
                +
            </button>
        </div>
    ) 
}

const Test = () => {
    const [buttonStates, setButtonStates] = useState(new Array(5).fill(0))
    const increaseCounter = (index) => {
        const nextCounters = buttonStates.map((c, i) => {
            if (i === index) {
              return c + 1;
            } else {
              return c;
            }
          });
          setButtonStates(nextCounters);
    }
    const decreaseCounter = (index) => {
        const nextCounters = buttonStates.map((c, i) => {
            if (i === index) {
              return c - 1;
            } else {
              return c;
            }
          });
          setButtonStates(nextCounters);
    }

    return(
    <div className="w-[100vw] h-[100vh] flex flex-col gap-3 justify-center items-center">
        <h1 className="text-3xl font-bold">Max of counters: {Math.max(...buttonStates)}</h1>
        {
            buttonStates.map((ele, i) => <TestButton key={i} index={i} counter={ele} increaseCounter={increaseCounter} decreaseCounter={decreaseCounter}/>)
        }
    </div>
    )
}

export default Test;