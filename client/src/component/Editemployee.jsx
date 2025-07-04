import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Editemployee = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
      
        salary: '',
        address: '',
        idcategory: ''      })
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
    axios.get(`http://localhost:3000/auth/employee/${id}`)
    .then((res)=>{
       setEmployee({
        ...employee,
        name: res.data.Result[0].name,
        email: res.data.Result[0].email,
        salary: res.data.Result[0].salary,
        address: res.data.Result[0].address,
       })
    }).catch((err) => {
        console.log(err);
    })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/auth/employee_edit/${id}`, employee, {
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        if (response.data.status) {
          navigate('/dashboard/employee')
        } else {
          alert(response.data.message)
        }
      })
      .catch((error) => {
        console.log('Error updating employee:', error);
      });
  }


  return (
     <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      

      <form  className="bg-white p-4 rounded shadow-md w-90 mb-10 mt-1.5  " onSubmit={handleSubmit}>

        
        <h2 className="text-xl font-bold mb-3">Employee</h2>

        

        <label className="block mt-2 mb-1 text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      
          placeholder="enter  name"
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            value={employee.name}
          required
        />
         <label className="block  mt-2 mb-1text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      
          placeholder="enter email"
         onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            value={employee.email}
          required
        />
        
        <label className="block  mt-2 mb-1 text-sm font-medium">Salary</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            value={employee.salary}
          placeholder="enter salarie"
       
          required
        />
         <label className="block  mt-2 mb-1 text-sm font-medium">Address</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            value={employee.address}
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
          Edit Employee
        </button>
      </form>
    </div>
  
  )
}

export default Editemployee
