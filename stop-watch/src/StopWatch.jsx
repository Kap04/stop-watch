
import React,{useState,useEffect, useRef} from "react"

function StopWatch(){

    const [isRunning,setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime]  = useState(0);
    const intervalRef = useRef(null)
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        return() => {
            clearInterval(intervalRef.current);
        }

    },[isRunning])

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function reset(){
        setIsRunning(false);
        setElapsedTime(0);
    }

    function stop(){
        setIsRunning(false);
    }

    function formatTime(){

        let hour = Math.floor(elapsedTime/(1000*60*60));
        let min = Math.floor(elapsedTime/(1000*60)%60);
        let sec = Math.floor(elapsedTime/(1000)%60);
        let mili = Math.floor(elapsedTime%1000/10);

        return `${addZero(hour)}:${addZero(min)}:${addZero(sec)}:${addZero(mili)}`   
    }

    function addZero(num){
        return ((num<10?'0':'')+num)
    }

    return (
        <div className="stopwatch">
            <div className="display" >{formatTime()}</div>  
            <div className="controls">
                <button onClick={start} className="start-btn" >Start</button>
                <button onClick={stop} className="stop-btn" >Stop</button>
                <button onClick={reset} className="reset-btn" >Reset</button>
            </div>
        </div>
    )
}

export default StopWatch