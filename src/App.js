import React, { useEffect, useState, startTransition } from 'react'
import InfoContext from './context/InfoContext'
import SessionTime from './components/SessionTime'
import Search from './components/Search'
import MyComponent from './mock/useCallback'


function App() {
  const [counter, setCounter] = useState(0);
  const [currentInfo, setCurrentInfo] = useState(null);
  const intervals = { countdown: null, ball: null };
  const intervalsTimeout = { countdown: 1000, ball: 0 };
  const [pos, setPos] = useState({ x: 1, y: 1 });
  const ball = {w: 60, h: 60};
  const pps = 1;
  const speed = { x: pps, y: pps };
  const initialTime = 5 * 60;
  let timeLeft = initialTime;

  const clearStorage = () => {
    sessionStorage.clear();
  }
  
  const moveBall = () => {
    const maxW = document.documentElement.clientWidth;
    const maxH = document.documentElement.clientHeight;

    pos.x += speed.x;
    pos.y += speed.y;
    
    if(pos.x < 0 || pos.x >= (maxW - ball.w)) {
      speed.x *= -1;
    }
    if(pos.y < 0 || pos.y >= (maxH - ball.h)) {
      speed.y *= -1;
    }

    return { x: pos.x, y: pos.y }
  };

  const getCountdown = () => {
    timeLeft = timeLeft - 1;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  useEffect(()=>{
    intervals.countdown = setInterval(()=>{
      if (timeLeft > 0) {
        setCurrentInfo({
          countdown: getCountdown(), 
          intervals,
          uuid: `${Math.random()} - ${Math.random()}` 
        });
      } else {
        clearInterval(intervals.countdown);
      }
    }, intervalsTimeout.countdown);

    intervals.ball = setInterval(()=>{
      setPos(moveBall());
    }, intervalsTimeout.ball);

    return () => {
      clearInterval(intervals.countdown);
      clearInterval(intervals.ball);
    }
  },[]);

  return (
    <InfoContext.Provider value={{currentInfo}}>
      <div style={{
        border: '3px solid blue',
        width: '800px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexWrap:'wrap',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.5)', 
        backdropFilter: 'blur(5px)'
      }}>
        {
          true && (
            <>
              <SessionTime />
              <Search />
              <div style={{margin: '20px 0 20px 0', display: 'flex', justifyContent: 'center'}}>
                <button style={{margin: '6px'}} onClick={ clearStorage }>Clear Storage</button>
                <button style={{margin: '6px'}} onClick={() => {
                  setCounter(0)
                }}>Reset contador</button>
                <button style={{margin: '6px'}} onClick={() => {
                  setCounter(counter + 1)
                }}>Clicado {counter} vezes</button>
              </div>
            </>
          )
        }
      </div>
      <div style={{
        position: 'absolute',
        width: ball.w,
        height: ball.h,
        background: 'red',
        borderRadius: '40px',
        top: 0,
        left: 0,
        transformOrigin: `${ball.w/2} ${ball.h/2}`,
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }} />
    </InfoContext.Provider>
  );
}

export default App;