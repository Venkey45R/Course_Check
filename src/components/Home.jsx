import React from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/login');
  }
  return (
    <div className=' min-h-screen'>
        <NavBar />
        <div className="flex items-center justify-center">
        <div className="bg-gray-700 border border-white px-10 py-4 mt-40 max-w-sm w-full mx-4  rounded-xl md:max-w-lg">
            <h1 className="text-xl text-center font-bold mt-6">Course Check</h1>
            <p className="my-4 text-center text-white">
                An online course rating platform where you can validate the real worth of your course.
            </p>
            <div className=' flex justify-center my-6'>
                <button onClick={handleClick} className=" px-10 py-4 text-xl border bg-black border-white rounded-xl hover:bg-gray-700">Get Started</button>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Home;
