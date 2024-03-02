import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [userFormData, setUserFormData] = useState({
        name: "",
        phone: "",
        email: "",
        gender: "",
        age: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleInputs = (e) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    }

    const handleUserSignUp = async (e) => {
        try {
            e.preventDefault();

            const response = await fetch(`http://localhost:8000/api/v2/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userFormData)
            });

            const data = await response.json();

            if (response.ok) {
                // Signup successful
                message.success(data.message);
                navigate('/profile');
            } else {
                // Signup failed
                message.error(data.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    return (
        <div className='d-flex justify-content-center py-2 px-2 mb-4 mb-md-5'>
            {/* Signup form */}
            <form className='col-12 col-md-8 col-lg-6 col-xl-4 shadow border rounded px-2 py-2 p-md-5' onSubmit={handleUserSignUp}>
                {/* Form fields */}
                <input type="text" className='form-control mb-3' onChange={handleInputs} name="name" placeholder='Enter Name' />
                <input type="email" className='form-control mb-3' onChange={handleInputs} name="email" placeholder='Enter Email' />
                <input type="tel" className='form-control mb-3' onChange={handleInputs} name="phone" placeholder='Enter Phone' />
                <input type="number" className='form-control mb-3' onChange={handleInputs} name="age" placeholder='Enter Age' />

                <div className="row mb-3">
                    <div className="row ms-1 mt-1">
                        <label className="m-1 radio-label-container text-muted" htmlFor="gender-male">Male
                            <input type="radio" onChange={handleInputs} className="m-2" id="gender-male" name="gender" value="male" />
                            <span className="check-mark-span"></span>
                        </label>
                    </div>
                    <div className="row ms-1 mt-1">
                        <label className="m-1 radio-label-container text-muted" htmlFor="gender-female">Female
                            <input type="radio" onChange={handleInputs} className="m-2" id="gender-female" name="gender" value="female" />
                            <span className="check-mark-span"></span>
                        </label>
                    </div>
                    <div className="row ms-1 mt-1">
                        <label className="m-1 radio-label-container text-muted">Other
                            <input type="radio" onChange={handleInputs} className="m-2" id="gender-other" name="gender" value="other" />
                            <span className="check-mark-span"></span>
                        </label>
                    </div>
                </div>

                <input type="password" className='form-control mb-3' onChange={handleInputs} name="password" placeholder='Enter Password' value={userFormData.password} />
                <input type="password" className='form-control mb-3' onChange={handleInputs} name="confirmPassword" placeholder='Enter Confirm Password' value={userFormData.confirmPassword} />

                <button className='btn btn-primary w-100' type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
