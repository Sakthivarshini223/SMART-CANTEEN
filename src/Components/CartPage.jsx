import React, { useState } from "react";
import { 
  Container, AppBar, Badge, Toolbar, Typography, Paper, List, ListItem, ListItemText, 
  Button, TextField, MenuItem, Stack, Box, Divider, 
  IconButton, Snackbar, Alert, Chip, Collapse, Fade, Zoom 
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, orders, removeFromCart } = useCart();
  const navigate = useNavigate();

  // State
  const [pickupTime, setPickupTime] = useState("12:10 PM");
  const [payment, setPayment] = useState("UPI");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Theme Constants
  const primaryColor = "#E65100";
  const charcoal = "#263238";
  
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const timeSuggestions = ["12:10 PM", "1:05 PM", "1:30 PM", "7:00 PM"];

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      setOpenSnackbar(true);
      return;
    }
    navigate("/payment", { 
      state: { total, paymentMethod: payment, pickupTime } 
    });
  };

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
            myTray
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
              checkout
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Review your selection and pick a time.
            </Typography>
          </Box>
        </Fade>

        <Stack spacing={4}>
          {/* SECTION 1: ITEMS LIST */}
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: "32px", 
                border: "1px solid #fff", 
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)" 
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <ShoppingBagIcon sx={{ color: primaryColor }} />
                <Typography variant="h6" sx={{ fontWeight: "800", color: charcoal }}>
                  Order Summary
                </Typography>
                <Chip label={`${cart.length} items`} size="small" sx={{ fontWeight: 700, bgcolor: '#f0f0f0' }} />
              </Stack>

              {cart.length === 0 ? (
                <Box sx={{ py: 6, textAlign: "center" }}>
                  <Typography color="textSecondary" sx={{ mb: 2 }}>Your tray is empty!</Typography>
                  <Button 
                    variant="outlined"
                    onClick={() => navigate("/food-list")} 
                    sx={{ borderRadius: '12px', fontWeight: '700', color: primaryColor, borderColor: primaryColor }}
                  >
                    Browse Menu
                  </Button>
                </Box>
              ) : (
                <List disablePadding>
                  <TransitionGroup>
                    {cart.map((item) => (
                      <Collapse key={item.cartId}>
                        <ListItem
                          sx={{ px: 0, py: 2, borderBottom: "1px solid #f5f5f5" }}
                          secondaryAction={
                            <IconButton 
                              onClick={() => removeFromCart(item.cartId)} 
                              sx={{ color: "#ff5252", bgcolor: '#fff5f5' }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={<Typography sx={{ fontWeight: "700", fontSize: "1.1rem", textTransform: 'lowercase' }}>{item.name}</Typography>}
                            secondary={<Typography sx={{ fontWeight: "800", color: primaryColor }}>₹{item.price}</Typography>}
                          />
                        </ListItem>
                      </Collapse>
                    ))}
                  </TransitionGroup>
                </List>
              )}

              {/* Total Box */}
              <Box sx={{ mt: 3, p: 3, bgcolor: "#fcfcfc", borderRadius: "20px", display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px dashed #e0e0e0' }}>
                <Typography sx={{ fontWeight: "700", color: charcoal }}>Grand Total</Typography>
                <Typography variant="h4" sx={{ fontWeight: "900", color: primaryColor }}>₹{total}</Typography>
              </Box>
            </Paper>
          </Zoom>

          {/* SECTION 2: PICKUP & PAYMENT DETAILS */}
          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: "32px", 
                border: "1px solid #fff", 
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)" 
              }}
            >
              <Stack spacing={4}>
                {/* Pickup Time Selection */}
                <Box>
                  <Typography sx={{ fontWeight: "800", mb: 2, color: charcoal }}>Pickup Schedule</Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
                    {timeSuggestions.map((time) => (
                      <Chip 
                        key={time} 
                        label={time} 
                        onClick={() => setPickupTime(time)}
                        sx={{ 
                          height: '42px',
                          px: 1,
                          fontWeight: '700',
                          bgcolor: pickupTime === time ? primaryColor : "#f0f0f0", 
                          color: pickupTime === time ? "#fff" : charcoal,
                          borderRadius: "14px",
                          transition: '0.3s',
                          border: 'none'
                        }} 
                      />
                    ))}
                  </Stack>
                  <TextField 
                    fullWidth 
                    variant="filled"
                    value={pickupTime} 
                    onChange={(e) => setPickupTime(e.target.value)}
                    InputProps={{ 
                      disableUnderline: true,
                      startAdornment: <AccessTimeIcon sx={{ mr: 1, color: primaryColor }} /> 
                    }}
                    sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
                  />
                </Box>

                {/* Payment Method */}
                <Box>
                  <Typography sx={{ fontWeight: "800", mb: 2, color: charcoal }}>Payment Method</Typography>
                  <TextField 
                    select 
                    fullWidth 
                    variant="filled"
                    value={payment} 
                    onChange={(e) => setPayment(e.target.value)} 
                    InputProps={{ 
                      disableUnderline: true,
                      startAdornment: <AccountBalanceWalletIcon sx={{ mr: 1, color: primaryColor }} /> 
                    }}
                    sx={{ '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: '#f5f5f5' } }}
                  >
                    <MenuItem value="UPI">UPI (GPay / PhonePe)</MenuItem>
                    <MenuItem value="Card">Credit / Debit Card</MenuItem>
                    <MenuItem value="Cash">Cash on Pickup</MenuItem>
                  </TextField>
                </Box>

                {/* Main Action Button */}
                <Button 
                  variant="contained" 
                  fullWidth 
                  disabled={cart.length === 0} 
                  onClick={handlePlaceOrder}
                  sx={{ 
                    bgcolor: primaryColor, 
                    color: "#fff", 
                    py: 2.5, 
                    borderRadius: "20px", 
                    fontWeight: '900', 
                    fontSize: '1.1rem',
                    boxShadow: `0px 12px 30px ${primaryColor}44`,
                    '&:hover': { bgcolor: "#BF360C", boxShadow: 'none' },
                    '&.Mui-disabled': { bgcolor: "#f0f0f0", color: "#ccc" }
                  }}
                >
                  Confirm & Pay ₹{total}
                </Button>
              </Stack>
            </Paper>
          </Zoom>
        </Stack>
      </Container>

      {/* Snackbar */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          severity="warning" 
          variant="filled" 
          sx={{ borderRadius: '15px', fontWeight: '700', bgcolor: charcoal }}
        >
          your tray is empty!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;