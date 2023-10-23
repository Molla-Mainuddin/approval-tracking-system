import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { RegistrationApi, ScrumTeamApi } from '../../../apis/auth';
import { notify } from '../../../component/Notify';
import { ToastSuccess } from '../../../component/Toast';

const Registration = ({ setIsLoginOpen }) => {

    const initialValues = { fullName: "", role: "", scrumTeam: "", dob: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [scrumTeams, setScrumTeams] = useState([]);

    useEffect(() => {
        ScrumTeamApi().then((res) => {
            setScrumTeams(res.data);
        }).catch((err) => {
            console.log("Error is Occuring....");
        })
    }, [])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const validate = (values) => {
        const errors = {};
        if (!values.fullName) {
            errors.fullName = "Full Name is required!";
        }
        if (!values.role) {
            errors.role = "Role is required!";
        }
        if (!values.scrumTeam) {
            errors.scrumTeam = "Scrum Team is required!";
        }
        if (!values.dob) {
            errors.dob = "Date of Birth is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
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

    const registrationHandler = () => {
        if (!handleSubmit()) {
            return;
        }
        RegistrationApi(formValues).then((res) => {
            setFormValues(initialValues);
            // setIsLoginOpen(true);
            setIsToastOpen(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="space-y-1 pb-3">
            <h3 className="text-lg font-semibold text-white">Register to Approval System</h3>
            {
                isToastOpen ?
                    <ToastSuccess
                        setIsToastOpen={setIsToastOpen}
                        message={"Registration Successfull"}
                    /> : null
            }
            {/* For Full Name */}
            <div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-gray-300"
                    >
                        Full Name<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-700 text-sm mb-2 ml-2'>{formErrors.fullName}</span>
                </div>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder="Full Name"
                    value={formValues.fullName}
                    onChange={(e) => onChangeHandler(e)}
                    required
                />
            </div>
            {/* For Role */}
            <div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="role"
                        className="block mb-2 text-sm font-medium text-gray-300"
                    >
                        Role<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-700 text-sm mb-2 ml-2'>{formErrors.role}</span>
                </div>
                <select
                    id='role'
                    name='role'
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    value={formValues.role}
                    onChange={(e) => onChangeHandler(e)}
                >
                    <option value="">Choose a role</option>
                    <option value="Developer">Developer</option>
                    <option value="RM">RM</option>
                    <option value="QA">Quality Analyst</option>
                </select>
            </div>
            {/* For Scrum Team */}
            <div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="scrumTeam"
                        className="block mb-2 text-sm font-medium text-gray-300"
                    >
                        Scrum Team<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-700 text-sm mb-2 ml-2'>{formErrors.scrumTeam}</span>
                </div>
                <select
                    id='scrumTeam'
                    name='scrumTeam'
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    value={formValues.scrumTeam}
                    onChange={(e) => onChangeHandler(e)}
                >
                    <option value="">Choose Your Team</option>
                    {
                        scrumTeams.map((data, index) => {
                            return <option key={index} value={data.teamId}>{data.teamName}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="dob"
                        className="block mb-2 text-sm font-medium text-gray-300"
                    >
                        Date of Birth<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-700 text-sm mb-2 ml-2'>{formErrors.dob}</span>
                </div>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder="Date of Birth"
                    value={formValues.dob}
                    onChange={(e) => onChangeHandler(e)}
                    required
                />
            </div>
            <div>
                <div className='flex fdlex-row items-center'>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-300"
                    >
                        Your password<span className='text-red-600 text-base'>*</span>
                    </label>
                    <span className='text-red-700 text-sm mb-2 ml-2'>{formErrors.password}</span>
                </div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    value={formValues.password}
                    onChange={(e) => onChangeHandler(e)}
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                    text-sm px-5 py-1.5 text-center"
                id="submitButton"
                onClick={registrationHandler}
            >
                Register
            </button>


            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?{" "}
                <span
                    onClick={() => setIsLoginOpen(true)}
                    className="text-blue-700 hover:underline cursor-pointer"
                >
                    Login
                </span>
            </div>
        </div>
    )
}

export default Registration;