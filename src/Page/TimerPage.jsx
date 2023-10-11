import React,{useState,useEffect} from "react";

function Timer() {
    const [Timer, setTimer] = useState(60);
  
    useEffect(() => {
      const id = setInterval(() => {
        setTimer(count => count - 1); 
      }, 1000);
      if(Timer === 0){
        clearInterval(id);
      }
      return () => {clearInterval(id)}
    }, [Timer]);
  
    return <p className="p-timer">{Timer}</p>;
}

export default Timer;