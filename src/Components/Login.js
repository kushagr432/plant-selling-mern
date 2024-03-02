import { message } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Login() {
    document.title = "Login";

    const { setShowAnimation, setUser } = useContext(UserContext);
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleUserLogin = async (e) => {
        e.preventDefault();

        try {
            if (userFormData.email === "" || userFormData.password === "") {
                message.error("Please enter your credentials.");
                return;
            }

            setShowAnimation({ type: "ANIMATION", showAnimation: true });

            const res = await fetch('https://plant-backend-dusky.vercel.app/api/v2/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'no-cors',
                body: JSON.stringify(userFormData)
            });

            const result = await res.json();

            if (result.status) {
                // Store token in localStorage
                localStorage.setItem('token', result.token);
                
                // Update user context
                setUser({ type: "USER", user: result.result });

                message.success(result.message);

                // Redirect to profile page
                navigate("/profile");
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            message.error('An error occurred while logging in. Please try again later.');
        } finally {
            setShowAnimation({ type: "ANIMATION", showAnimation: false });
        }
    };

    const handleInputs = (e) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    return (
        <div className='d-flex justify-content-center py-2 px-2 mb-4 mb-md-5'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-4 shadow border rounded px-2 py-2 p-md-5'>
                <div className="d-flex flex-column flex-md-row justify-content-center">
                    <div className='col-12 col-md-6 text-center p-0 mb-2 mb-md-0 me-md-2 bg-primary rounded'>
                        <Link to={"/login"} className='btn text-light w-100'>Login</Link>
                    </div>
                    <div className='col-12 col-md-6 text-center p-0 ms-md-2 bg-secondary rounded'>
                        <Link to={"/signup"} className='btn text-light w-100'>Signup</Link>
                    </div>
                </div>
                <div className="row p-3">
                    <p className="text-center m-0 ">Connect With Social Account: </p>
                </div>
                <div className="row p-3">
                    <p className="text-center login-social-link m-0">
                        <i className="fab fa-facebook-f ms-4 cursor-pointer"></i>
                        <i className="fab fa-google ms-4"></i>
                        <i className="fab fa-twitter ms-4"></i>
                        <i className="fab fa-github ms-4"></i>
                    </p>
                </div>
                <div className="row">
                    <p className="text-center">Or:</p>
                </div>

                <form onSubmit={handleUserLogin}>
                    <div className="d-flex justify-content-center">
                        <div className="col-12">
                            <input type="email" onChange={handleInputs} className='form-control mb-3' name="email" id="email" placeholder='Enter Email' />
                            <input type="password" onChange={handleInputs} className='form-control mb-2' name="password" id="password" placeholder='Enter Password' value={userFormData.password} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end p-2">
                        <p className="m-0">
                            <Link to={"/user/forgot-password"}>Forgot Password?</Link>
                        </p>
                    </div>
                    <div className="justify-content-center mt-2">
                        <div className="col-12">
                            <button className='btn btn-primary w-100' type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
