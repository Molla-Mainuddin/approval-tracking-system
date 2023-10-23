import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetLastDefectId, SubmitDefect } from '../../apis/defect';
import { GetAllDevScrumTeam, GetAllMemberByTeamId, GetAllScrumTeam } from '../../apis/userservice';
import Navbar from '../../component/Navbar';
import SideBar from '../../component/SideBar';
import { ToastSuccess } from '../../component/Toast';

const CreateDefect = () => {

    const [defectId, setDefectId] = useState('');
    const initialValues = { defectSummary: "", defectDescription: "", releaseVersion: "", assignedToScrumTeam: "", assignedToMember:"", additionalComment: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [devScrumTeams, setDevScrumTeams] = useState([]);
    const [memberId, setMemberId] = useState('');
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [allTeamMembers, setAllTeamMembers] = useState([]);

    useEffect(() => {
        setMemberId(localStorage.getItem('mid'));
        loadAllDevScrumTeam();
        loadLastDefectId();
        if(formValues.assignedToScrumTeam){
            loadAllMemberByTeamId(formValues.assignedToScrumTeam);
        }
    }, [formValues.assignedToScrumTeam])

    const loadAllMemberByTeamId = (teamId) => {//assignedToMember
        GetAllMemberByTeamId(teamId).then((res)=>{
            setAllTeamMembers(res);
        }).catch((err)=>{
            console.log("Some thing went wrong, try again later.");
        })
    }

    const loadAllDevScrumTeam = () => {
        GetAllDevScrumTeam().then((res) => {
            // console.log(res);
            setDevScrumTeams(res)
        }).catch((err) => {
            console.log(err);
        })
    }
    // console.log(formValues);
    const loadLastDefectId = () => {
        GetLastDefectId().then((res) => {
            generateDefectId(res.defectId);
        }).catch((err) => {
            console.log("Some went wrong, try again later.");
        })
    }

    const generateDefectId = (defectId) => {
        let Id = parseInt(defectId.substring(2));
        //increasing approval Id by one and setting it into approvalId variable
        setDefectId("DE" + (Id + 1));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // console.log(formValues);
    const validate = (values) => {
        const errors = {};

        if (!values.defectSummary) {
            errors.defectSummary = "Defect Summary is required!";
        }
        if (!values.defectDescription) {
            errors.defectDescription = "Defect Description is required!";
        }
        if (!values.releaseVersion) {
            errors.releaseVersion = "Release Version is required!";
        }
        if (!values.assignedToScrumTeam) {
            errors.assignedToScrumTeam = "Scrum Team is required!";
        }
        if (!values.assignedToMember) {
            errors.assignedToMember = "Member is required!";
        }
        let errLength = Object.keys(errors).length;
        return [errors, errLength];
    };

    const handleSubmit = () => {
        let [errors, errLength] = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);
        return errLength === 0 ? true : false;
    };

    const onSubmit = async () => {
        if (!handleSubmit()) {
            return;
        }
        document.getElementById("submitButton").innerHTML = "Data Processing...";
        //mapping all values of form into reqData object
        var reqData = {
            "defectSummary":formValues.defectSummary,
            "description": formValues.defectDescription,
            "releaseVersion": formValues.releaseVersion,
            "createdByMemberId": memberId,
            "assignedToScrumTeamId":formValues.assignedToScrumTeam,
            "assignedToMemberId":formValues.assignedToMember,
            "status":"Assigned",
            "additionalComments": formValues.additionalComment
        }
        //checking if any values of form field is still empty or not
        SubmitDefect(reqData).then((res) => {
            setIsToastOpen(true);
            loadLastDefectId();
            // setFormValues({...formValues,defectDescription: "", releaseVersion: "", assignedToScrumTeam: "", additionalComment: ""});
            setFormValues(initialValues);
            document.getElementById("submitButton").innerHTML = "Submit";
        }).catch((err) => {
            console.log(err);
        })

    };

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
                                        message={"Defect Submitted Successfully"}
                                    />
                                </div> : null
                        }
                        <div className='px-8 mt-4 w-full h-auto flex flex-row mr-6'>

                            {/* First Column */}
                            <div className='h-full w-1/2 space-y-5'>
                                {/* Defect Id Field */}
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="defectId"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Defect Id<span className='text-red-600 text-base'>*</span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        name="defectId"
                                        id="defectId"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Defect Id"
                                        value={defectId}
                                        readOnly
                                    />
                                </div>

                                 {/* Description Field */}
                                 <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="defectDescription"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Defect Description<span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <span className='text-red-600 text-sm mb-2 ml-2'>{formErrors.defectDescription}</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="defectDescription"
                                        id="defectDescription"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Defect Description"
                                        value={formValues.defectDescription}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Assigned To Scrum Team Field */}
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="assignedToScrumTeam"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Assigned To Scrum Team<span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.assignedToScrumTeam}</span>
                                    </div>
                                    <select
                                        name="assignedToScrumTeam"
                                        id="assignedToScrumTeam"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={formValues.assignedToScrumTeam}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    >
                                        <option value="">Choose Scrum Team</option>
                                        {
                                            devScrumTeams.map((data, index) => {
                                                return <option value={data.teamId} key={index}>{data.teamName}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                 {/* Additional Comment Field */}
                                 <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="additionalComment"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Additional Comment
                                            {/* <span className='text-red-600 text-base'>*</span> */}
                                        </label>
                                        {/* <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.additionalComment}</span> */}
                                    </div>
                                    <input
                                        type="text"
                                        name="additionalComment"
                                        id="additionalComment"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Additional Comment"
                                        value={formValues.additionalComment}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </div>

                                {/* Claim Submit Button */}
                                <div>
                                    <button type="button" className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none 
                                    font-medium rounded-full text-base px-4 py-1.5 text-center mr-2 mb-2"
                                        onClick={onSubmit}
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
                            <div className='h-full w-1/2 ml-6 space-y-5'>

                                 {/* Defect Summary Field */}
                                 <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="defectSummary"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Defect Summary<span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <span className='text-red-600 text-sm mb-2 ml-2'>{formErrors.defectSummary}</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="defectSummary"
                                        id="defectSummary"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Defect Summary"
                                        value={formValues.defectSummary}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                
                                {/* Release Version Filed */}
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="releaseVersion"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Release Version<span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.releaseVersion}</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="releaseVersion"
                                        id="releaseVersion"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Release Version"
                                        value={formValues.releaseVersion}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Assigned To Member Field */}
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="assignedToMember"
                                            className="block mb-2 text-sm font-medium text-gray-800"
                                        >
                                            Assigned To Member<span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.assignedToMember}</span>
                                    </div>
                                    <select
                                        name="assignedToMember"
                                        id="assignedToMember"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={formValues.assignedToMember}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    >
                                        <option value="">Choose Member</option>
                                        {
                                            allTeamMembers.map((data, index) => {
                                                return <option value={data.memberId.mid} key={index}>{data.memberId.firstName} {data.memberId.lastName}</option>
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateDefect;