import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { EditApproval } from '../../../apis/approvalCreation';
import { getApprovalDetailsById } from '../../../apis/approvalView';
import { notify } from '../../../component/Notify';

const EditModal = ({ setIsModalOpen, approvalId }) => {

    const [approvalDetails, setApprovalDetails] = useState({});
    const [role, setRole] = useState('');

    useEffect(()=>{
        setRole(localStorage.getItem('role'));
        loadApprovalDetails();
    },[]);

    const loadApprovalDetails = ()=> {
        getApprovalDetailsById(approvalId).then((res)=>{
            console.log(res);
            setApprovalDetails(res);
        }).catch((err)=>{
            console.log(err)
        })
    }
    const onChangeHandler = (event)=>{
        setApprovalDetails({...approvalDetails, [event.target.name]:event.target.value})
    }
    
    const updateHandler = (Id)=>{
        const data = {  approvalId:Id, 
                        description:approvalDetails.description, 
                        releaseVersion:approvalDetails.releaseVersion,
                        testResult:approvalDetails.testResult
                    }
        EditApproval(data).then((res)=>{
            notify("SUBMIT_SUCCESS", "Data Updated Successfully");
            loadApprovalDetails();
            setIsModalOpen(false);
        }).catch((err)=>{
            console.log(err);
        })
    };

    return (
        <div className="absolute top-[20%] left-[30%] border shadow-2xl bg-white w-2/5 h-4/6 p-2 rounded-2xl">
            {/* This is Modal header */}
            <div className="h-[14%] flex justify-between items-start p-4 rounded-t border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                    Update Data
                </h3>
                <button type="button" onClick={ ()=> setIsModalOpen(false) } className="text-gray-600 bg-transparent hover:bg-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {/* This is Modal body */}
            <div className="h-[72%] px-8 py-4 shadow-inner overflow-y-auto space-y-4">
                {/* For Position */}
                <div>
                    <label
                        htmlFor="approvalId"
                        className="block mb-2 text-base font-medium"
                    >
                        Approval Id
                    </label>
                    <input
                        type="text"
                        name="approvalId"
                        id="approvalId"
                        className="bg-gray-50 border-[1.5px] border-gray-500 text-gray-900 text-sm outline-none
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={approvalId}
                        readOnly
                    />
                </div>
                {/* For Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-base font-medium"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="bg-gray-50 border-[1.5px] border-gray-500 text-gray-900 text-sm outline-none
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={approvalDetails.description}
                        onChange={(event)=> onChangeHandler(event)}
                    />
                </div>
                {/* For Release Version */}
                <div>
                    <label
                        htmlFor="releaseVersion"
                        className="block mb-2 text-base font-medium"
                    >
                        Release Version
                    </label>
                    <input
                        type="text"
                        name="releaseVersion"
                        id="releaseVersion"
                        className="bg-gray-50 border-[1.5px] border-gray-500 text-gray-900 text-sm outline-none
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={approvalDetails.releaseVersion}
                        onChange={(event)=> onChangeHandler(event)}
                    />
                </div>
                {/* For Test Result */}
                <div>
                    <label
                        htmlFor="testResult"
                        className="block mb-2 text-base font-medium"
                    >
                        Test Result
                    </label>
                    <input
                        type="text"
                        name="testResult"
                        id="testResult"
                        className="bg-gray-50 border-[1.5px] border-gray-500 text-gray-900 text-sm outline-none
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={approvalDetails.testResult}
                        onChange={(event)=> onChangeHandler(event)}
                    />
                </div>
            </div>
            {/* This is Modal Footer */}
            <div className="h-[14%] p-4 rounded-b border-t space-x-4">
                <button onClick={()=> updateHandler(approvalDetails.approvalId)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
                    Update
                </button>
                <button onClick={()=> setIsModalOpen(false) } type="button" className="text-gray-800 bg-white hover:bg-gray-300 border rounded-lg text-sm font-medium px-4 py-2 text-center">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditModal;