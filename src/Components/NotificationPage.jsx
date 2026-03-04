import React from "react";
import { 
  Container, Typography, Paper, Box, Stack, Chip, Divider, 
  IconButton, AppBar, Toolbar, Badge, Fade, Zoom 
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const NotificationPage = () => {
  const { orders, cart } = useCart();
  const navigate = useNavigate();

  const primaryColor = "#E65100";
  const charcoal = "#263238";

  return (
    <Box sx={{ bgcolor: "#fbfbfb", minHeight: "100vh" }}>
      {/* 1. Advanced Nav Bar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(38, 50, 56, 0.95)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar>
          <IconButton 
            color="inherit" 
            onClick={() => navigate('/food-list')} 
            sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.1)' }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: '800', letterSpacing: 0.5 }}>
            trackOrder
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton color="inherit" onClick={() => navigate('/notifications')}>
              <Badge badgeContent={orders?.length || 0} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Fade in={true}>
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: "900", color: charcoal, mb: 1 }}>
              order history
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Live updates from the canteen kitchen.
            </Typography>
          </Box>
        </Fade>

        {orders.length === 0 ? (
          <Zoom in={true}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 8, 
                textAlign: 'center', 
                borderRadius: '32px', 
                border: '1px dashed #ccc',
                bgcolor: 'transparent'
              }}
            >
              <FastfoodIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography color="textSecondary" variant="h6" fontWeight="700">
                No active orders yet.
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Once you place an order, it will appear here.
              </Typography>
            </Paper>
          </Zoom>
        ) : (
          <Stack spacing={3}>
            {orders.map((order, index) => (
              <Zoom in={true} key={order.orderId} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: "28px", 
                    border: "1px solid #fff", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Status Indicator Bar */}
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', bgcolor: primaryColor }} />
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: '800', textTransform: 'uppercase' }}>
                        Order ID
                      </Typography>
                      <Typography variant="h6" fontWeight="900" color={charcoal}>
                        #{order.orderId}
                      </Typography>
                    </Box>
                    <Chip 
                      label={order.status} 
                      sx={{ 
                        bgcolor: '#e8f5e9', 
                        color: '#2e7d32', 
                        fontWeight: '800', 
                        borderRadius: '12px',
                        px: 1
                      }} 
                      icon={<CheckCircleIcon style={{ color: '#2e7d32' }} />} 
                    />
                  </Stack>

                  <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                  <Box sx={{ mb: 2 }}>
                    {order.items.map((item, idx) => (
                      <Stack key={idx} direction="row" justifyContent="space-between" sx={{ py: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: '600', color: charcoal }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          x 1
                        </Typography>
                      </Stack>
                    ))}
                  </Box>

                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    justifyContent="space-between"
                    sx={{ 
                      p: 2, 
                      bgcolor: "#f8f9fa", 
                      borderRadius: "16px",
                      border: '1px solid #f0f0f0' 
                    }}
                  >
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontWeight: '700' }}>
                        Pickup Time
                      </Typography>
                      <Typography variant="body2" fontWeight="900" color={primaryColor}>
                        {order.time}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontWeight: '700' }}>
                        Total Paid
                      </Typography>
                      <Typography variant="body2" fontWeight="900" color={charcoal}>
                        ₹{order.total}
                      </Typography>
                    </Box>
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