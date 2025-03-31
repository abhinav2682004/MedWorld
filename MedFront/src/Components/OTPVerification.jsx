import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const location=useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email=location.state?.email;
      console.log('Email received is ',email);
      const response = await axios.post('http://localhost:5632/login/verifyOTP', { email:email, otp });
      if(response.data.message==='OTP has expired') {
        alert('Sorry Your OTP has Expired, Please try again..');  
        navigate('/forgotpass');
      }
      console.log("error please");
      setMessage('OTP verified successfully.');
      setError('');
      navigate('/resetpassword',{state:{email}});
      // onVerified();
    } catch (e) {
      console.log(e);
      setError('Invalid OTP');
      
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="p-8 bg-white rounded-lg shadow-md mt-16">
        <Typography variant="h4" component="h1" className="mb-8 text-center">
          Verify OTP
        </Typography>
        {message && <Alert severity="success" className="mb-4">{message}</Alert>}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Verify OTP
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default OtpVerification;
