import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChangeStatus, editDefect, EditDefectResult, GetDefectDetailsById } from '../../apis/defect';
import { GetMemberInfoById, GetTeamDetailsByTeamId } from '../../apis/userservice';
import Navbar from '../../component/Navbar';
import SideBar from '../../component/SideBar';
import { ToastSuccess } from '../../component/Toast';

const SubmitResult = () => {
    const[role,setRole] = useState('');
    const [searchParams] = useSearchParams();
    const [defectId, setDefectId] = useState(searchParams.get("defectid"));
    const [defectData, setDefectData] = useState({});
    const initialValues = { testResult: "", status: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [toastMessage, setToastMessage] = useState('');
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [assignToMemberName, setAssignToMemberName] = useState('');
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        setRole(localStorage.getItem('role'));
        loadDefectDetailsById();
    }, [])

    const loadDefectDetailsById = () => {
        GetDefectDetailsById(defectId).then((res) => {
            setDefectData(res);
            getMemberName(res.assignedToMemberId);
            getTeamName(res.assignedToScrumTeamId);
            formValues['testResult'] = res.testResult;
            formValues['status'] = res.status;
        }).catch((err) => {
            console.log("Something went wrong, Please try again later.");
        })
    }

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

    const handleChange = (e) => {
        setUpdate(true);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {
        const errors = {};
        if (!values.testResult) {
            errors.testResult = "TestResult is required!";
        }
        if (!values.status) {
            errors.status = "Status is required!";
        }
        let errLength = Object.keys(errors).length;
        return [errors, errLength];
    };

    const handleSubmit = () => {
        let [errors, errLength] = validate(formValues);
        setFormErrors(errors);
        return errLength === 0 ? true : false;
    };

    const changeStatus = (defectId, currentStatus) => {
        const data = {
            "defectId": defectId,
            "status": currentStatus
        }
        ChangeStatus(data).then((res) => {
            // console.log("Status Updated");
        }).catch((err) => {
            console.log("Some thing went wrong, try again leter")
        })
    }

    const onSubmit = () => {
        if (!handleSubmit()) {
            return;
        }
        document.getElementById("submitButton").innerHTML = "Data Processing...";
        var resultData = {
            "defectId": defectId,
            "testResult": formValues.testResult
        }
        //checking if any values of form field is still empty or not
        EditDefectResult(resultData).then((res) => {
            setIsToastOpen(true);
            changeStatus(defectId, formValues.status);
            setToastMessage("TestResult Submitted Successfully");
            document.getElementById("submitButton").innerHTML = "Submit";
        }).catch((err) => {
            console.log(err);
        })
    }

    // console.log(defectData);
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

                        {
                            isToastOpen ?
                                <div className='w-full mx-auto text-center flex justify-center'>
                                    <ToastSuccess
                                        setIsToastOpen={setIsToastOpen}
                                        message={toastMessage}
                                    />
                                </div> : null
                        }

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
                                <div>
                                    <div className='flex flex-row'>
                                        <label
                                            htmlFor="status"
                                            className="block mb-2 text-base font-medium text-gray-800"
                                        >
                                            Status<span className='text-red-600 text-base'>*</span> :
                                        </label>
                                        <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.status}</span>
                                    </div>
                                    <select
                                        name="status"
                                        id="status"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-4/5 cursor-pointer"
                                        value={formValues.status}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    >
                                        <option value="">Choose Status</option>
                                        <option value="Re-Assigned">Re-Assigned</option>
                                        {/* <option disabled={role==='Developer' ? true : false} value={formValues.status}>{formValues.status}</option> */}
                                    </select>
                                </div>

                                {/* Button */}
                                <div className='flex flex-row items-center'>
                                    <button type="button" className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none 
                                                font-medium rounded-full text-base px-4 py-1.5 text-center mr-2 mb-2"
                                        onClick={onSubmit}
                                        disabled={!update ? true : false}
                                        id="submitButton"
                                    >
                                        Submit
                                    </button>
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

                                {/* Test Result Filed */}
                                <div>
                                    <div className='flex flex-row'>
                                        <label
                                            htmlFor="testResult"
                                            className="block mb-2 text-base font-medium text-gray-800"
                                        >
                                            Test Result<span className='text-red-600 text-base'>*</span> :
                                        </label>
                                        <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.testResult}</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="testResult"
                                        id="testResult"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-4/5"
                                        placeholder="Test Result"
                                        value={formValues.testResult}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitResult;