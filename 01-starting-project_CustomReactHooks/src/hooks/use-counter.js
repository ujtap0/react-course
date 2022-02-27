//custom hook naming rule
//use로 시작해야한다 - 리액트가 custom hook이라고 인지

import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if(forwards){
        setCounter((prevCounter) => prevCounter + 1);
      }else{
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
}

export default useCounter;