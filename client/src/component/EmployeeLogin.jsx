import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const EmployeeLogin = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
      });
      const [error, setError] = useState(null);
      const navigate = useNavigate();
     
     const handleSubmit =  (e) => {
      e.preventDefault();
        axios.post("http://localhost:3000/employee/employeelogin", value, {
      headers: { "Content-Type": "application/json" },
        withCredentials: true, 
    })
    
        .then(response => 
        {
         if(response.data.loginstatus ) {
           localStorage.setItem("valid", true);
     navigate(`/employee_detail/${response.data.id}`);

         }
         else{
        setError(response.data.message);
         }
          
        } 
      
      )
        .catch((error) => {
           console.log(error);    });
     
        
     
    };
    
  return (
  <div className="flex min-h-screen w-screen bg-gray-100">

  <div className="w-1/2 flex items-center justify-center">
    <img
      src="../login.jpg"
      alt="Employee Management"
      className="w-full h-screen object-cover rounded-lg shadow-md"
    />
  </div>


  <div className="w-1/2 flex items-center justify-center bg-gray-500">
    <form onSubmit={handleSubmit} className=" p-10 rounded shadow-md w-90 bg-gray-200">  
      <div className="text-amber-200 text-center mb-4">
        {error && error}
      </div>
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <label className="block mb-2 text-sm font-medium">Email</label>
      <input
        type="email"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter your email"
        onChange={(e) => setValue({ ...value, email: e.target.value })}
        required
      />

      <label className="block mt-4 mb-2 text-sm font-medium">Password</label>
      <input
        type="password"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter your password"
        onChange={(e) => setValue({ ...value, password: e.target.value })}
        required
      />

      <button
        type="submit"
        className="w-full mt-4 bg-blue-950 text-white py-2 rounded hover:bg-blue-900"
      >
        Login
      </button>
    </form>
  </div>
</div>
  )
}

export default EmployeeLogin
