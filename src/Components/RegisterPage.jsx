import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, Button, Typography, Link, Stack, 
  CircularProgress, Box, Fade, Zoom, InputAdornment 
} from '@mui/material';
import { 
  PersonOutline, EmailOutlined, LockOutlined, 
  AppRegistrationOutlined 
} from '@mui/icons-material';

const RegisterPage = () => {
  const navigate = useNavigate();

  // Theme Constants
  const primaryColor = "#E65100";
  const charcoal = "#263238";

  // State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "email is invalid";
    if (formData.password.length < 6) tempErrors.password = "password too short";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "passwords do not match";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login');
    } catch (err) {
      setErrors({ server: "registration failed. try again later." });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    '& .MuiFilledInput-root': { 
      borderRadius: '16px', 
      bgcolor: '#f5f5f5',
      transition: '0.3s',
      border: '1px solid transparent',
      '&:hover': { bgcolor: '#eeeeee' },
      '&.Mui-focused': { bgcolor: '#fff', border: `1px solid ${primaryColor}` }
    },
    '& .MuiInputLabel-root': { textTransform: 'lowercase' },
    '& .MuiFormHelperText-root': { textTransform: 'lowercase' }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Brand Header */}
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <AppRegistrationOutlined sx={{ fontSize: 40, color: primaryColor, mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: '900', color: charcoal, letterSpacing: -1 }}>
            smartCanteen
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            create your account
          </Typography>
        </Box>
      </Fade>

      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Stack 
          spacing={2.5} 
          component="form" 
          onSubmit={handleRegister}
          sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}
        >
          {errors.server && (
            <Typography color="error" variant="caption" align="center" sx={{ display: 'block', textTransform: 'lowercase' }}>
              {errors.server}
            </Typography>
          )}

          <TextField 
            label="full name" 
            name="name"
            fullWidth 
            variant="filled"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{ 
              disableUnderline: true,
              startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: primaryColor, fontSize: 20 }} /></InputAdornment>
            }}
            sx={inputStyle}
          />
          
          <TextField 
            label="email address" 
            name="email"
            fullWidth 
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{ 
              disableUnderline: true,
              startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: primaryColor, fontSize: 20 }} /></InputAdornment>
            }}
            sx={inputStyle}
          />
          
          <TextField 
            label="password" 
            name="password"
            type="password" 
            fullWidth 
            variant="filled"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{ 
              disableUnderline: true,
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: primaryColor, fontSize: 20 }} /></InputAdornment>
            }}
            sx={inputStyle}
          />
          
          <TextField 
            label="confirm password" 
            name="confirmPassword"
            type="password" 
            fullWidth 
            variant="filled"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{ 
              disableUnderline: true,
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: primaryColor, fontSize: 20 }} /></InputAdornment>
            }}
            sx={inputStyle}
          />

          <Button 
            variant="contained" 
            fullWidth 
            type="submit"
            disabled={loading}
            sx={{ 
              mt: 2, 
              py: 2, 
              fontWeight: '800', 
              borderRadius: '18px',
              bgcolor: primaryColor,
              textTransform: 'lowercase',
              boxShadow: `0 8px 20px ${primaryColor}44`,
              '&:hover': { bgcolor: '#bf360c', boxShadow: 'none' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'create account'}
          </Button>

          <Link 
            component="button" 
            type="button"
            variant="body2" 
            underline="none"
            onClick={() => navigate('/login')}
            sx={{ textAlign: 'center', mt: 1, color: 'text.secondary', fontWeight: 600, textTransform: 'lowercase' }}
          >
            already have an account? <span style={{ color: primaryColor, fontWeight: 800 }}>login</span>
          </Link>
        </Stack>
      </Zoom>
    </Box>
  );
};

export default RegisterPage;