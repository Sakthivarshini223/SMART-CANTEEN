import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stack, Typography, TextField, Button, InputAdornment, 
  IconButton, CircularProgress, Link, Box, Fade, Zoom 
} from '@mui/material';
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined } from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();

  // Theme Constants (matching your advanced UI)
  const primaryColor = "#E65100";
  const charcoal = "#263238";

  // State
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/food-list'); 
    } catch (err) {
      setError('invalid credentials');
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
            sx={{ 
              fontWeight: '900', 
              color: charcoal, 
              letterSpacing: -1,
              mb: 0.5 
            }}
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
          sx={{ 
            width: '100%',
            maxWidth: 400,
            mx: 'auto'
          }}
        >
          {/* Email Field */}
          <TextField
            label="email address"
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
              },
              '& .MuiInputLabel-root': { textTransform: 'lowercase' }
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
              },
              '& .MuiInputLabel-root': { textTransform: 'lowercase' }
            }}
          />

          {/* Login Button */}
          <Button 
            type="submit"
            variant="contained" 
            fullWidth 
            disabled={loading}
            sx={{ 
              py: 2, 
              fontWeight: '800', 
              borderRadius: '18px',
              bgcolor: primaryColor,
              boxShadow: `0 8px 20px ${primaryColor}44`,
              fontSize: '1rem',
              textTransform: 'lowercase',
              '&:hover': { bgcolor: '#bf360c', boxShadow: 'none' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'sign in'}
          </Button>
          
          {/* Navigation Links */}
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
            spacing={1}
            sx={{ mt: 1 }}
          >
            <Link 
              component="button" 
              type="button"
              variant="body2" 
              underline="none"
              onClick={() => navigate('/forgot-password')}
              sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'lowercase' }}
            >
              forgot password?
            </Link>
            
            <Link 
              component="button" 
              type="button"
              variant="body2" 
              underline="none"
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