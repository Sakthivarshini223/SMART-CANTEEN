import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, Container, Paper } from '@mui/material';

// Import Context Provider
import { CartProvider } from './Components/CartContext';

// Import your components
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ForgotPasswordFlow from './Components/ForgotPasswordFlow';
import FoodListPage from './Components/FoodListPage';
import CategoryPage from './Components/CategoryPage'; 
import CartPage from './Components/CartPage';
import PaymentPage from './Components/PaymentPage';
import NotificationPage from './Components/NotificationPage';

// A Layout wrapper to keep Auth pages centered and small
const AuthLayout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f0f2f5' 
  }}>
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        {children}
      </Paper>
    </Container>
  </Box>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <CssBaseline />
        <Routes>
          {/* 1. Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* 2. Authentication Routes */}
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordFlow /></AuthLayout>} />
          
          {/* 3. Main Dashboard (Popular Items) */}
          <Route path="/food-list" element={<FoodListPage />} />
          
          {/* 4. The Category Menus 
              CRITICAL: This path "/menu/:type" must match the navigate() call in FoodListPage */}
          <Route path="/menu/:type" element={<CategoryPage />} />
          
          {/* 5. Cart, Checkout, and Tracking */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/notifications" element={<NotificationPage />} />

          {/* 6. Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;