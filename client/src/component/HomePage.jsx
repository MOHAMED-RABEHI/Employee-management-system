import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {

    const navigate = useNavigate();
    useEffect(() => {
      axios.get("http://localhost:3000/verify",{
         headers: { "Content-Type": "application/json" },
  withCredentials: true,

      })
        .then((res) => {
          if (res.data.status) {
           if(res.data.role === "manager") {
              navigate("/dashboard");
            }
            else{
            navigate(`/employee_detail/${response.data.id}`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    , [])
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-white shadow-md p-0.5">
        <div className="flex items-center justify-center  space-x-3">
  <img src="../logo.png" alt="Company Logo" className="h-18 w-30" />
</div>
       
        <div className="space-x-4 mr-10">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition mr-4"
            onClick={() => navigate("/managerlogin")}>
            Login As Manager
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/employeelogin")}>
            Login As Employee
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-between p-10 mt-1">
        {/* Left Section - Text */}
        <div className="w-1/2 ">
         <h2 className="text-4xl font-bold text-gray-800">Employee Management System</h2>
<p className="mt-4 text-lg text-gray-600">
  Our system simplifies employee data tracking, payroll management, and performance analysis. 
  Enhance workforce productivity with intuitive tools and seamless automation. 
  Streamline HR operations for efficiency and growth.
</p>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 flex justify-end mt-0">
          <img
            src="../company.jpg"
            alt="Company Team"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
       <footer className="bg-gray-800 text-gray-300 text-center py-3">
        <p>&copy; 2025 Company Name. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;