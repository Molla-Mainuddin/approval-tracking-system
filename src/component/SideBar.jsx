import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {

    const [role, setRole] = useState('');

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, [role])

    return (
        <div className='hidden bg-gray-700 sticky top-0 h-screen w-1/6 pt-20 px-4 lg:block'>
            <div className='content h-full space-y-3'>
                {/* Home Link */}
                <Link
                    to="/home"
                    className="px-2 py-2 mb-1 flex flex-row items-center bg-gray-800 hover:bg-teal-500 text-white text-sm font-medium rounded"
                >
                    <div className="flex items-center justify-center pr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </div>
                    <p>Home</p>
                </Link>

                {/* My Approval Link */}

                {
                    role === "Developer" &&
                    <Link
                        to="/myapproval"
                        className="px-2 py-2 mb-1 flex flex-row items-center bg-gray-800 hover:bg-teal-500 text-white text-sm font-medium rounded"
                    >
                        <div className="flex items-center justify-center pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p>My Approval</p>
                    </Link>
                }

                {/* Submit Approval Link */}
                {
                    role === "Developer" &&
                    <Link
                        to="/submitapproval"
                        className="px-2 py-2 mb-1 flex flex-row items-center bg-gray-800 hover:bg-teal-500 text-white text-sm font-medium rounded"
                    >
                        <div className="flex items-center justify-center pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p>Submit Approval</p>
                    </Link>
                }

                {/* View Bill Link */}
                {/* <Link
                    to="/viewbill"
                    className="px-2 py-2 mb-1 flex flex-row items-center bg-gray-800 hover:bg-teal-500 text-white text-sm font-medium rounded"
                >
                    <div className="flex items-center justify-center pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p>View Bills</p>
                </Link> */}
            </div>
        </div>
    );
}

export default SideBar;