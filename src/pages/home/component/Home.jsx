import React, { useEffect } from 'react'
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { GetAllDefect } from '../../../apis/defect';
import { GetAllMembers, GetMemberInfoById } from '../../../apis/userservice';
import Navbar from '../../../component/Navbar';
import SideBar from '../../../component/SideBar';

const Home = () => {
  const navigate = useNavigate();
  const [defects, setDefects] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allQaPerson, setAllQaPerson] = useState([]);

  useEffect(() => {
    setMemberId(localStorage.getItem('mid'));
    setRole(localStorage.getItem('role'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    loadDefects();
    loadAllMembers();
  }, [memberId])

  const loadAllMembers = () => {
    GetAllMembers().then((res) => {
      // console.log(res);
      filterQaPerson(res);
    }).catch((err) => {
      console.log("Some Thing Went Wrong. Try again later");
    })
  }

  const filterQaPerson = (data) => {
    const arr = data.filter((data) => {
      return data.role === "QA"
    })
    setAllQaPerson(arr);
  }

  const getQaNamefromId = (memberId) => {
    let qaName = "";
    const arr = allQaPerson.filter((data) => {
      return data.mid === memberId;
    })
    if (arr.length) {
      qaName = arr[0].firstName + " " + arr[0].lastName;
      return qaName;
    }
  }

  const loadDefects = () => {
    GetAllDefect().then((res) => {
      // console.log(res);
      setDefects(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  const loadMemberInfo = (memberId) => {
    let info;
    GetMemberInfoById(memberId).then((res) => {
      console.log(res);
      info = res;
    }).then((err) => {
      console.log("Some thing went wrong.");
    })
    return info;
  }

  return (

    <>
      <Navbar />
      <div className='relative flex flex-row'>
        <SideBar />
        <div className='h-screen w-full lg:w-5/6 px-6 lg:pt-20'>
          {/* This Div is for welcome name */}
          <div className='px-2 pb-2 flex items-center justify-between'>
            <p className="ml-2 text-lg font-semibold font-serif text-gray-900">
              Welcome! {firstName + " "}{lastName}
            </p>
            <p className="ml-2 text-lg font-semibold font-serif text-gray-900">
              All Defects
            </p>
          </div>

          {/* This Div is for Cards */}
          {/* <div className='h-20 flex flex-row justify-center space-x-10 mb-6 mt-4'>
            <div class="block w-1/5 h-full p-4 bg-gray-400 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              Active Defect
            </div>
            <div class="block w-1/5 h-full p-4 bg-gray-400 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              Close Defect
            </div>
            <div class="block w-1/5 h-full p-4 bg-gray-400 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              Rejected Defect
            </div>
            <div class="block w-1/5 h-full p-4 bg-gray-400 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              Reassigned Defect
            </div>
          </div> */}

          {/* This Div is For All Defect Details (Dash board height was 65%)*/}
          <div className='flex justify-center h-[75%] overflow-y-auto mt-2'>
            {/* This is defect main container */}
            <div className='w-full pb-2 space-y-6'>
              {/* This is container heading */}
              {/* <div className='w-1/4 mx-auto text-center bg-teal-500 rounded-3xl py-2'>
              <p className='text-white text-lg font-serif font-bold'>All Approvals</p>
            </div> */}
              {/* This is table div */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500">
                  {/* This is table heading */}
                  <thead className="text-xs uppercase bg-gray-800">
                    <tr className='text-white'>
                      <th scope="col" className="px-4 py-3">
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
                      <th scope="col" className="px-6 py-3">
                        Defect Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created By
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Creation Date
                      </th>
                    </tr>
                  </thead>
                  {/* This is table body */}
                  <tbody>
                    {
                      defects.map((data, index) => {
                        return (
                          <tr className='odd:bg-gray-700 even:bg-gray-600 text-white' key={index}>
                            <td className="px-4 py-4">
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
                              {/* {data.createdByMemberId} */}
                              {getQaNamefromId(data.createdByMemberId)}
                            </td>
                            <td className="px-6 py-4">
                              {data.createDate}
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

export default Home;