import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Employee = () => {
  const [employee, setEmployee] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      axios.get("http://localhost:3000/auth/employee")
      .then((res) => {
        if(res.data.status) {
          setEmployee(res.data.Result)
          console.log(res.data.Result)
        }else{
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
      })
      
  
    }, 
    
    [])
    const handledelete = (id) => {
      axios.delete(`http://localhost:3000/auth/deleteemployee/`+id)
        .then((res) => {
          if (res.data.status) {
            setEmployee(employee.filter((item) => item.idemployee !== id));
           
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  const handleSearch = () => {
    axios.get(`http://localhost:3000/auth/searchemployee?q=${searchTerm}`)
      .then((res) => {
        if (res.data.status) {
          setEmployee(res.data.Result);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='px-5 mt-3'>
      <div className=' flex justify-center'>
        <h2 className='text-center font-bold text-2xl'>Employee List</h2>
        
      </div>
       <Link to="/dashboard/addemployee" className='bg-green-600 p-1 border-0 '>Add Employee</Link>
       <input 
        type="text"  
        className='w-90 ml-60 bg-white text-black text-center mt-2.5' 
        placeholder='Search employee by name' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button   className='ml-12 bg-gray-500 p-2 rounded-lg hover:bg-gray-700' onClick={handleSearch}>Search</button>

    <div className='mt-3'>
  <table className='w-full border-collapse border mb-8 border-gray-300'>
    <thead>
      <tr className='bg-gray-200'>
        <th className='border border-gray-300 p-3 text-left'>Name</th>
        <th className='border border-gray-300 p-3 text-left'>Email</th>
        <th className='border border-gray-300 p-3 text-left'>Salary</th>
        <th className='border border-gray-300 p-3 text-left'>Address</th>
        <th className='border border-gray-300 p-3 text-left'>Action</th>

      </tr>
    </thead>
   
      <tbody>
  {employee.map((item) => (
   <tr  className='hover:bg-gray-100'> 
      <td className='border border-gray-300 p-2 text-black'>{item.name}</td>
      <td className='border border-gray-300 p-2 text-black'>{item.email}</td>
      <td className='border border-gray-300 p-2 text-black'>{item.salary}  $</td>
      <td className='border border-gray-300 p-2 text-black'>{item.address}</td>
     
        <td className='border border-gray-300 p-1 text-black flex space-x-2'>
  <Link  to={`/dashboard/employee_edit/${item.idemployee}`}className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ml-2'>
    ✏️ Edit
  </Link>
  <button className='bg-red-400 hover:bg-red-600 text-white font-bold py-2 ml-2 px-4 rounded-lg shadow-md transition-all duration-200'  onClick={() => handledelete(item.idemployee)}>
    🗑️ Delete
  </button>

  
</td>
           
      
    </tr>
  ))}
 

    </tbody>
  </table>
</div>
    </div>
  )
}

export default Employee
