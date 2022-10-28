import React from 'react'
import { useNavigate } from 'react-router-dom';
import { notify } from './Notify';

const ProfileMenu = ( {userName} ) => {
    
    const navigate = useNavigate();
    
    const logoutHandler = ()=>{
        localStorage.clear(); 
        navigate("/auth");
        notify("LOGOUT_SUCCESS","Logut Successfully");
    }

    return (
        <div className="w-40 absolute top-[60px] right-36 border bg-white inline-block box-content rounded shadow-md">
            <div className="flex items-center space-x-3 pl-4 py-2 border-b shadow-sm cursor-pointer">
                <div className="text-base hover:text-blue-700">
                    <div className="text-left font-semibold">{userName}</div>
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-start items-center space-x-2 cursor-pointer hover:text-blue-700">
                    <svg
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
                    </svg>
                    <div className="text-base" onClick={ logoutHandler }>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu;