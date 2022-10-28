import React, { useEffect, useState } from 'react'
import { deleteApprovalById } from '../../../apis/approvalCreation';
import { getApprovalByMemberId } from '../../../apis/approvalView';
import Navbar from '../../../component/Navbar';
import { notify } from '../../../component/Notify';
import SideBar from '../../../component/SideBar';
import EditModal from '../../home/component/EditModal';

const MyApproval = () => {

    const [myApprovals, setMyApprovals] = useState([]);
    const [memberId, setMemberId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [approvalId, setApprovalId] = useState('');

    useEffect(() => {
        setMemberId(localStorage.getItem('mid'));
        if (memberId) {
            loadApproval();
        }
    }, [memberId])

    const loadApproval = ()=> {
        getApprovalByMemberId(memberId).then((res) => {
            setMyApprovals(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    const deleteApproval = (approvalId)=> {
        deleteApprovalById(approvalId).then((res)=>{
            notify("SUBMIT_SUCCESS", "Deleted Successfully");
            loadApproval();
        }).catch((err)=>{
            console.log(err);
        })
    }

    const modalHandler = (Id)=>{ 
        isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
        setApprovalId(Id);
    }

    return (
        <>
            <Navbar />
            <div className='relative flex flex-row'>
                <SideBar />

                { isModalOpen ? <EditModal setIsModalOpen={setIsModalOpen} approvalId={approvalId} /> : null }

                <div className='h-auto w-full lg:w-5/6 px-6 lg:pt-20'>
                    <div className='p-4 flex items-center justify-between'>
                        <p className="ml-2 text-lg font-semibold font-serif text-gray-900">
                            Welcome! {localStorage.getItem('mid')} Role : {localStorage.getItem('role')}
                        </p>
                        <p className="ml-2 text-lg font-semibold font-serif text-gray-900">
                            My Approvals
                        </p>
                    </div>

                    {/* For Claim Details */}
                    <div className='flex justify-center h-auto mt-5'>
                        {/* This is cliam main container */}
                        <div className='w-full pb-2 space-y-6'>
                            {/* This is container heading */}
                            {/* <div className='w-1/4 mx-auto text-center bg-teal-500 rounded-3xl py-2'>
                            <p className='text-white text-lg font-serif font-bold'>My Approvals</p>
                        </div> */}
                            {/* This is table div */}
                            <div className="overflow-x-auto rounded-md">
                                <table className="w-full text-sm text-center text-gray-500">
                                    {/* This is table heading */}
                                    <thead className="text-xs uppercase bg-gray-800">
                                        <tr className='text-white'>
                                            <th scope="col" className="px-6 py-3">
                                                SL No.
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Approval Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Release Version
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Test Result
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Submit Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* This is table body */}
                                    <tbody>
                                        {
                                            myApprovals.map((data, index) => {
                                                return (
                                                    memberId === data.solverId &&
                                                    <tr className='odd:bg-gray-700 even:bg-gray-600 text-white' key={index}>
                                                        <td className="px-6 py-4">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.approvalId}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.description}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.releaseVersion}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.testResult + "%"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.status}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.submitDate}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className='flex flex-row justify-between items-center'>
                                                                <button onClick={ ()=> modalHandler(data.approvalId) } 
                                                                    className="font-medium text-green-500 flex space-x-1 items-center"
                                                                    disabled={ data.status==="Accepted" ? true : false }
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button>
                                                                <button onClick={ ()=> deleteApproval(data.approvalId) }
                                                                    className="font-medium text-red-500 flex space-x-1 items-center" 
                                                                    disabled={ data.status==="Accepted" ? true : false }
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
                </div>
            </div>
        </>
    )
}

export default MyApproval;