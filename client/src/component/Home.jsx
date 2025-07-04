import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const Home = () => {
  const [managertotal, setManagertotal] = useState(0);
  const [employeetotal, setEmployeetotal] = useState(0);
  const [categorytotal, setCategorytotal] = useState(0);

  useEffect(() => {
    getmanager();
    getcategory();
    getemployee();
  }, []);

  const getmanager = () => {
    axios.get("http://localhost:3000/auth/manager_total")
      .then((res) => {
        if (res.data.status) {
        setManagertotal(res.data.result.manager_count);
        } else {
          alert(res.data.message);
        }
      }).catch((err) => console.log(err));
  };

  const getemployee = () => {
    axios.get("http://localhost:3000/auth/employee_total")
      .then((res) => {
        if (res.data.status) {
          setEmployeetotal(res.data.result.employee_count);
        } else {
          alert(res.data.message);
        }
      }).catch((err) => console.log(err));
  };

  const getcategory = () => {
    axios.get("http://localhost:3000/auth/category_total")
      .then((res) => {
        if (res.data.status) {
          setCategorytotal(res.data.result.category_count);
        } else {
          alert(res.data.message);
        }
      }).catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
     <div className="p-8 w-full max-w-4xl">
  <ChartComponent managertotal={managertotal} employeetotal={employeetotal} categorytotal={categorytotal} />
</div>
      <div className="grid grid-cols-3 gap-4 p-8 mb-16 ">
        <div className="p-16 bg-white rounded shadow text-center">
          <h2 className="font-bold mb-4">Manager Panel</h2>
          <p>{managertotal}</p>
        </div>
        <div className="p-16 bg-white rounded shadow text-center">
          <h2 className="font-bold mb-4">Employee Panel</h2>
          <p>{employeetotal}</p>
        </div>
        <div className="p-16 bg-white rounded shadow text-center">
          <h2 className="font-bold mb-4">Category Management</h2>
          <p>{categorytotal}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Home;