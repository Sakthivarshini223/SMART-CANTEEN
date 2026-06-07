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
// ... (imports remain the same)

function App() {
  return (
    <CartProvider>
      <Router>
        <CssBaseline />
        <Routes>
          {/* 1. Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* 2. Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordFlow /></AuthLayout>} />
          
          {/* 3. Main User Dashboard */}
          <Route path="/food-list" element={<FoodListPage />} />
          
          {/* 4. FIXED: Changed "/menu/:type" to "/category/:type" to match your navigation */}
          <Route path="/category/:type" element={<CategoryPage />} />
          
          {/* 5. Cart, Checkout, and Tracking */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/notifications" element={<NotificationPage />} />

          {/* 6. ADMIN DASHBOARD FLOW */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="manage-menu" element={<ManageMenu />} />
            <Route path="orders" element={<ViewOrders />} />
          </Route>

          {/* 7. Fallback - This was catching the wrong "/category" path and sending you here */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

