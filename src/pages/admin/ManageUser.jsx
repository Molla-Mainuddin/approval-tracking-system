import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { GetAllMembers } from '../../apis/userservice';
import Navbar from '../../component/Navbar';
import Pagination from '../../component/Pagination';
import SideBar from '../../component/SideBar';

const ManageUser = () => {

    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParam, setSearchParam] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(7);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = members.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(members.length / recordsPerPage);



    useEffect(() => {
        loadAllMembers();
    }, []);

    const loadAllMembers = () => {
        GetAllMembers().then((res) => {
            // console.log(res);
            setMembers(res);
            setLoading(false);
        }).catch((err) => {
            console.log("Some Thing Went Wrong, Try Again Later");
        })
    }

    // console.log(members.filter(member=>member.role.toLowerCase().includes("deve")));

    return (
        <>
            <Navbar />
            <div className='relative flex flex-row'>
                <SideBar />
                {/* This line 1 */}
                <div className='h-screen w-full lg:w-5/6 px-6 lg:pt-20'>
                    <div className='p-2 flex items-center justify-between'>
                        <div className='flex flex-row items-center'>
                            {/* <div className='ml-2'>
                                <select
                                    name="role"
                                    id="role"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg block w-full p-1"
                                    value={searchParam}
                                    onChange={ (e)=> setSearchParam(e.target.value) }
                                    required
                                >
                                    <option value="">Search By</option>
                                    <option value="mid">Member Id</option>
                                    <option value="mailId">Mail Id</option>
                                    <option value="role">Role</option>
                                    <option value="joinedDate">Joined Date</option>
                                </select>
                            </div> */}
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm outline-none
                                            rounded-lg block w-full p-1"
                                    placeholder="Search here"
                                    value={searchQuery}
                                    onChange={ (e)=> setSearchQuery(e.target.value) }
                                />
                            </div>
                            {/* <div className='ml-4'>
                                <button type="button" className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none 
                                font-medium rounded-full text-base px-4 py-1 text-center"
                                    id="submitButton"
                                >
                                    Search
                                </button>
                            </div> */}
                        </div>
                        <div>
                            <p className="text-lg font-semibold font-serif text-gray-900">
                                All Members
                            </p>
                        </div>
                    </div>
                    {/* For Claim Details */}
                    {/* This line 2 */}
                    <div className='h-[75%] flex justify-center mt-2'>
                        {/* This is cliam main container */}
                        <div className='w-full pb-2 space-y-6'>
                            {/* This is container heading */}
                            {/* <div className='w-1/4 mx-auto text-center bg-teal-500 rounded-3xl py-2'>
                            <p className='text-white text-lg font-serif font-bold'>My Approvals</p>
                        </div> */}
                            {/* This is table div */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-center text-gray-500">
                                    {/* This is table heading */}
                                    <thead className="text-xs uppercase bg-gray-800">
                                        <tr className='text-white'>
                                            <th scope="col" className="px-3 py-3">
                                                SL No.
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Member Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Full Name
                                            </th>
                                            {/* <th scope="col" className="px-6 py-3">
                                                Date of Birth
                                            </th> */}
                                            {/* <th scope="col" className="px-6 py-3">
                                                Test Result
                                            </th> */}
                                            <th scope="col" className="px-6 py-3">
                                                Mail Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Role
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Joined Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* This is table body */}
                                    <tbody>
                                        {
                                            loading && <tr><td className='text-base' colSpan="7">Loading...</td></tr>
                                        }
                                        {
                                            currentRecords.filter(member=>member.mid.toLowerCase().includes(searchQuery)).map((data, index) => {
                                                return (
                                                    <tr className='odd:bg-gray-700 even:bg-gray-600 text-white' key={index}>
                                                        <td className="px-3 py-4">
                                                            {indexOfFirstRecord + index + 1}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.mid}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.firstName}{" " + data.lastName}
                                                        </td>
                                                        {/* <td className="px-6 py-4">
                                                            {data.dob}
                                                        </td> */}
                                                        {/* <td className="px-6 py-4">
                                                            {data.testResult + "%"}
                                                        </td> */}
                                                        <td className="px-6 py-4">
                                                            {data.mailId}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.role}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.joinedDate}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className='flex flex-row justify-between items-center'>
                                                                <button
                                                                    className="font-medium text-green-500 flex space-x-1 items-center"
                                                                    onClick={() => navigate({ pathname: "/editmember", search: createSearchParams({ memberid: data.mid }).toString() })}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button>

                                                                <button
                                                                    className="font-medium text-red-500 flex space-x-1 items-center"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    )
}

export default ManageUser;