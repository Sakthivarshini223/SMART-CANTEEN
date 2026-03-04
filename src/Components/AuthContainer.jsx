import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, CssBaseline } from '@mui/material';

const AuthContainer = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f4f6f8', // Light background for contrast
        p: 2 // Padding for small screens
      }}
    >
      <CssBaseline />
      <Container maxWidth="xs" disableGutters>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 4 }, // Responsive padding
            borderRadius: 3,
            width: '100%'
          }}
        >
          {/* This is the magic spot where Login, Register, or ForgotPassword render */}
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthContainer;