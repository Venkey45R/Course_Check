import React, { useState } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const naviagte = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
    .then(res =>{
      if(res.data === "success"){
        naviagte('/course');
      }
      else{
        alert(res.data);
      }
    })
    .catch(err =>{
      console.log(err);
    })
  };

  return (
    <div className='min-h-screen'>
        <NavBar />
        <div className=" flex flex-col mt-40 items-center justify-center bg-black text-white">
        <div className="bg-gray-700 border border-white px-10 py-8 max-w-sm w-full mx-4 md:max-w-lg rounded-md shadow-lg">
            <h1 className="text-2xl text-center font-bold mb-6">Login</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">Email ID</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white transition duration-300"
            >
                Submit
            </button>
            </form>
            <p className=' text-center mt-6'>Do not have an account? <span className=' text-blue-500 cursor-pointer' onClick={()=>naviagte('/register')}>Register</span></p>
        </div>
        </div>
    </div>
  );
}

export default Login;
