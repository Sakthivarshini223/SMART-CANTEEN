import React, { useState } from 'react';
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

// Import Assets
import podiDosaImg from '../assets/podiDosa.jpg';
import idli from '../assets/idli.jpg';
import alu from '../assets/aaluparata.jpg';
import seswan from '../assets/sewanFriedRise.jpg';
import paneer from '../assets/paneerRise.jpg';
import mutton from '../assets/muttonchaps.jpg';
import pastaImg from '../assets/pasta.jpg';
import samosa from '../assets/samosa.jpg';
import pav from '../assets/pavbaji.jpg';
import piz from '../assets/pizza.jpg';

const CategoryPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { cart, orders, addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const charcoal = '#263238';
  const primaryColor = '#E65100';

  // Data mapping based on type
  const menuItems = {
    morning: [
      { id: 101, name: 'ghee podi dosa', price: 90, img: podiDosaImg },
      { id: 102, name: 'masala idli', price: 70, img: idli },
      { id: 103, name: 'aalu parata', price: 70, img: alu}
    ],
    lunch: [
      { id: 201, name: 'sezhwan fried rice', price: 200, img: seswan },
      { id: 202, name: 'paneer pulao', price: 160, img: paneer },
      { id: 203, name: 'mutton chaps', price: 160, img: mutton }
    ],
    evening: [
      { id: 301, name: 'cheesy pasta', price: 140, img: pastaImg },
      { id: 302, name: 'crispy samosa', price: 40, img: samosa },
      { id: 303, name: 'pav baji', price: 40, img: pav },
      { id: 304, name: 'pizza', price: 40, img: piz }
    ]
  };

  const currentFood = menuItems[type] || [];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fbfbfb' }}>
      {/* Advanced Glassmorphism AppBar */}
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
          <Stack direction="row" alignItems="center">
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/food-list')} 
              sx={{ mr: 1, bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: '800', textTransform: 'lowercase', letterSpacing: 1 }}>
              {type} menu
            </Typography>
          </Stack>

          <Box>
            <IconButton color="inherit" onClick={() => navigate('/notifications')} sx={{ mx: 0.5 }}>
              <Badge badgeContent={orders.length} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ mx: 0.5 }}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 8 }}>
        {/* Animated Title */}
        <Zoom in={true}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: '900', 
                color: charcoal, 
                textTransform: 'lowercase',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 1
              }}
            >
              {type} specials
            </Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: primaryColor, mx: 'auto', borderRadius: 2 }} />
          </Box>
        </Zoom>

        <Grid container spacing={4}>
          {currentFood.map((item, index) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  borderRadius: '32px', 
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  }
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia 
                    component="img" 
                    height="240" 
                    image={item.img} 
                    sx={{ transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.1)' } }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', top: 20, right: 20, 
                      bgcolor: 'rgba(255,255,255,0.9)', px: 2, py: 0.5, 
                      borderRadius: '12px', backdropFilter: 'blur(4px)' 
                    }}
                  >
                    <Typography sx={{ fontWeight: '900', color: primaryColor }}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    sx={{ 
                      fontWeight: '800', 
                      fontSize: '1.4rem', 
                      color: charcoal, 
                      textTransform: 'lowercase',
                      mb: 1
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'lowercase' }}>
                    freshly prepared {type} delight
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 4, pb: 4 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => { addToCart(item); setOpenSnackbar(true); }}
                    sx={{ 
                      bgcolor: primaryColor, 
                      color: '#fff',
                      fontWeight: '700', 
                      textTransform: 'lowercase',
                      borderRadius: '16px', 
                      py: 2,
                      boxShadow: `0 8px 20px rgba(230, 81, 0, 0.2)`,
                      '&:hover': { bgcolor: '#bf360c', boxShadow: 'none' }
                    }}
                  >
                    add to tray
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={2000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          icon={false}
          severity="success" 
          sx={{ 
            bgcolor: charcoal, 
            color: '#fff', 
            borderRadius: '12px',
            fontWeight: '600',
            textTransform: 'lowercase'
          }}
        >
          item added to tray!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Required helper for layout
const Stack = ({ children, direction, alignItems, sx }) => (
  <Box sx={{ display: 'flex', flexDirection: direction, alignItems, ...sx }}>{children}</Box>
);

export default CategoryPage;