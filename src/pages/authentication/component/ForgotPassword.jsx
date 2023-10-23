import React from 'react'
import { useState } from 'react';
import { GetDobByMemberId, IsMemberExist, UpdatePasswordByMemberId } from '../../../apis/auth';

const ForgotPassword = () => {

  const [step, setstep] = useState(1);
  const [memberId, setMemberId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [memberExist, setMemberExist] = useState(false);
  const [dob, setDob] = useState("");
  const [showFiled, setShowField] = useState(false);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
    setShowField(false);
  };

  const MemberExist = () => {
    if (!memberId) {
      alert("Invalid MemberId");
      return;
    }
    IsMemberExist(memberId).then((res) => {
      setMemberExist(res.data.exist);
      if (res.data.exist) {
        nextStep();
      } else {
        alert("Invalid Member Id");
      }
    }).catch((err) => {
      console.log("Something went wrong, Please try again later.");
    })
  }

  const getDateOfBirth = () => {
    GetDobByMemberId(memberId).then((res) => {
      // setCorrectDob(res.data.dob);
      passwordCheck(res.data.dob)
    }).catch((err) => {
      console.log("Something went wrong, Please try again later");
    })
  }

  const passwordCheck = (correctDob) => {
    if (correctDob === dob) {
      setShowField(true);
    } else {
      setShowField(false);
      alert("Entered Incorrect Date of Birth");
    }
  }

  const changePassword = () => {
    if (!newPassword) {
      alert("Enter a valid password");
      return;
    }
    UpdatePasswordByMemberId(memberId, newPassword).then((res) => {
      console.log("Password Updated Successfully.");
      nextStep();
    }).catch((err) => {
      console.log("Something went wrong, Please try again later.")
    })
  }
  // console.log(dob);

  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className='p-6 border-2 w-[30%] mx-auto mt-24'>
          <div>
            <p className='p-2'>Enter Your Member Id : </p>
            <div className='flex space-x-4'>
              <input
                type="text"
                name="memberId"
                id="memberId"
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-1.5"
                placeholder="Member Id"
                required
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
              <button
                className="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-1.5 mt-1 text-center"
                onClick={MemberExist}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className='p-6 border-2 w-[30%] mx-auto mt-24'>
          <div>
            <p className='p-2'>MemberId: {memberId}</p>
            <p className='pb-2'>Enter Your Date of Birth : </p>
            <div className='flex space-x-4'>
              <input
                type="date"
                name="dob"
                id="dob"
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-1.5"
                placeholder="Date of Birth"
                required
                onChange={(e) => setDob(e.target.value)}
              />
              {
                !showFiled ? (
                  <button
                    className="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                      text-sm px-5 py-1.5 mt-1 text-center"
                    onClick={getDateOfBirth}
                  >
                    Submit
                  </button>
                ) : null
              }
            </div>
            {
              showFiled ? (
                <div className='flex items-center mt-4 space-x-2'>
                  <input
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                                  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-1.5"
                    placeholder="New Password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    className="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                      text-sm px-5 py-1.5 mt-1 text-center"
                    onClick={changePassword}
                  >
                    Update
                  </button>
                </div>
              ) : null
            }
            <div>
              <button
                className="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                text-sm px-2 py-1.5 mt-10 text-center"
                onClick={prevStep}
              >
                Previous
              </button>
            </div>
          </div>

        </div>
      );
    case 3:
      return (
        <div className='p-6 border-2 w-[30%] mx-auto mt-24'>
          <p>Password Updated Successfully.</p>
        </div>
      );
    default:
      return (
        <div className='p-6 border-2 w-[30%] mx-auto mt-24'>

        </div>
      );
  }
}

export default ForgotPassword;