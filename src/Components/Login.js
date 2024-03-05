import { message } from 'antd';
import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://plant-backend-dusky.vercel.app/api/v2/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        message.success(data.message);
        // Perform any additional actions, such as redirecting the user
      } else {
        // Login failed
        message.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
