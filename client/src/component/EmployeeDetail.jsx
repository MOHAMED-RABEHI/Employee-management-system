import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaMapMarkerAlt,FaMoneyBillWave  } from "react-icons/fa";


const EmployeeDetail = () => {
   const [employee, setEmployee] = useState({});
   const [attendance, setAttendance] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate()
 useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then((response) => 
        setEmployee(response.data.Result[0])
       ).catch((error) => {
      console.error('Error fetching employee details:', error);
      });
      axios.get(`http://localhost:3000/employee/attendance/${id}`)
      .then(response => {
  setAttendance(response.data.results);
      console.log(response.data)
 })
      .catch(error => console.error("Error fetching attendance:", error))

 }
   
 , [])
 const handlelogout=()=>{
    axios.get("http://localhost:3000/employee/logout",{
        withCredentials: true,
    })
    .then((res)=>{
        if(res.data.status){
            localStorage.removeItem('valid')
           navigate('/')
        }else{
            alert(res.data.message)
        }

    }).catch((err)=>{
        console.log(err);
    })
 }

 const markAttendance = (status) => {
    axios.post(`http://localhost:3000/employee/attendance/${id}`, {  status })
      .then(response => {
        alert(response.data.message);
        console.log({ id, status });
      })
      .catch(error => {
        console.error("Error marking attendance:", error);
      });
  };

  return (
     <div className="min-h-screen bg-gray-200">
   
      <nav className="flex justify-between items-center bg-white shadow-md p-0.5">
        <div className="flex items-center justify-center  space-x-3">
  <img src="../profilelogo.jpg" alt="profile Logo" className="h-15 w-16" />
</div>
       
        <div className="space-x-4 mr-10">
        
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={handlelogout}>
           Logout
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-between p-10 mt-1">
        <div className="w-1/2 flex justify-end mt-0">
          <img
            src="../profile.jpg"
            alt="Profile"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-1/2 ml-10">
         <h2 className="text-4xl font-bold text-gray-800">Employee Name :{employee.name}</h2>
<p className="mt-4 text-lg text-gray-600">
stay organized with essential tools tailored for productivity. Access your data securely and keep track of performance insights all in one place.

</p>
  <div className="flex items-center">
  <p className="mt-4 text-lg text-gray-950 flex items-center">
    <FaEnvelope className="mr-2" /> Email: {employee.email}
  </p>
</div>
 <div className="flex items-center">
    <p className="mt-4 text-lg text-gray-950 flex items-center">
    <FaMoneyBillWave className="mr-2 text-black" />Salary: {employee.salary} $ 
</p>
</div>

   <div className="flex items-center ">
  <p className="mt-4 text-lg text-gray-950 flex items-center">
    <FaMapMarkerAlt className="mr-2" /> Address: {employee.address}
  </p>
</div>
 <div className="flex gap-4 p-4">
      <button
        onClick={() => markAttendance("Present")}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
      >
        Present
      </button>
      <button
        onClick={() => markAttendance("Absent")}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        Absent
      </button>
    </div>
     <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Employee Attendance Records</h2>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
       <tbody>
  {attendance.map((item) => (
    <tr key={item.idemployee} className="text-center">
      <td className="border p-2">{item.idemployee}</td>
      <td className="border p-2">{item.name}</td>
      <td className="border p-2">{item.date}</td>
      <td className={`border p-2 ${item.status === "Present" ? "text-green-600" : "text-red-600"}`}>
        {item.status}  {/* Use item.status instead of record.status */}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>



        </div>

      
       
      </div>
       <footer className="bg-gray-800 text-gray-300 text-center py-3 pb-10">
        <p>&copy; 2025 Company Name. All rights reserved.</p>
      </footer> 
      

    </div>

  )
}

export default EmployeeDetail
