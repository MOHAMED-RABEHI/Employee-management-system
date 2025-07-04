import { useState } from 'react'
import Login from './component/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './component/Dashboard';
import Categeory from './component/Category';
import Home from './component/Home';
import Employee from './component/Employee';
import Addgategory from './component/Addgategory';
import Addemployee from './component/Addemployee';
import Editemployee from './component/Editemployee';
import HomePage from './component/HomePage';
import EmployeeLogin from './component/EmployeeLogin';
import EmployeeDetail from './component/EmployeeDetail';
import PrivateRoute from './component/PrivateRoute';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage/>} ></Route>
        <Route path="/managerlogin" element={<Login />} ></Route>
        <Route path="/employeelogin" element={<EmployeeLogin/>} ></Route>
        <Route path="/employee_detail/:id" element={<EmployeeDetail/>} ></Route>

        <Route path="/dashboard" element={
          <PrivateRoute>
          <Dashboard />
          </PrivateRoute>
          } >
          <Route path="" element={<Home/>} />
          <Route path="/dashboard/category" element={<Categeory/>} />
          <Route path="/dashboard/employee" element={<Employee/>} /> 
          <Route path="/dashboard/addgategory" element={<Addgategory/>} /> 
          <Route path="/dashboard/addemployee" element={<Addemployee/>} /> 
          <Route path="/dashboard/employee_edit/:id" element={<Editemployee/>} /> 

        </Route>

      </Routes>
    </BrowserRouter>
        
        

       
    </>
  )
}

export default App
