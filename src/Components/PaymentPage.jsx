import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import { useCart } from './CartContext';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart, fetchOrders } = useCart(); // Added cart to access item IDs
  const [loading, setLoading] = useState(false);

  const { total } = location.state || { total: 0 };

 const confirmOrder = async () => {
  // Get the real ID from the session you saved during login
  const loggedInUserId = localStorage.getItem('userId'); 

  try {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: loggedInUserId, // Use the dynamic ID here!
        total_price: total,
        status: 'Pending',
        items: cart.map(item => item.id) 
      }),
    });

    if (response.ok) {
      clearCart(); 
      await fetchOrders(); 
      navigate('/notifications'); 
    }
  } catch (error) {
    console.error("Order failed:", error);
    setLoading(false);
  }
};
  const handlePayNow = () => {
    setLoading(true);
    // This is now correctly defined above and can be called
    setTimeout(() => {
      confirmOrder(); 
    }, 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Paper sx={{ p: 6, borderRadius: '32px', textAlign: 'center', maxWidth: 400, width: '90%' }}>
        <Typography variant="h5" fontWeight="600" mb={2}>Completing UPI Payment</Typography>
        
        <Typography variant="h2" fontWeight="900" color="#E65100" mb={4}>
          ₹{total}
        </Typography>

        <Button 
          variant="contained" 
          fullWidth 
          onClick={handlePayNow}
          disabled={loading}
          sx={{ 
            bgcolor: loading ? '#ccc' : '#E65100', 
            py: 2, borderRadius: '15px',
            '&:hover': { bgcolor: '#BF360C' }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentPage;