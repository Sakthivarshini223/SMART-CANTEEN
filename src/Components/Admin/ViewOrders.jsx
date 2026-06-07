import React, { useState, useEffect } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Switch, Chip, Avatar, Skeleton 
} from '@mui/material';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Polling every 5s
    return () => clearInterval(interval);
  }, []);

  const handleToggleStatus = async (orderId, currentStatus) => {
    // Toggle between the ENUM strings your database expects
    const newStatus = currentStatus === 'Pending' ? 'Ready' : 'Pending';

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh table
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Order Management
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Toggle the switch when an order is prepared for pickup.
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Status Toggle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [1, 2, 3].map((i) => (
                <TableRow key={i}><TableCell colSpan={4}><Skeleton height={40} /></TableCell></TableRow>
              ))
            ) : orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ fontWeight: 600, color: '#6366f1' }}>#{order.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: '#e2e8f0', color: '#0f172a', fontSize: '0.8rem' }}>
                      {order.user_id}
                    </Avatar>
                    <Typography sx={{ fontWeight: 500 }}>User ID: {order.user_id}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>₹{order.total_price}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Chip 
                      label={order.status} 
                      color={order.status === 'Ready' ? "success" : "warning"} 
                      size="small"
                      sx={{ width: 90, fontWeight: 700 }}
                    />
                    <Switch 
                      checked={order.status === 'Ready'} 
                      onChange={() => handleToggleStatus(order.id, order.status)}
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