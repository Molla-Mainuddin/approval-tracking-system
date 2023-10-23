import React, { useEffect, useState } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { DeleteDefectById, GetDefectsByAssignedToMemberId, GetDefectsByCreatedMemberId } from '../../apis/defect';
import { GetAllMembers } from '../../apis/userservice';
import Navbar from '../../component/Navbar';
import SideBar from '../../component/SideBar';

const MyDefect = () => {

    const navigate = useNavigate();
    const [memberId, setMemberId] = useState('');
    const [role, setRole] = useState('');
    const [defects, setDefects] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [error, setError] = useState();

    const [qaPersonDetails, setQaPersonDetails] = useState();

    useEffect(() => {
        setMemberId(localStorage.getItem('mid'));
        setRole(localStorage.getItem('role'));
        if (memberId) {
            loadDefects();
        }
    }, [memberId])

    const loadDefects = () => {
        role === "Developer" && GetDefectsByAssignedToMemberId(memberId).then((res) => {
            // console.log(res);
            setDefects(res)
        }).catch((err) => {
            console.log(err);
        })

        role === "QA" && GetDefectsByCreatedMemberId(memberId).then((res) => {
            // console.log(res);
            setDefects(res)
        }).catch((err) => {
            console.log(err);
        })
    }

    const deleteDefect = (id) => {
        // console.log(id);
        DeleteDefectById(id).then((res) => {
            loadDefects();
        }).catch((err) => {
            console.log("Something went wrong, please try again later.");
        })
    }

    return (
        <>
            <Navbar />
            <div className='relative flex flex-row'>
                <SideBar />
                <div className='h-screen w-full lg:w-5/6 px-6 lg:pt-20'>
                    <div className='px-2 pb-2  flex items-center justify-between'>
                        <p className="ml-auto text-lg font-semibold font-serif text-gray-900">
                            My Defects
                        </p>
                    </div>
                    {/* For Claim Details */}
                    <div className='h-[75%] overflow-y-auto flex justify-center mt-2'>
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
                                            <th scope="col" className="px-1 py-3">
                                                SL No.
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Defect Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Defect Summary
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Release Version
                                            </th>
                                            {/* <th scope="col" className="px-6 py-3">
                                                Test Result
                                            </th> */}
                                            <th scope="col" className="px-6 py-3">
                                                Defect Status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Creation Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* This is table body */}
                                    <tbody>
                                        {
                                            defects.length === 0 && <tr><td colSpan="7" className='border-2 py-6 text-gray-800'>No Defect Exist</td></tr>
                                        }
                                        {
                                            defects.length !== 0 && defects.map((data, index) => {
                                                return (
                                                    <tr className='odd:bg-gray-700 even:bg-gray-600 text-white' key={index}>
                                                        <td className="px-1 py-4">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                className="underline text-teal-500 hover:text-teal-600 cursor-pointer"
                                                                onClick={
                                                                    () => navigate({
                                                                        pathname: "/viewdefect",
                                                                        search: createSearchParams({ defectid: data.defectId }).toString()
                                                                    })}
                                                            >
                                                                {data.defectId}
                                                            </a>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.defectSummary}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.releaseVersion}
                                                        </td>
                                                        {/* <td className="px-6 py-4">
                                                            {data.testResult + "%"}
                                                        </td> */}
                                                        <td className="px-6 py-4">
                                                            {data.status}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.createDate}
                                                        </td>
                                                        <td className="px-6 py-4 mx-auto">
                                                            <div className='flex flex-row justify-between items-center'>
                                                                {/* <button
                                                                    className="font-medium text-green-500 flex space-x-1 items-center"
                                                                    onClick={
                                                                        () => navigate({
                                                                            pathname: role === "QA" ? "/editdefect" : "/submitresult",
                                                                            search: createSearchParams({ defectid: data.defectId }).toString()
                                                                        })}
                                                                    disabled={(role === "Developer" && data.status === "Approved") ? true : false}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button> */}

                                                                {
                                                                    (role === "Developer" && data.status === "Approved") ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 font-medium">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>

                                                                    ) : (
                                                                        <button
                                                                            className="font-medium text-green-500 flex space-x-1 items-center"
                                                                            onClick={
                                                                                () => navigate({
                                                                                    pathname: role === "QA" ? "/editdefect" : "/submitresult",
                                                                                    search: createSearchParams({ defectid: data.defectId }).toString()
                                                                                })}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </button>
                                                                    )
                                                                }

                                                                {
                                                                    role === "QA" &&
                                                                    <button
                                                                        className="font-medium text-red-500 flex space-x-1 items-center"
                                                                        onClick={() => deleteDefect(data.defectId)}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </button>
                                                                }
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
                </div>
            </div>
        </>
    )
}

export default MyDefect;