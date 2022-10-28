import React, { useState } from 'react'
import { LoginApi } from '../../../apis/auth';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../component/Notify';
import Registration from './Registration';


const Login = () => {
    const navigate = useNavigate();
    const [memberId, setMemberId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(true);

    const onSubmit = async () => {
        document.getElementById("submitButton").innerHTML = "Please Wait...";
        const data = {
            "memberId": memberId,
            "password": password
        }
        LoginApi(data).then(res => {
            if (res.status === 200 && res.data.jwtAuthToken !== undefined) {
                localStorage.setItem('mid', res.data.mid);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('token', res.data.jwtAuthToken);
                notify("LOGIN_SUCCESS", "You have successfully loggedin");
                navigate("/home");
            } else {
                notify("LOGIN_ERROR", "Invalid Token");
            }
            setMemberId("");
            setPassword("");
        }).catch((error) => {
            notify("LOGIN_ERROR", "Login Failed");
            document.getElementById("submitButton").innerHTML = "Login";
        });
    }

    return (
        <section className='h-screen flex justify-center items-center'>
            {/*This is container div*/}
            <div className="container-div w-2/5 h-3/4 flex flex-row box-border rounded-xl shadow-2xl">
                {/* This is image div */}
                {/* <div className="w-1/2 h-full p-4">
                    <img
                        src="assets/claim.jpg"
                        alt="broken pic"
                        className="w-full h-full"
                    />
                </div> */}

                {/* This is form div */}
                <div className="bg-teal-500 h-full w-full rounded-xl px-16 py-6">
                    {
                        isLoginOpen ? (
                            <div className="space-y-2">
                                <h3 className="text-xl text-center font-medium text-white">LogIn</h3>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-300"
                                    >
                                        Member Id
                                    </label>
                                    <input
                                        type="text"
                                        name="memberId"
                                        id="memberId"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm outline-none
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Member Id"
                                        required
                                        value={memberId}
                                        onChange={(e) => setMemberId(e.target.value)}
                                    />
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
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>


                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center"
                                    onClick={onSubmit}
                                    id="submitButton"
                                >
                                    Login
                                </button>

                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Don't have account?{" "}
                                    <span
                                        onClick={()=> setIsLoginOpen(false)}
                                        className="text-blue-700 hover:underline cursor-pointer"
                                    >
                                        Create account
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Registration setIsLoginOpen={setIsLoginOpen} />
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Login;