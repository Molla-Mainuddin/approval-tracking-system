import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  useEffect(() => {
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setRole(localStorage.getItem('role'));
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/auth");
  }

  // const profileMenuToggler = () => {
  //   isProfileMenuOpen ? setIsProfileMenuOpen(false) : setIsProfileMenuOpen(true);
  // }

  return (
    <nav className="h-14 bg-teal-600 shadow-xl fixed top-0 z-50 w-full flex items-center justify-between py-2 px-8">
      <div className="flex items-center flex-shrink-0 text-white">
        {/* <NavLink to="/home">
          <img src='assets/claim-logo.png' alt='broken' className='border border-teal-500 shadow-sm h-10 w-10 rounded-full cursor-pointer lg:h-12 lg:w-12 ' />
        </NavLink> */}
        <span className="ml-2 text-black font-semibold text-xl tracking-tight">Approval Tracking</span>
      </div>

      <div className="w-full hidden lg:flex lg:items-center lg:w-auto">
        <div className="text-lg lg:flex lg:items-center">
          <div>
            {firstName} {lastName} ({role})
          </div>
          <div className="p-2">
            <div onClick={logoutHandler} className="flex justify-center items-center px-3 py-1 cursor-pointer space-x-1 bg-blue-600 text-white font-normal text-xs leading-tight rounded-sm hover:bg-blue-700">
              {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg> */}
              <div className="text-base text-center">
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      {/* {isProfileMenuOpen ? (<ProfileMenu userName={userName} />) : ''} */}
    </nav>
  )
}

export default Navbar