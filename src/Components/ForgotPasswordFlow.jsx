import React, { useState, useRef } from 'react';
import { 
  TextField, Button, Typography, Stack, Box, 
  InputAdornment, IconButton, CircularProgress, Fade, Zoom 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LockResetIcon from '@mui/icons-material/LockReset';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState('A'); 
  const [mobileNumber, setMobileNumber] = useState('');
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

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError('please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('passwords do not match');
      return;
    }
    
    // Success - proceed to login
    setError('');
    navigate('/login');
  };

  const handleGetOtp = async () => {
    if (mobileNumber.length !== 10) {
      setError('enter a valid 10-digit number');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setStep('B'); 
    }, 1500);
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

  return (
    <Box sx={{ width: '100%' }}>
      
      {/* STEP A: INITIATION */}
      {step === 'A' && (
        <Fade in={true}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <LockResetIcon sx={{ fontSize: 48, color: primaryColor, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: "900", color: charcoal, textTransform: 'lowercase' }}>
                reset initiation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                enter your registered mobile number
              </Typography>
            </Box>

            <TextField
              label="mobile number"
              fullWidth
              variant="filled"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value.replace(/\D/g, ''));
                if (error) setError('');
              }}
              error={!!error}
              helperText={error}
              InputProps={{ 
                disableUnderline: true,
                startAdornment: <InputAdornment position="start"><PhoneIphoneIcon sx={{ fontSize: 20, color: primaryColor }} /></InputAdornment>
              }}
              sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
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
              <VerifiedUserIcon sx={{ fontSize: 48, color: primaryColor, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: "900", color: charcoal, textTransform: 'lowercase' }}>
                otp verification
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

      {/* STEP C: NEW PASSWORD - VALIDATION ADDED HERE */}
      {step === 'C' && (
        <Fade in={true}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h5" sx={{ fontWeight: "900", color: charcoal, textTransform: 'lowercase' }}>
                create new password
              </Typography>
            </Box>

            <TextField 
              label="new password" 
              type="password" 
              fullWidth 
              variant="filled"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); if(error) setError(''); }}
              error={!!error}
              InputProps={{ disableUnderline: true }}
              sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
            />
            <TextField 
              label="confirm password" 
              type="password" 
              fullWidth 
              variant="filled"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); if(error) setError(''); }}
              error={!!error}
              helperText={error}
              InputProps={{ disableUnderline: true }}
              sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
            />

            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleResetPassword}
              sx={{ 
                py: 2, borderRadius: '18px', fontWeight: '800', bgcolor: primaryColor,
                textTransform: 'lowercase', boxShadow: `0 8px 20px ${primaryColor}44`
              }}
            >
              reset password
            </Button>
          </Stack>
        </Fade>
      )}
    </Box>
  );
};

export default ForgotPasswordFlow;