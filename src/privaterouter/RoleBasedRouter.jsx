import React from 'react'
import { Navigate } from 'react-router-dom';
import AddMember from '../pages/admin/AddMember';
import EditMember from '../pages/admin/EditMember';
import ManageUser from '../pages/admin/ManageUser';
import CreateDefect from '../pages/defect/CreateDefect';
import EditDefect from '../pages/defect/EditDefect';
import MyDefect from '../pages/defect/MyDefect';
import SubmitResult from '../pages/defect/SubmitResult';
import ViewDefect from '../pages/defect/ViewDefect';
import Home from '../pages/home/component/Home';
import AccessDenied from './AccessDenied';

const RoleBasedRouter = ({ urlpath, childern }) => {
  const role = localStorage.getItem('role');

  if (urlpath === "home") {
    return role === "Admin" ? <ManageUser /> : <Home />;
  } else if ((role === "QA" || role === "Developer") && urlpath === "mydefect") {
    return <MyDefect />;
  } else if (role === "QA" && urlpath === "submitdefect") {
    return <CreateDefect />;
  } else if ((role === "QA" || role === "Developer") && urlpath === "editdefect") {
    return <EditDefect />;
  } else if (role === "Admin" && urlpath === "addmember") {
    return <AddMember />;
  } else if (role === "Admin" && urlpath === "editmember") {
    return <EditMember />;
  } else if ((role === "QA" || role === "Developer") && urlpath === "viewdefect") {
    return <ViewDefect />;
  } else if (role === "Developer" && urlpath === "submitresult") {
    return <SubmitResult />;
  }
  else {
    // console.log("Here");
    return <AccessDenied />;
  }

}

export default RoleBasedRouter;