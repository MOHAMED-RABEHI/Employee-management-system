import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Addemployee = () => {
    const[employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        idcategory: ''

    })
const [category, setCategory] = useState([])
const navigate = useNavigate()
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
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/addemployee', employee,{
          headers: { "Content-Type": "application/json" },
    }).then(response => {
        navigate('/dashboard/employee')
        console.log(response.data)})
    .catch((error) => {
        console.log('Error adding employee:', error)  
    } )
  }
  return (
     <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      

      <form  className="bg-white p-4 rounded shadow-md w-90 mb-10 mt-1.5 "  onSubmit={handleSubmit}>

        
        <h2 className="text-xl font-bold mb-3">Employee</h2>

        

        <label className="block mt-2 mb-1 text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      
          placeholder="enter  name"
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
       
          required
        />
         <label className="block  mt-2 mb-1text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      
          placeholder="enter email"
         onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          required
        />
         <label className="block  mt-2 mb-1 text-sm font-medium">password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
          placeholder="enter password"
       
          required
        />
        <label className="block  mt-2 mb-1 text-sm font-medium">Salary</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
          placeholder="enter salarie"
       
          required
        />
         <label className="block  mt-2 mb-1 text-sm font-medium">Address</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
          placeholder="enter adress"
       
          required
        />
          <label className="block  mt-2 mb-1 text-sm font-medium">Category</label>
          <select 
  name="category" 
  id="category"  
  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
  onChange={(e) => setEmployee({ ...employee, idcategory: e.target.value })}
>
  {category.map((item) => {
      return <option key={item.idcategory} value={item.idcategory}>{item.name}</option>;
  })}
</select>
        <button
          type="submit"
          className="w-full mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-900"
        >
          Add Employee
        </button>
      </form>
    </div>
  )
}

export default Addemployee
