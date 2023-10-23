import React, { useEffect, useState } from 'react'
import { LoginApi } from '../../../apis/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastAlert } from '../../../component/Toast';
import ForgotPassword from './ForgotPassword';



const Login = () => {
    const navigate = useNavigate();
    const initialValues = { memberId: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [isTooltipShown, setIsTooltipShown] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[M0-9%*#]*$/;
        if (!values.memberId) {
            errors.memberId = "MemberId is required!";
        } else if (!regex.test(values.memberId)) {
            errors.memberId = "Not a valid MemberId";
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

    const onSubmit = async () => {
        if (!handleSubmit()) {
            return;
        }
        document.getElementById("submitButton").innerHTML = "Please Wait...";
        const data = {
            "memberId": formValues.memberId,
            "password": formValues.password
        }

        LoginApi(data).then(res => {
            // console.log(res);
            if (res.status === 200 && res.data.jwtAuthToken !== undefined) {
                localStorage.setItem('mid', res.data.mid);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('lastName', res.data.lastName);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('token', res.data.jwtAuthToken);
                navigate("/home");
            } else {
                console.log("Error is Occuring");
            }
        }).catch((error) => {
            setIsToastOpen(true);
            document.getElementById("submitButton").innerHTML = "Login";
        });

    }

    return (
        <>
            <section className='bg-[#1A2238] overflow-hidden h-screen flex justify-center items-center'>
                {/*This is container div*/}
                <div className="container-div w-full h-full mt-14 box-border">
                    {/* This is image div */}
                    {/* <div className="w-3/5 h-full p-4">
                        <div className='ml-24 mt-36'>
                            <p className='text-3xl text-white font-semibold'>Welcome to Approval Tracking System</p>
                        </div>
                    </div> */}

                    {/* This is form div */}

                    <div className="h-full w-full pt-14">
                        <h3 className="text-3xl text-center font-medium text-white mb-6">Welcome to Approval Tracking System</h3>
                        <h3 className="text-lg text-center font-medium text-white">LogIn to Approval System</h3>
                        <div className='bg-teal-500 w-1/4 h-auto ml-auto mr-auto mt-4 px-9 pt-4 pb-6 rounded-lg'>
                            <div className="space-y-2 pt-2 pb-8">
                                {/* <h3 className="text-lg text-center font-medium text-white">LogIn to approval System</h3> */}
                                {
                                    isToastOpen ?
                                        <ToastAlert
                                            setIsToastOpen={setIsToastOpen}
                                            message={"Invalid MemberId or Password"}
                                        /> : null
                                }
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <label
                                            htmlFor="username"
                                            className="relative flex mb-2 text-sm font-medium text-gray-300"
                                        >
                                            Member Id<span className='text-red-600 text-base'>*</span>
                                            {/* <button className='text-gray-800 ml-1' onClick={ ()=> setIsTooltipShown(true) }>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                        </svg>
                                                    </button>
                                                    {
                                                        isTooltipShown ?
                                                            <div className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 dark:bg-gray-700">
                                                                Tooltip content
                                                            </div> : null
                                                    } */}
                                        </label>
                                        <span className='text-red-700 text-sm mb-2 ml-2'>{formErrors.memberId}</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="memberId"
                                        id="memberId"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                                        placeholder="Member Id"
                                        required
                                        value={formValues.memberId}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div>
                                    <div className='flex flex-row items-center'>
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
                                        required
                                        value={formValues.password}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>


                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                                            text-sm px-5 py-1.5 mt-1 text-center"
                                    onClick={onSubmit}
                                    id="submitButton"
                                >
                                    Login
                                </button>

                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Forgot / Reset Password?{" "}
                                    {/* <span
                                        className="text-blue-700 hover:underline cursor-pointer"
                                    >
                                        Click here
                                    </span> */}
                                    <Link 
                                        className="text-blue-700 hover:underline cursor-pointer"
                                        to="/forgotpassword" 
                                        target="_blank"
                                    >
                                        Click here
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;