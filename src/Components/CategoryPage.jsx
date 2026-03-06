import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, AppBar, Toolbar, Typography, IconButton, Container, Grid, 
  Card, CardMedia, CardContent, CardActions, Button, Snackbar, 
  Alert, Badge, Zoom, Tooltip 
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from './CartContext';

const CategoryPage = () => {
  const { type } = useParams(); // 'morning', 'lunch', 'evening'
  const navigate = useNavigate();
  const { cart, orders, addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  // NEW: State for items from database
  const [currentFood, setCurrentFood] = useState([]);

  const charcoal = '#263238';
  const primaryColor = '#E65100';

  // FETCH AND FILTER DATA
  useEffect(() => {
    const fetchCategoryMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        const data = await response.json();
        
        // Map the URL type to your Database Category names
        const categoryMap = {
          'morning': 'Morning',
          'lunch': 'Afternoon',
          'evening': 'Evening'
        };

        const filtered = data.filter(item => 
          item.category === categoryMap[type] && item.status === 'Available'
        );
        
        setCurrentFood(filtered);
      } catch (error) {
        console.error("Failed to fetch category menu:", error);
      }
    };
    fetchCategoryMenu();
  }, [type]); // Re-run if user switches from morning to lunch

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fbfbfb' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(38, 50, 56, 0.95)', 
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)' 
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/food-list')} 
              sx={{ mr: 1, bgcolor: 'rgba(255,255,255,0.05)' }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: '800', textTransform: 'lowercase' }}>
              {type} menu
            </Typography>
          </Box>

          <Box>
            <IconButton color="inherit" onClick={() => navigate('/notifications')}>
              <Badge badgeContent={orders.length} color="info"><NotificationsIcon /></Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cart.length} color="error"><ShoppingCartIcon /></Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 8 }}>
        <Zoom in={true}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: '900', color: charcoal, textTransform: 'lowercase', fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 1 }}>
              {type} specials
            </Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: primaryColor, mx: 'auto', borderRadius: 2 }} />
          </Box>
        </Zoom>

        <Grid container spacing={4}>
          {currentFood.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid #f0f0f0', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia 
                    component="img" 
                    height="240" 
                    image={item.image_url || 'https://via.placeholder.com/240?text=No+Image'} 
                  />
                  <Box sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'rgba(255,255,255,0.9)', px: 2, py: 0.5, borderRadius: '12px' }}>
                    <Typography sx={{ fontWeight: '900', color: primaryColor }}>₹{item.price}</Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ fontWeight: '800', fontSize: '1.4rem', color: charcoal, textTransform: 'lowercase', mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">freshly prepared {type} delight</Typography>
                </CardContent>

                <CardActions sx={{ px: 4, pb: 4 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => { addToCart(item); setOpenSnackbar(true); }}
                    sx={{ bgcolor: primaryColor, borderRadius: '16px', py: 2 }}
                  >
                    add to tray
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ bgcolor: charcoal, color: '#fff', borderRadius: '12px' }}>
          item added to tray!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryPage;