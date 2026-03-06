import React, { useState, useEffect, useMemo } from 'react';
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

const FoodListPage = () => {
  const navigate = useNavigate();
  const { cart, orders, addToCart } = useCart(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  const currentUserId = localStorage.getItem('userId');

  const fetchMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      if (response.ok) {
        const data = await response.json();
        setFoodItems(data.filter(item => item.status === 'Available'));
      }
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const notificationsCount = useMemo(() => {
    return orders.filter(o => 
      String(o.user_id) === String(currentUserId) && o.status === 'Ready'
    ).length;
  }, [orders, currentUserId]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#263238' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleMenuOpen} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => handleNavigate('/category/morning')}>Morning Breakfast</MenuItem>
            <MenuItem onClick={() => handleNavigate('/category/lunch')}>Lunch Meals</MenuItem>
            <MenuItem onClick={() => handleNavigate('/category/evening')}>Evening Snacks</MenuItem>
          </Menu>
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: '800' }}>SMART CANTEEN</Typography>
          
          <IconButton color="inherit" onClick={() => navigate('/notifications')}>
            <Badge badgeContent={notificationsCount} color="error" overlap="circular">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cart.length} color="info">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* maxWidth="xl" allows for a wider layout to fit 4 cards comfortably */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid 
          container 
          spacing={3} 
          justifyContent="center" 
        >
          {foodItems.map((item) => (
            <Grid 
              item 
              key={item.id} 
              xs={12}   // 1 card per row on mobile
              sm={6}    // 2 cards per row on tablets
              md={4}    // 3 cards per row on small laptops
              lg={3}    // 4 CARDS PER ROW on large screens/desktops
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card sx={{ 
                borderRadius: '20px', 
                height: '100%', 
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.05)',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 8px 25px rgba(0,0,0,0.1)' }
              }}>
                <CardMedia 
                  component="img" 
                  height="160" // Reduced height slightly to keep 4-col layout compact
                  image={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `http://localhost:5000${item.image_url}`) : 'https://via.placeholder.com/200?text=No+Image'} 
                />
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="700" sx={{ lineHeight: 1.2, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="#E65100" fontWeight="800">
                    ₹{item.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={() => { addToCart(item); setOpenSnack(true); }} 
                    sx={{ 
                      bgcolor: '#E65100', 
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: '700'
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)}>
        <Alert severity="success" variant="filled">Item Added!</Alert>
      </Snackbar>
    </Box>
  );
};

export default FoodListPage;