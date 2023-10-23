import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { GetDefectDetailsById } from '../../apis/defect';
import { GetAllMembers, GetMemberInfoById, GetTeamDetailsByTeamId } from '../../apis/userservice';
import Navbar from '../../component/Navbar';
import SideBar from '../../component/SideBar';

const ViewDefect = () => {
    const [searchParams] = useSearchParams();
    const [defectId, setDefectId] = useState(searchParams.get("defectid"));
    const [defectData, setDefectData] = useState({});
    const [assignToMemberName, setAssignToMemberName] = useState('');
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        loadDefectDetailsById();
    }, [])

    const loadDefectDetailsById = () => {
        GetDefectDetailsById(defectId).then((res) => {
            setDefectData(res);
            getMemberName(res.assignedToMemberId);
            getTeamName(res.assignedToScrumTeamId);
        }).catch((err) => {
            console.log("Something went wrong, Please try again later.");
        })
    }
    // console.log(defectData);
    const getMemberName = (memberId)=> {
        GetMemberInfoById(memberId).then((res)=>{
            setAssignToMemberName(res.firstName+" "+res.lastName);
        }).catch((err)=>{
            console.log("The Error is : "+err);
        })
    }

    const getTeamName = (teamId)=> {
        GetTeamDetailsByTeamId(teamId).then((res)=>{
            setTeamName(res.teamName);
        }).catch((err)=>{
            console.log("The Error is : "+err);
        })
    }
    
    return (
        <>
            <Navbar />
            <div className='flex flex-row'>
                <SideBar />
                <div className='flex justify-center w-4/5 pt-20 px-10 pb-10'>
                    <div className='h-auto w-[90%] border-2 p-4'>
                        {/* <div className='border w-[30%] mx-auto text-center bg-teal-500 rounded-3xl py-2 '>
                    <p className='text-white text-xl font-serif font-bold '>Submit Approval</p>
                </div> */}
                        <div className='px-8 mt-8 w-full h-auto flex flex-row mr-6'>
                            {/* First Column */}
                            <div className='h-full w-1/2 space-y-9'>

                                {/* Defect Id Field */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="defectId"
                                        className="block font-medium text-gray-800"
                                    >
                                        Defect Id :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{defectId}</p>
                                </div>

                                {/* Defect Decsription */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="description"
                                        className="block font-medium text-gray-800"
                                    >
                                        Defect Description :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{defectData.description}</p>
                                </div>

                                {/* Assigned To Scrum Team */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="addtoscrumteam"
                                        className="block font-medium text-gray-800"
                                    >
                                        Assigned To Scrum Team :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{teamName}</p>
                                </div>

                                {/* Additional Comment */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="additionalcomment"
                                        className="block font-medium text-gray-800"
                                    >
                                        Additional Comment :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{defectData.additionalComments}</p>
                                </div>

                                {/* Status Field */}


                                {/* Button */}
                                <div className='flex flex-row items-center'>
                                    <Link type="button" className="text-white bg-red-500 hover:bg-red-700 focus:outline-none 
                                                font-medium rounded-full text-base px-4 py-1.5 text-center ml-1 mb-2"
                                        id="cancelButton"
                                        to="/mydefect"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>

                            {/* Second Column */}
                            <div className='h-full w-1/2 ml-6 space-y-9'>
                                {/* Defect Summary */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="defectsummary"
                                        className="block font-medium text-gray-800"
                                    >
                                        Defect Summary :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{defectData.defectSummary}</p>
                                </div>

                                {/* Release Version */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="releaseversion"
                                        className="block font-medium text-gray-800"
                                    >
                                        Release Version :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{defectData.releaseVersion}</p>
                                </div>

                                {/* Assigned To Member */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="assigntomember"
                                        className="block font-medium text-gray-800"
                                    >
                                        Assigned To Member :
                                    </label>
                                    <p className="ml-2 text-gray-900 block">{assignToMemberName}</p>
                                </div>

                                {/* Status Filed */}
                                <div className='flex flex-row items-center text-base'>
                                    <label
                                        htmlFor="status"
                                        className="block font-medium text-gray-800"
                                    >
                                        Status :
                                    </label>
                                    <p className="ml-2 text-gray-900 flex flex-row items-center">
                                        {defectData.status}
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 text-green-600 font-medium">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg> */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDefect;