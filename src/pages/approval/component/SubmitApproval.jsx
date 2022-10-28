import React, { useEffect, useState } from 'react'
import { getLastApprovalId, SubmitApprovalData } from '../../../apis/approvalCreation';
import { notify } from '../../../component/Notify';
import SideBar from '../../../component/SideBar';
import Navbar from '../../../component/Navbar';


const SubmitApproval = () => {

    const [approvalId, setApprovalId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [description, setDescription] = useState('');
    const [releaseVersion, setReleaseVersion] = useState('');
    const [testResult, setTestResult] = useState('');
    const [scrumTeamId, setScrumTeamId] = useState('');

    // console.log(approvalId,memberId,description,releaseVersion,testResult,scrumTeamId);
    useEffect(() => {
        //fetching member id from local storage
        setMemberId(localStorage.getItem('mid'));
        //making api call for getting last approval id from database
        getLastApprovalId().then((res) => {
            //setting approval id into approvalId variable
            setApprovalId(res.maxApprovalId);
            // calling generateApprovalId method to increase current approval Id by one
            generateApprovalId(res.maxApprovalId);
        }).catch((err) => {
            //printing err if any error occured during api call
            console.log(err);
        })
    }, [])

    const generateApprovalId = (approvalId) => {
        //converting string approvalId value into number
        let Id = parseInt(approvalId.substring(1));
        //increasing approval Id by one and setting it into approvalId variable
        setApprovalId("A" + (Id + 1));
    }

    const onSubmit = async () => {
        //onsubmit method starting here
        document.getElementById("submitButton").innerHTML = "Data Processing...";
        //mapping all values of form into reqData object
        var reqData = {
            "approvalId": approvalId,
            "description": description,
            "releaseVersion": releaseVersion,
            "testResult": testResult,
            "solverId": memberId,
            "scrumTeamId": scrumTeamId
        }
        //checking if any values of form field is still empty or not
        if (description !== '' && releaseVersion !== '' && testResult !== '' && scrumTeamId !== '') {
            SubmitApprovalData(reqData).then((res) => {
                // console.log(res);
                // console.log("Data Submitted Successfully");
                //after submitting approval, calling generateApprovalId() method to increase current approvalId
                generateApprovalId(approvalId);
                notify("SUBMIT_SUCCESS", "Data Submitted Successfully");
                setDescription("");
                setReleaseVersion("");
                setTestResult("");
                setScrumTeamId("");
                document.getElementById("submitButton").innerHTML = "Submit Claim";
            }).catch((err) => {
                console.log(err);
            })
        } else {
            document.getElementById("submitButton").innerHTML = "Submit Claim";
            notify("SUBMIT_FAILED", "all fields are required");
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex flex-row'>
                <SideBar />
                <div className='flex justify-center w-full lg:w-4/5 lg:pt-24 px-10'>
                    <div className='h-[90%] w-[90%] border-2 p-4'>
                        {/* <div className='w-[30%] mx-auto text-center bg-teal-500 rounded-3xl py-2 '>
                            <p className='text-white text-xl font-serif font-bold '>Submit Approval</p>
                        </div> */}
                        <div className='px-8 mt-12 w-full h-auto flex flex-row mr-6'>

                            {/* First Column */}
                            <div className='h-full w-1/2 space-y-8'>
                                {/* Approval Id Field */}
                                <div>
                                    <label
                                        htmlFor="approvalId"
                                        className="block mb-2 text-sm font-medium text-gray-800"
                                    >
                                        Approval Id
                                    </label>
                                    <input
                                        type="text"
                                        name="approvalId"
                                        id="approvalId"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={approvalId}
                                        onChange={(e) => setApprovalId(e.target.value)}
                                        readOnly
                                    />
                                </div>
                                {/* Description Field */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-800"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Remarks Field */}
                                <div>
                                    <label
                                        htmlFor="testresult"
                                        className="block mb-2 text-sm font-medium text-gray-800"
                                    >
                                        Test Result
                                    </label>
                                    <input
                                        type="text"
                                        name="testresult"
                                        id="testresult"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Test Result"
                                        value={testResult}
                                        onChange={(e) => setTestResult(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Claim Submit Button */}
                                <div>
                                    <button type="button" className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none 
                                    font-medium rounded-full text-base px-5 py-2.5 text-center mr-2 mb-2"
                                        onClick={onSubmit}
                                        id="submitButton"
                                    >
                                        Submit Claim
                                    </button>
                                </div>

                            </div>

                            {/* Second Column */}
                            <div className='h-full w-1/2 ml-6 space-y-8'>
                                {/* Solver Id Field */}
                                <div>
                                    <label
                                        htmlFor="solverId"
                                        className="block mb-2 text-sm font-medium text-gray-800"
                                    >
                                        Solver Id
                                    </label>
                                    <input
                                        type="text"
                                        name="solverId"
                                        id="solverId"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Solver Id"
                                        value={memberId}
                                        readOnly
                                    />
                                </div>

                                {/* Release Version Filed */}
                                <div>
                                    <label
                                        htmlFor="releaseversion"
                                        className="block mb-2 text-sm font-medium text-gray-800"
                                    >
                                        Release Version
                                    </label>
                                    <input
                                        type="text"
                                        name="releaseversion"
                                        id="releaseversion"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Release Version"
                                        value={releaseVersion}
                                        onChange={(e) => setReleaseVersion(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Cliam Amount Filed */}
                                <div>
                                    <label
                                        htmlFor="scrumteamid"
                                        className="block mb-2 text-sm font-medium text-gray-800"
                                    >
                                        Scrum Team Id
                                    </label>
                                    <input
                                        type="text"
                                        name="scrumteamid"
                                        id="scrumteamid"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Scrum Team Id"
                                        value={scrumTeamId}
                                        onChange={(e) => setScrumTeamId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubmitApproval;