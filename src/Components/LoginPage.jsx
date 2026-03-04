import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stack, Typography, TextField, Button, InputAdornment, 
  IconButton, CircularProgress, Link, Box, Fade, Zoom, Tab, Tabs 
} from '@mui/material';
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined, AdminPanelSettingsOutlined, PersonOutline } from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();

  // Theme Constants
  const primaryColor = "#E65100";
  const charcoal = "#263238";

  // State
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    // 1. Simulate API Call to your Node.js Backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Check if the "Admin" tab was selected
    if (loginType === 'admin') {
      
      // Verification: Check if the email belongs to an Admin in your MySQL DB
      // For now, we mock this by checking if the email contains "admin"
      // if (formData.email.includes('admin')) {
      if(true){
        console.log("Admin Verified. Navigating to Dashboard...");
        navigate('/admin'); // Navigates to Page 7
      } else {
        throw new Error('access denied: this account does not have admin privileges');
      }

    } else {
      // 3. Regular User Path
      console.log("User Verified. Navigating to Food List...");
      navigate('/food-list'); 
    }

  } catch (err) {
    // 4. Handle Errors (Wrong password or unauthorized role)
    setError(err.message || 'invalid email or password');
  } finally {
    setLoading(false);
  }
};

  return (
    <Box sx={{ width: '100%' }}>
      {/* Brand Header */}
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: '900', color: charcoal, letterSpacing: -1, mb: 0.5 }}
          >
            smartCanteen
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            please login to continue
          </Typography>
        </Box>
      </Fade>

      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Stack 
          spacing={3} 
          component="form" 
          onSubmit={handleLogin}
          sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}
        >
          {/* NEW: Role Selector Link/Tabs above input fields */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
            <Tabs 
              value={loginType} 
              onChange={(e, newValue) => setLoginType(newValue)} 
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: primaryColor } }}
            >
              <Tab 
                value="user" 
                label="User" 
                icon={<PersonOutline fontSize="small" />} 
                iconPosition="start"
                sx={{ fontWeight: 700, textTransform: 'none', color: loginType === 'user' ? primaryColor : 'text.secondary' }}
              />
              <Tab 
                value="admin" 
                label="Admin" 
                icon={<AdminPanelSettingsOutlined fontSize="small" />} 
                iconPosition="start"
                sx={{ fontWeight: 700, textTransform: 'none', color: loginType === 'admin' ? primaryColor : 'text.secondary' }}
              />
            </Tabs>
          </Box>

          {/* Email Field */}
          <TextField
            label={loginType === 'admin' ? "admin email" : "email address"}
            name="email"
            type="email"
            fullWidth
            required
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            error={!!error}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: error ? 'error.main' : primaryColor, fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiFilledInput-root': { 
                borderRadius: '16px', 
                bgcolor: '#f5f5f5',
                border: error ? '1px solid #d32f2f' : '1px solid transparent',
                transition: '0.3s',
                '&:hover': { bgcolor: '#eeeeee' },
                '&.Mui-focused': { bgcolor: '#fff', border: `1px solid ${primaryColor}` }
              }
            }}
          />

          {/* Password Field */}
          <TextField
            label="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            variant="filled"
            value={formData.password}
            onChange={handleChange}
            error={!!error}
            helperText={error && <Typography variant="caption" sx={{ textTransform: 'lowercase' }}>{error}</Typography>}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: error ? 'error.main' : primaryColor, fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ mr: 0.5 }}>
                    {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiFilledInput-root': { 
                borderRadius: '16px', 
                bgcolor: '#f5f5f5',
                border: error ? '1px solid #d32f2f' : '1px solid transparent',
                transition: '0.3s',
                '&:hover': { bgcolor: '#eeeeee' },
                '&.Mui-focused': { bgcolor: '#fff', border: `1px solid ${primaryColor}` }
              }
            }}
          />

          {/* Login Button */}
          <Button 
            type="submit"
            variant="contained" 
            fullWidth 
            disabled={loading}
            sx={{ 
              py: 2, fontWeight: '800', borderRadius: '18px',
              bgcolor: primaryColor,
              boxShadow: `0 8px 20px ${primaryColor}44`,
              fontSize: '1rem', textTransform: 'lowercase',
              '&:hover': { bgcolor: '#bf360c', boxShadow: 'none' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : `sign in as ${loginType}`}
          </Button>
          
          {/* Navigation Links */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Link 
              component="button" type="button" variant="body2" underline="none"
              onClick={() => navigate('/forgot-password')}
              sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'lowercase' }}
            >
              forgot password?
            </Link>
            
            <Link 
              component="button" type="button" variant="body2" underline="none"
              onClick={() => navigate('/register')}
              sx={{ color: primaryColor, fontWeight: 800, textTransform: 'lowercase' }}
            >
              new user? register
            </Link>
          </Stack>
        </Stack>
      </Zoom>
    </Box>
  );
};

export default LoginPage;