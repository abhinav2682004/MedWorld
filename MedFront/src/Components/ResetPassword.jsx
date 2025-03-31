import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location=useLocation();
  const email=location.state?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5632/login/reset-password', {
        email,
        newPass:newPassword,
        confirmPass:confirmPassword,
      });
      setMessage('Password has been reset successfully.');
      setError('');
      navigate('/login');
    } catch (e) {
      console.error(e);
      setError('Error in resetting password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="p-8 bg-white rounded-lg shadow-md mt-16">
        <Typography variant="h4" component="h1" className="mb-8 text-center">
          Reset Password
        </Typography>
        {message && <Alert severity="success" className="mb-4">{message}</Alert>}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
