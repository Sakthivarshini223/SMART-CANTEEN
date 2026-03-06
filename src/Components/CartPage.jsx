import React, { useState, useMemo } from "react";
import { 
  Container, AppBar, Badge, Toolbar, Typography, Paper, List, ListItem, ListItemText, 
  Button, TextField, MenuItem, Stack, Box, Divider, 
  IconButton, Snackbar, Alert, Chip, Collapse, Fade, Zoom 
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, orders, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [pickupTime, setPickupTime] = useState("12:10 PM");
  const [payment, setPayment] = useState("UPI");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // COLORS MATCHING YOUR IMAGE
  const charcoal = "#263238"; 
  const primaryOrange = "#E65100"; 

  // 1. Get current user ID for filtering
  const currentUserId = localStorage.getItem('userId');

  // 2. FIXED: Calculate total safely
  const total = cart.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
  
  const timeSuggestions = ["12:10 PM", "1:05 PM", "1:30 PM", "7:00 PM"];

  // 3. FIXED: Filter notifications to show ONLY this user's 'Ready' orders
  const readyNotifications = useMemo(() => {
    return orders.filter(o => 
      String(o.user_id) === String(currentUserId) && o.status === 'Ready'
    ).length;
  }, [orders, currentUserId]);

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
    <Box sx={{ flexGrow: 1, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: charcoal }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/food-list')} sx={{ mr: 1 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: '800' }}>SMART CANTEEN</Typography>
          
          <Stack direction="row" spacing={1}>
            <IconButton color="inherit" onClick={() => navigate('/notifications')}>
              <Badge 
                badgeContent={readyNotifications} 
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#e31e24", 
                    color: "white",
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    minWidth: '18px',
                    height: '18px',
                    border: `1px solid ${charcoal}`
                  }
                }}
              >
                <NotificationsIcon sx={{ color: '#ffffff' }} />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cart.length} color="info">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Stack spacing={3}>
          <Zoom in={true}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", border: "1px solid #f0f0f0" }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <ShoppingBagIcon sx={{ color: primaryOrange }} />
                <Typography variant="h6" sx={{ fontWeight: "800" }}>Order Summary</Typography>
                <Chip label={`${cart.length} items`} size="small" sx={{ fontWeight: 700 }} />
              </Stack>

              <List disablePadding>
                <TransitionGroup>
                  {cart.map((item) => (
                    <Collapse key={item.cartId}>
                      <ListItem
                        sx={{ px: 0, py: 2, borderBottom: "1px solid #f5f5f5" }}
                        secondaryAction={
                          <IconButton onClick={() => removeFromCart(item.cartId)} sx={{ color: "#ff5252", bgcolor: '#fff5f5' }}>
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: "700" }}>{item.name}</Typography>}
                          secondary={<Typography sx={{ fontWeight: "800", color: primaryOrange }}>₹{parseFloat(item.price).toFixed(2)}</Typography>}
                        />
                      </ListItem>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>

              <Box sx={{ 
                mt: 3, p: 3, bgcolor: "#fff", borderRadius: "20px", 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                border: '1px dashed #e0e0e0' 
              }}>
                <Typography sx={{ fontWeight: "700", color: charcoal }}>Grand Total</Typography>
                <Typography variant="h4" sx={{ fontWeight: "900", color: primaryOrange }}>
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", border: "1px solid #f0f0f0" }}>
              <Typography sx={{ fontWeight: "800", mb: 2 }}>Pickup Schedule</Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
                {timeSuggestions.map((time) => (
                  <Chip 
                    key={time} 
                    label={time} 
                    onClick={() => setPickupTime(time)}
                    sx={{ 
                      fontWeight: '700',
                      bgcolor: pickupTime === time ? primaryOrange : "#f0f0f0", 
                      color: pickupTime === time ? "#fff" : charcoal,
                    }} 
                  />
                ))}
              </Stack>

              <TextField 
                select 
                fullWidth 
                variant="filled"
                label="Payment Method"
                value={payment} 
                onChange={(e) => setPayment(e.target.value)} 
                InputProps={{ disableUnderline: true }}
                sx={{ mb: 3, '& .MuiFilledInput-root': { borderRadius: '12px' } }}
              >
                <MenuItem value="UPI">UPI (GPay / PhonePe)</MenuItem>
                <MenuItem value="Card">Credit / Debit Card</MenuItem>
                <MenuItem value="Cash">Cash on Pickup</MenuItem>
              </TextField>

              <Button 
                variant="contained" 
                fullWidth 
                onClick={handlePlaceOrder}
                sx={{ 
                  bgcolor: primaryOrange, py: 2, borderRadius: "15px", 
                  fontWeight: '900', fontSize: '1rem',
                  '&:hover': { bgcolor: "#BF360C" }
                }}
              >
                Place Order ₹{total.toFixed(2)}
              </Button>
            </Paper>
          </Zoom>
        </Stack>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="warning" variant="filled">Please add items to your tray first!</Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;