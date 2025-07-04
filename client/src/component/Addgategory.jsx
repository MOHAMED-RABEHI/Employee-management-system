import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Addgategory = () => {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/addcategory', {category},{
              headers: { "Content-Type": "application/json" },
        }
)    .then(response => {
        if(response.data.status) {
            navigate('/dashboard/category')
        }else{
         alert(response.data.message)
        }            
})
    .catch((error) => {
        console.log('Error adding gategory:', error)  
    } )

}
  return (
     <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      

      <form  onSubmit ={handleSubmit}className="bg-white p-10 rounded shadow-md w-90 mb-30">

        
        <h2 className="text-xl font-bold mb-4">Category</h2>

        

        <label className="block mt-4 mb-2 text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      
          placeholder="enter your gategory name"
        onChange={(e) => setCategory( e.target.value )}
          required
        />

        <button
          type="submit"
          className="w-full mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-900"
        >
          Add Category
        </button>
      </form>
    </div>
  )
}

export default Addgategory
