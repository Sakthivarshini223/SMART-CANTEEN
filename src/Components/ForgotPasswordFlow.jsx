import React, { useState, useRef } from 'react';
import { 
  TextField, Button, Typography, Stack, Box, 
  InputAdornment, CircularProgress, Fade 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  EmailOutlined, LockReset, VerifiedUser, LockOutlined 
} from '@mui/icons-material';

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState('A'); 
  const [email, setEmail] = useState(''); // Changed from mobileNumber
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password States
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const primaryColor = "#E65100";
  const charcoal = "#263238";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // --- 1. SEND OTP CALL ---
  const handleGetOtp = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'failed to send otp');
      
      setStep('B'); 
    } catch (err) {
      setError(err.message.toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  // --- 2. RESET PASSWORD CALL ---
 const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('password must be 6+ chars');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          otp: otp.join(''), 
          newPassword: newPassword 
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'reset failed');

      // Alert removed - redirecting directly
      navigate('/login'); 
      
    } catch (err) {
      setError(err.message.toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (val, index) => {
    if (isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    if (val !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const inputStyle = { '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } };

  return (
    <Box sx={{ width: '100%' }}>
      
      {/* STEP A: EMAIL INITIATION */}
      {step === 'A' && (
        <Fade in={true}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <LockReset sx={{ fontSize: 48, color: primaryColor, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: "900", color: charcoal, textTransform: 'lowercase' }}>
                reset initiation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                enter your registered email address
              </Typography>
            </Box>

            <TextField
              label="email address"
              fullWidth variant="filled"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              error={!!error}
              helperText={error}
              InputProps={{ 
                disableUnderline: true,
                startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ fontSize: 20, color: primaryColor }} /></InputAdornment>
              }}
              sx={inputStyle}
            />

            <Button variant="contained" fullWidth disabled={loading} onClick={handleGetOtp}
              sx={{ py: 2, borderRadius: '18px', fontWeight: '800', bgcolor: primaryColor, textTransform: 'lowercase' }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "get otp"}
            </Button>
          </Stack>
        </Fade>
      )}

      {/* STEP B: OTP VERIFICATION */}
      {step === 'B' && (
        <Fade in={true}>
          <Stack spacing={3} alignItems="center">
            <Box textAlign="center">
              <VerifiedUser sx={{ fontSize: 48, color: primaryColor, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: "900", color: charcoal, textTransform: 'lowercase' }}>
                otp verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                sent to {email}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} justifyContent="center">
              {otp.map((digit, idx) => (
                <TextField key={idx} inputRef={(el) => (inputRefs.current[idx] = el)} value={digit} variant="filled"
                  onChange={(e) => handleOtpChange(e.target.value, idx)} onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  InputProps={{ disableUnderline: true }}
                  sx={{ width: { xs: 45, sm: 50 }, '& .MuiFilledInput-root': { borderRadius: '12px', bgcolor: '#f5f5f5' }, '& input': { textAlign: 'center', fontWeight: '900' } }}
                />
              ))}
            </Stack>
            <Button variant="contained" fullWidth onClick={() => { setError(''); setStep('C'); }}
              sx={{ py: 2, borderRadius: '18px', fontWeight: '800', bgcolor: primaryColor, textTransform: 'lowercase' }}>
              verify otp
            </Button>
          </Stack>
        </Fade>
      )}

      {/* STEP C: NEW PASSWORD */}
      {step === 'C' && (
        <Fade in={true}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <LockOutlined sx={{ fontSize: 48, color: primaryColor, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: "900", color: charcoal, textTransform: 'lowercase' }}>
                create new password
              </Typography>
            </Box>

            <TextField 
              label="new password" type="password" fullWidth variant="filled"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); if(error) setError(''); }}
              error={!!error}
              InputProps={{ disableUnderline: true }}
              sx={inputStyle}
            />
            <TextField 
              label="confirm password" type="password" fullWidth variant="filled"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); if(error) setError(''); }}
              error={!!error} helperText={error}
              InputProps={{ disableUnderline: true }}
              sx={inputStyle}
            />

            <Button 
              variant="contained" fullWidth onClick={handleResetPassword} disabled={loading}
              sx={{ 
                py: 2, borderRadius: '18px', fontWeight: '800', bgcolor: primaryColor,
                textTransform: 'lowercase', boxShadow: `0 8px 20px ${primaryColor}44`
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "reset password"}
            </Button>
          </Stack>
        </Fade>
      )}
    </Box>
  );
};

export default ForgotPasswordFlow;