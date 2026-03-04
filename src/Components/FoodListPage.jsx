import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, 
  Card, CardMedia, CardContent, CardActions, Box, IconButton, 
  Badge, Snackbar, Alert, Menu, MenuItem, Fade 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from './CartContext';

import muttonchaps from '../assets/muttonchaps.jpg';
import pavbaji from '../assets/pavbaji.jpg';
import swswanFriedRise from '../assets/sewanFriedRise.jpg';

const FoodListPage = () => {
  const navigate = useNavigate();
  const { cart, orders, addToCart } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  // Inside FoodListPage.jsx
const handleMenuClose = (category) => {
  setAnchorEl(null);
  if (category) {
    // This now matches path="/menu/:type" in App.jsx
    navigate(`/menu/${category}`); 
  }
};

  const foodItems = [
    { id: 1, name: 'Paneer Rice', price: 180, img: muttonchaps },
    { id: 2, name: 'Pasta Special', price: 150, img: pavbaji },
    { id: 3, name: 'Podi Dosa', price: 80, img: swswanFriedRise},
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#263238' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleMenuClick} sx={{ mr: 1 }}><MenuIcon /></IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()} TransitionComponent={Fade}>
            <MenuItem onClick={() => handleMenuClose('morning')}>☀️ Breakfast</MenuItem>
            <MenuItem onClick={() => handleMenuClose('lunch')}>🍱 Lunch</MenuItem>
            <MenuItem onClick={() => handleMenuClose('evening')}>🍕 Snacks</MenuItem>
          </Menu>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: '800' }}>SMART CANTEEN</Typography>
          <IconButton color="inherit" onClick={() => navigate('/notifications')}>
            <Badge badgeContent={orders.length} color="info"><NotificationsIcon /></Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cart.length} color="error"><ShoppingCartIcon /></Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="800"  mb={4}>Today's Specials</Typography>
        <Grid container spacing={4}>
          {foodItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: '20px' }}>
                <CardMedia component="img" height="200" image={item.img} />
                <CardContent>
                  <Typography variant="h6" fontWeight="700">{item.name}</Typography>
                  <Typography variant="h5" color="#E65100" fontWeight="800">₹{item.price}</Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button variant="contained" fullWidth onClick={() => { addToCart(item); setOpenSnack(true); }} sx={{ bgcolor: '#E65100' }}>Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)}>
        <Alert severity="success">Item Added!</Alert>
      </Snackbar>
    </Box>
  );
};

export default FoodListPage;