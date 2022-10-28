import React from 'react'
import { useState } from 'react';
import { RegistrationApi } from '../../../apis/auth';
import { notify } from '../../../component/Notify';

const Registration = ({ setIsLoginOpen }) => {

    const [registrationData, setRegistrationData] = useState({ memberName: "", password: "", memberRole: "" });

    const onChangeHandler = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
    }

    const registrationHandler = () => {
        if (registrationData.memberName !== "" && registrationData.password !== "" && registrationData.memberRole !== "") {
            RegistrationApi(registrationData).then((res) => {
                notify("LOGIN_SUCCESS", "Registration Successfull");
                setRegistrationData({ memberName: "", password: "", memberRole: "" });
                setIsLoginOpen(true);
            }).catch((err) => {
                console.log(err);
            })
        }else{
            notify("LOGIN_ERROR", "All fileds are required");
        }
    }

    return (
        <div className="space-y-2">
            <h3 className="text-xl text-center font-medium text-white">Registration</h3>
            <div>
                <label
                    htmlFor="memberName"
                    className="block mb-2 text-sm font-medium text-gray-300"
                >
                    Member Name
                </label>
                <input
                    type="text"
                    name="memberName"
                    id="memberName"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Member Name"
                    value={registrationData.memberName}
                    onChange={(e) => onChangeHandler(e)}
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="memberRole"
                    className="block mb-2 text-sm font-medium text-gray-300"
                >
                    Member Role
                </label>
                <select
                    id='memberRole'
                    name='memberRole'
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={registrationData.role}
                    onChange={(e) => onChangeHandler(e)}
                >
                    <option value="">Choose a role</option>
                    <option value="Developer">Developer</option>
                    <option value="RM">RM</option>
                    <option value="QA">Quality Analyst</option>
                </select>
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-300"
                >
                    Your password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={registrationData.password}
                    onChange={(e) => onChangeHandler(e)}
                    required
                />
            </div>


            <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center"
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