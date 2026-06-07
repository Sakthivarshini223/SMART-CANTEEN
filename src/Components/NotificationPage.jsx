import React, { useMemo } from "react";
import { Container, Typography, Paper, Box, Stack, Chip, Divider, IconButton, AppBar, Toolbar, Zoom } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const NotificationPage = () => {
  const { orders } = useCart(); 
  const navigate = useNavigate();

  // 1. Get the current logged-in user's ID
  const currentUserId = localStorage.getItem('userId');

  // 2. Filter orders to show ONLY the logged-in user's orders
  const myOrders = useMemo(() => {
    return orders.filter(order => String(order.user_id) === String(currentUserId));
  }, [orders, currentUserId]);

  return (
    <Box sx={{ bgcolor: "#fbfbfb", minHeight: "100vh" }}>
      <AppBar position="sticky" sx={{ bgcolor: '#263238' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/food-list')}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, fontWeight: 700 }}>Order Tracking</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* 3. Handle Empty State */}
        {myOrders.length === 0 ? (
          <Stack alignItems="center" sx={{ mt: 10, opacity: 0.6 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6">No orders found</Typography>
            <Typography variant="body2">Your order status will appear here</Typography>
          </Stack>
        ) : (
          <Stack spacing={2}>
            {myOrders.map((order) => (
              <Zoom in={true} key={order.id}>
                <Paper sx={{ p: 3, borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '1px solid #eee' }}>
                  <Box sx={{ 
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, 
                    bgcolor: order.status === 'Ready' ? '#2e7d32' : '#ed6c02' 
                  }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold">ORDER ID</Typography>
                        <Typography variant="h6" fontWeight="900">#{order.id}</Typography>
                    </Box>
                    <Chip 
                      label={order.status.toUpperCase()} 
                      color={order.status === 'Ready' ? "success" : "warning"}
                      icon={order.status === 'Ready' ? <CheckCircleIcon /> : <AccessTimeFilledIcon />}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Stack>
                  <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">Total Paid:</Typography>
                    <Typography variant="body1" fontWeight="bold">₹{order.total_price}</Typography>
                  </Stack>
                </Paper>
              </Zoom>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default NotificationPage;