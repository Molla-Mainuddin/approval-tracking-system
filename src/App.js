import React, { useEffect, useState } from 'react'
import Login from './pages/authentication/component/Login'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/home/component/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyDefect from './pages/defect/MyDefect';
import CreateDefect from './pages/defect/CreateDefect';
import PrivateRoutes from './privaterouter/PrivateRoutes';
import PublicRouter from './privaterouter/PublicRouter';
import RoleBasedRouter from './privaterouter/RoleBasedRouter';
import ForgotPassword from './pages/authentication/component/ForgotPassword';
import ManageUser from './pages/admin/ManageUser';

const App = () => {

  return (
    <div className='w-full box-border'>
      <ToastContainer autoClose={1500} />
      <Routes>
        {/* Login Page Routing */}
        <Route exact path='/auth' element={<Login />} />

        <Route exact path='/forgotpassword' element={<ForgotPassword />} />

        <Route path='/*' element={<Navigate to="/home" />} />


        <Route element={<PrivateRoutes />}>
          <Route exact path='/home' element={<RoleBasedRouter urlpath="home" />} />
          <Route exact path='/mydefect' element={<RoleBasedRouter urlpath="mydefect" />} />
          <Route exact path='/submitdefect' element={<RoleBasedRouter urlpath="submitdefect" />} />
          <Route exact path='/editdefect' element={<RoleBasedRouter urlpath="editdefect" />} />
          {/* <Route exact path='/manageuser' element={<RoleBasedRouter urlpath="manageuser" />} /> */}
          <Route exact path='/addmember' element={<RoleBasedRouter urlpath="addmember" />} />
          <Route exact path='/editmember' element={<RoleBasedRouter urlpath="editmember" />} />
          <Route exact path='/viewdefect' element={<RoleBasedRouter urlpath="viewdefect" />} />
          <Route exact path='/submitresult' element={<RoleBasedRouter urlpath="submitresult" />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App;
