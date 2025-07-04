import React from 'react';
import {  FaUsers, FaList, FaSignOutAlt,FaTachometerAlt } from "react-icons/fa";
import { Link, Outlet,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Dashboard = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout",{
      withCredentials: true, 
    })
    .then((res) => {
      if(res.data.status) {
        localStorage.removeItem('valid')
       navigate('/')
      }else{
        alert(res.data.message)
      }
    })
  }
  return (
    <div className="flex">
      <div className='w-48  md:w-64 bg-gray-700 transition-width duration-300 text-white '>
        <div className='flex justify-between items-center  pl-10 pb-4 pt-4'>
        <h2 className='font-bold text-xl  text-center '>Information</h2>
      </div>

     <nav className='mt-4'>
      <ul>
        <li className='flex items-center p-4 cursor-pointer'>
          <Link to="/dashboard">
  <span className='flex items-center gap-4 ttext-white'>
    <FaTachometerAlt size={25} />
    Dashboard
  </span>
  </Link>
</li>

        <li className='flex items-center p-4 cursor-pointer'>
          <Link to="/dashboard/employee">
          <span className='flex items-center gap-4 text-white'>
            <FaUsers size={25} />
            Manage People
          </span>
          </Link>
        </li>

        <li className='flex items-center p-4 cursor-pointer'>
          <Link to="/dashboard/category">
          <span className='flex items-center gap-4 text-white'>
            <FaList size={25} />
            Category
          </span>
          
        </Link>
        </li>

        <li className='flex items-center p-4 cursor-pointer'onClick={handleLogout}>
          <Link  >
          <span className='flex items-center gap-4 text-white'>
            <FaSignOutAlt size={25} />
            Logout
          </span>
          </Link>
        </li>
      </ul>
    </nav>

      </div>
      <div className=' bg-gray-100  min-h-screen flex-1 '>
         <div className="bg-gray-300 w-full p-4 text-center ">
          <h2 className="font-bold text-xl">Employee Management System</h2>
        </div>
        <Outlet/>

     
      </div>
    </div>
  );
};

export default Dashboard;