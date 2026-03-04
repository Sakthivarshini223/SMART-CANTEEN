import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Switch, Chip, Avatar 
} from '@mui/material';


const ViewOrders = () => {
  // 1. Mock Data with a 'status' property
  const [orders, setOrders] = useState([
    { id: '#ORD-101', user: 'John Doe', time: '07:00 PM', token: '1', isReady: false },
    { id: '#ORD-102', user: 'Alice Smith', time: '07:15 PM', token: '2', isReady: true },
    { id: '#ORD-103', user: 'Bob Wilson', time: '07:30 PM', token: '3', isReady: false },
  ]);

  // 2. Logic to toggle status
  const handleToggleStatus = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, isReady: !order.isReady } : order
    ));
    
    // Tip: This is where you would call your Backend API to update the MySQL DB
    // fetch(`http://localhost:5000/api/orders/${orderId}`, { method: 'PATCH', ... })
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Order Management
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Swipe the status switch when an order is prepared and ready for pickup.
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Pickup Time</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Token #</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>Status Toggle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ fontWeight: 600, color: '#6366f1' }}>{order.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 30, height: 30, fontSize: '0.8rem', bgcolor: '#e2e8f0', color: '#0f172a' }}>
                      {order.user[0]}
                    </Avatar>
                    <Typography sx={{ fontWeight: 500 }}>{order.user}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>
                  <Chip label={`#${order.token}`} size="small" sx={{ fontWeight: 700, bgcolor: '#f1f5f9' }} />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    {/* Status Chip updates based on 'isReady' boolean */}
                    <Chip 
                      label={order.isReady ? "Ready" : "Pending"} 
                      color={order.isReady ? "success" : "warning"} 
                      size="small"
                      sx={{ width: 80, fontWeight: 700 }}
                    />
                    
                    {/* The Switch component */}
                    <Switch 
                      checked={order.isReady} 
                      onChange={() => handleToggleStatus(order.id)}
                      color="success" 
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewOrders;