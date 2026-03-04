import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, Container, Paper } from '@mui/material';

// Import Context Provider
import { CartProvider } from './Components/CartContext';

// --- EXISTING USER COMPONENTS ---
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ForgotPasswordFlow from './Components/ForgotPasswordFlow';
import FoodListPage from './Components/FoodListPage';
import CategoryPage from './Components/CategoryPage'; 
import CartPage from './Components/CartPage';
import PaymentPage from './Components/PaymentPage';
import NotificationPage from './Components/NotificationPage';

// --- NEW ADMIN COMPONENTS ---
import AdminLayout from './Components/AdminLayout';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageMenu from './Components/Admin/ManageMenu';
import ViewOrders from './Components/Admin/ViewOrders';

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
          
          {/* 3. Main User Dashboard (Popular Items) */}
          <Route path="/food-list" element={<FoodListPage />} />
          
          {/* 4. The Category Menus */}
          <Route path="/menu/:type" element={<CategoryPage />} />
          
          {/* 5. Cart, Checkout, and Tracking */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/notifications" element={<NotificationPage />} />

          {/* 6. ADMIN DASHBOARD FLOW */}
          {/* This uses a nested route structure to keep the AdminLayout sidebar visible */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} /> {/* Admin Dashboard (Page 7) */}
            <Route path="manage-menu" element={<ManageMenu />} /> {/* Manage Menu Page (Page 5) */}
            <Route path="orders" element={<ViewOrders />} /> {/* View Orders Page (Page 9) */}
          </Route>

          {/* 7. Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;