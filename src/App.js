import React from 'react'
import Login from './pages/authentication/component/Login'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/home/component/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubmitApproval from './pages/approval/component/SubmitApproval';
import PrivateRouter from './privaterouter/PrivateRouter';
import MyApproval from './pages/approval/component/MyApproval';
import RoleBasedPrivateRoute from './privaterouter/RoleBasedPrivateRoute';

const App = () => {
  return (
    <div className='w-full box-border'>
      <ToastContainer autoClose={1500} />
      <Routes>
        {/* Login Page Routing */}
        <Route exact path='/auth' element={<Login />} />

        <Route path='/*' element={<Navigate to="/home" />} />


        <Route element={<PrivateRouter />}>
          {/* Home Page Routing */}
          <Route exact path='/home' element={<Home />} />
          <Route element={ <RoleBasedPrivateRoute /> }>
            {/* Add Submit Approval Page Routing */}
            <Route exact path='/submitapproval' element={<SubmitApproval />} />
            {/* View BIll Routing */}
            <Route exact path='/myapproval' element={<MyApproval />} />
          </Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App;
