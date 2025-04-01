import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import {toast} from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    role: 'user' 
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData);
      if (response.data.Valid) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('role', response.data.role); 
        localStorage.setItem('username', response.data.user.username); 
        localStorage.setItem('userId', response.data.user._id); 
        alert('SignUp Successful')
        navigate('/home');
      } else {
        setErrorMessage('SignUp Unsuccessful');
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={signupHandler}>
        <div className='inputs'>
          <div className='input'>
            <img src={email_icon} alt="Email Icon" />
            <input 
              type='email' 
              placeholder='Email Id' 
              name='email' 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input'>
            <img src={password_icon} alt="Password Icon" />
            <input 
              type='password' 
              placeholder='Password' 
              name='password' 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input'>
            <img src={user_icon} alt="User Icon" />
            <input 
              type='text' 
              placeholder='User Name' 
              name='username' 
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input'>
            <img src={user_icon} alt="Mobile Number Icon" />
            <input 
              type='text' 
              placeholder='Mobile Number' 
              name='mobileNumber' 
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="forgot-password">
          Already a user? <Link to='/login' className='clickhere'>Click Here to Login</Link>
        </div>
        <div className="submit-container">
          <button type='submit' className='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export {Signup};
