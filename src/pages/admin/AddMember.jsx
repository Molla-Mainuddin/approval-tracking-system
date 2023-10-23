import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AddNewMember, AddTeamAndMember, GetAllScrumTeam, GetLastMemberId } from '../../apis/userservice';
import Navbar from '../../component/Navbar';
import SideBar from '../../component/SideBar';
import { ToastSuccess } from '../../component/Toast';

const AddMember = () => {
  const initialValues = { firstName: "", lastName: "", dob: "", mailId: "", role: "", scrumTeamId: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [allScrumTeam, setAllScrumTeam] = useState([]);

  useEffect(() => {
    loadLastMemberId();
    loadAllScrumTeam();
  }, [formValues.role])

  const filterScrumTeamByType = (scrumTeams) => {
    if (formValues.role === "Developer") {
      const arr = scrumTeams.filter((data) => {
        return data.teamType === "devteam";
      })
      setAllScrumTeam(arr)
    }
    if (formValues.role === "QA") {
      const arr = scrumTeams.filter((data) => {
        return data.teamType === "qateam";
      })
      setAllScrumTeam(arr)
    }
  }

  const loadAllScrumTeam = () => {
    GetAllScrumTeam().then((res) => {
      // setAllScrumTeam(res);
      filterScrumTeamByType(res);
    }).catch((err) => {
      console.log("Some thing went wrong, please try again later.");
    })
  }

  const loadLastMemberId = () => {
    GetLastMemberId().then((res) => {
      generateMemberId(res.memberId);
    }).catch((err) => {
      console.log("Something went wrong, Try again later");
    })
  }

  const generateMemberId = (defectId) => {
    let Id = parseInt(defectId.substring(1));
    //increasing approval Id by one and setting it into approvalId variable
    setMemberId("M" + (Id + 1));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // console.log(formValues);
  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!values.dob) {
      errors.dob = "Dob is required!";
    }
    if (!values.mailId) {
      errors.mailId = "Mail Id is required!";
    }
    // else if (!regex.test(values.email)) {
    //   errors.mailId = "This is not a valid email format!";
    // }
    if (!values.role) {
      errors.role = "Role is required!";
    }
    if (!values.scrumTeamId && formValues.role !== "Admin") {
      errors.scrumTeamId = "Scrum Team is required!";
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
      "firstName": formValues.firstName,
      "lastName": formValues.lastName,
      "mailId": formValues.mailId,
      "role": formValues.role,
      "dob": formValues.dob
    }
    AddNewMember(reqData).then((res) => {
      setIsToastOpen(true);
      loadLastMemberId();
      // setFormValues({...formValues,defectDescription: "", releaseVersion: "", assignedToScrumTeam: "", additionalComment: ""});
      setFormValues(initialValues);
      document.getElementById("submitButton").innerHTML = "Add";
    }).catch((err) => {
      console.log(err);
    })

    var teamData = {
      "memberId": memberId,
      "scrumTeamId": formValues.scrumTeamId
    }
    AddTeamAndMember(teamData).then((res) => {

    }).catch((err) => {
      console.log("Some Thing went wrong, please try again later.");
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
                    message={"Member Added Successfully"}
                  />
                </div> : null
            }
            <div className='px-8 mt-4 w-full h-auto flex flex-row mr-6'>

              {/* First Column */}
              <div className='h-full w-1/2 space-y-5'>
                {/* Member Id Field */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="defectId"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Member Id<span className='text-red-600 text-base'>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="defectId"
                    id="defectId"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={memberId}
                    readOnly
                  />
                </div>

                {/* First Name Field */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      First Name<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-600 text-sm mb-2 ml-2'>{formErrors.firstName}</span>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="First Name"
                    value={formValues.firstName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* Role Filed */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Role<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.role}</span>
                  </div>
                  <select
                    name="role"
                    id="role"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formValues.role}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="">Choose a Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                    <option value="QA">QA</option>
                  </select>
                </div>

                {/* dob Field */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="dob"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Date of Birth<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-600 text-sm mb-2 ml-2'>{formErrors.dob}</span>
                  </div>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Date of Birth"
                    value={formValues.dob}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* Claim Submit Button */}
                <div>
                  <button type="button" className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none 
                                font-medium rounded-full text-base px-4 py-1.5 text-center mr-2 mb-2"
                    onClick={onSubmit}
                    id="submitButton"
                  >
                    Add
                  </button>
                  <Link type="button" className="text-white bg-red-500 hover:bg-red-700 focus:outline-none 
                                                font-medium rounded-full text-base px-4 py-1.5 text-center ml-1 mb-2"
                    id="cancelButton"
                    to="/home"
                  >
                    Cancel
                  </Link>
                </div>

              </div>

              {/* Second Column */}
              <div className='h-full w-1/2 ml-6 space-y-5'>

                {/* Mail Id Field */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="mailId"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Mail Id<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-600 text-sm mb-2 ml-2'>{formErrors.mailId}</span>
                  </div>
                  <input
                    type="mail"
                    name="mailId"
                    id="mailId"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Mail Id"
                    value={formValues.mailId}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* Last Name Field */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Last Name<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.lastName}</span>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Last Name"
                    value={formValues.lastName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                {/* Scrum Team Field */}
                <div>
                  <div className='flex flex-row items-center'>
                    <label
                      htmlFor="scrumTeamId"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Scrum Team<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-600 text-sm  mb-2 ml-2'>{formErrors.scrumTeamId}</span>
                  </div>
                  <select
                    name="scrumTeamId"
                    id="scrumTeamId"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formValues.scrumTeamId}
                    onChange={(e) => handleChange(e)}
                    disabled={formValues.role === "Admin" ? true : false}
                    required
                  >
                    <option value="">Choose Scrum Team</option>
                    {
                      allScrumTeam.map((data, index) => {
                        return <option value={data.teamId} key={index}>{data.teamName} ({data.teamType})</option>
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

export default AddMember;