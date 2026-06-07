import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stack, Typography, TextField, Button, InputAdornment, 
  IconButton, CircularProgress, Link, Box, Zoom, Tab, Tabs 
} from '@mui/material';
import { 
  Visibility, VisibilityOff, EmailOutlined, LockOutlined, 
  AdminPanelSettingsOutlined, PersonOutline 
} from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();
  const primaryColor = "#E65100";
  const charcoal = "#263238";

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('user');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'invalid credentials');
      }

      if (loginType === 'admin' && data.user.role !== 'ADMIN') {
        throw new Error('access denied: this is not an admin account');
      }
      if (loginType === 'user' && data.user.role === 'ADMIN') {
          throw new Error('please use the admin tab to login');
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userId', data.user.id);

      if (data.user.role === 'ADMIN') {
        navigate('/admin'); 
      } else {
        navigate('/food-list'); 
      }
    } catch (err) {
      setError(err.message.toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fdfdfd' }}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Stack spacing={3} component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 4 }}>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: '900', color: charcoal, letterSpacing: -1, mb: 0.5 }}>
              smartCanteen
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              please login to continue
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
            <Tabs 
              value={loginType} 
              onChange={(e, newValue) => setLoginType(newValue)} 
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: primaryColor } }}
            >
              <Tab value="user" label="User" icon={<PersonOutline fontSize="small" />} iconPosition="start" />
              <Tab value="admin" label="Admin" icon={<AdminPanelSettingsOutlined fontSize="small" />} iconPosition="start" />
            </Tabs>
          </Box>

          <TextField
            label={loginType === 'admin' ? "admin email" : "email address"}
            name="email" type="email" fullWidth required variant="filled"
            autoComplete="email"
            value={formData.email} onChange={handleChange} error={!!error}
            InputProps={{
              disableUnderline: true,
              startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: error ? 'error.main' : primaryColor, fontSize: 20 }} /></InputAdornment>,
            }}
            sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
          />

          <TextField
            label="password" name="password" type={showPassword ? 'text' : 'password'}
            fullWidth required variant="filled"
            autoComplete="current-password"
            value={formData.password} onChange={handleChange} error={!!error}
            helperText={error && <Typography variant="caption" color="error">{error}</Typography>}
            InputProps={{
              disableUnderline: true,
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: error ? 'error.main' : primaryColor, fontSize: 20 }} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ mr: 0.5 }}>
                    {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
          />

          <Button type="submit" variant="contained" fullWidth disabled={loading}
            sx={{ py: 2, fontWeight: '800', borderRadius: '18px', bgcolor: primaryColor, fontSize: '1rem', textTransform: 'lowercase' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : `sign in as ${loginType}`}
          </Button>
          
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Link component="button" type="button" variant="body2" underline="none" onClick={() => navigate('/forgot-password')} sx={{ color: 'text.secondary', fontWeight: 600 }}>
              forgot password?
            </Link>
            <Link component="button" type="button" variant="body2" underline="none" onClick={() => navigate('/register')} sx={{ color: primaryColor, fontWeight: 800 }}>
              new user? register
            </Link>
          </Stack>
        </Stack>
      </Zoom>
    </Box>
  );
};
export default LoginPage;