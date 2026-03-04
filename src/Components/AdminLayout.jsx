import React from 'react';
import { 
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, AppBar, Typography, CssBaseline, Avatar, Divider, Chip 
} from '@mui/material';
import { 
  DashboardRounded, RestaurantMenuRounded, ListAltRounded, 
  LogoutRounded, AdminPanelSettingsRounded 
} from '@mui/icons-material';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardRounded />, path: '/admin' },
    { text: 'Manage Menu', icon: <RestaurantMenuRounded />, path: '/admin/manage-menu' },
    { text: 'View Orders', icon: <ListAltRounded />, path: '/admin/orders' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* ADVANCED NAV BAR */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e2e8f0',
          color: '#1e293b'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#64748b' }}>
            System / <span style={{ color: '#0f172a' }}>{location.pathname.split('/').pop() || 'Dashboard'}</span>
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip label="Online" color="success" size="small" variant="outlined" />
            <Avatar sx={{ bgcolor: '#0f172a', width: 35, height: 35 }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* PRO SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            bgcolor: '#0f172a', // Deep Slate
            color: '#ffffff',
            border: 'none'
          },
        }}
      >
        <Toolbar sx={{ px: 3, py: 2 }}>
          <AdminPanelSettingsRounded sx={{ color: '#10b981', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '1px' }}>
            CIBO <span style={{ color: '#10b981' }}>ADMIN</span>
          </Typography>
        </Toolbar>
        
        <Box sx={{ overflow: 'auto', mt: 2, px: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '12px',
                  mb: 1,
                  '&.Mui-selected': { 
                    bgcolor: '#1e293b', 
                    color: '#10b981',
                    '& .MuiListItemIcon-root': { color: '#10b981' }
                  },
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <ListItemIcon sx={{ color: '#94a3b8', minWidth: '45px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            ))}
          </List>
          
          <Box sx={{ position: 'absolute', bottom: 20, width: '85%' }}>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
            <ListItemButton 
              onClick={() => navigate('/login')}
              sx={{ borderRadius: '12px', color: '#fda4af', '&:hover': { bgcolor: 'rgba(225,29,72,0.1)' } }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}><LogoutRounded /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>

      {/* CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;