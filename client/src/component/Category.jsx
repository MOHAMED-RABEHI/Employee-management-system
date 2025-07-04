import axios from 'axios'
import React from 'react'
import { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
const Categeory = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3000/auth/category")
    .then((res) => {
      if(res.data.status) {
        setCategory(res.data.Result)
        console.log(res.data.Result)
      }else{
        alert(res.data.message)
      }
    }).catch((err) => {
      console.log(err);
    })
    

  }, 
  
  [])
  return (
    <div className='px-5 mt-3'>
      <div className=' flex justify-center'>
        <h2 className='text-center font-bold text-2xl'>Category List</h2>
      </div>
       <Link to="/dashboard/addgategory" className='bg-green-600 p-1 border-0 '>Add gategory</Link>
    <div className='mt-3'>
  <table className='w-full border-collapse border border-gray-300'>
    <thead>
      <tr className='bg-gray-200'>
        <th className='border border-gray-300 p-3 text-left'>Name</th>
      </tr>
    </thead>
   
      <tbody>

  {category.map((item) => (
    <tr key={item.idgategory} className='hover:bg-gray-100'> 
      <td className='border border-gray-300 p-2 text-black'>{item.name}</td>
    </tr>
  ))}


    </tbody>
  </table>
</div>
    </div>
  )
}

export default  Categeory