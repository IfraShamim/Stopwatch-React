import './App.css'
import { FiRefreshCw } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
import { useState, useRef } from 'react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const timeRef = useRef(null);

  const formattedTime = (time) => {
    const hours = `0${Math.floor((time / 3600000) % 24)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const milliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const handleToggle = () => {
    if (isPlaying) {
      clearInterval(timeRef.current);
      setIsPlaying(false);
    } else {
      timeRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    clearInterval(timeRef.current);
    setTime(0);
    setIsPlaying(false);
  };

  return (
    <div className='bg-[#faf9f9] p-[1rem] rounded shadow-lg w-[95%] md:w-[40%] mx-auto mt-[4rem] '>
      <FiRefreshCw 
        size={25} 
        style={{ cursor: "pointer" }} 
        className='pb-[0.5rem]' 
        onClick={handleReset}
      />
      <div className="flex justify-center items-center">
        <div className="bg-[#d6ff58] w-[15rem] h-[15rem] rounded-full text-[2rem] flex justify-center items-center">
          {formattedTime(time)}
        </div>
      </div>
      <div className='flex justify-center'>
      <button 
        onClick={handleToggle} 
        className="mt-4 bg-[#d6ff58] px-4 py-2 rounded mb-[1.5rem] cursor-pointer"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button><br />
      </div>
      <b className='text-[#d6ff58]'>StopWatch~</b>
    </div>
  );
}

export default App;
