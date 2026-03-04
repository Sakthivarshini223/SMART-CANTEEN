import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Skeleton, useTheme } from '@mui/material';
import { TrendingUpRounded, PendingActionsRounded, StarsRounded } from '@mui/icons-material';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ sales: 0, orders: 0, popular: '' });
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM BACKEND logic remains same
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/stats');
        const data = await response.json();
        setStats({
          sales: data.totalSales || 1580, // Mocked from Page 7
          orders: data.pendingCount || 12,
          popular: data.topItem || 'Paneer Tikka'
        });
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Updated Pro Card Style with Emerald/Rose Accents
  const proCardStyle = (accentColor) => ({
    p: 3,
    borderRadius: '20px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px)',
      borderColor: accentColor,
      boxShadow: `0 20px 25px -5px ${accentColor}20`,
    },
    // The "Animated Glow" - Subtle and professional
    '@keyframes breathe': {
      '0%': { borderLeft: `5px solid #e2e8f0` },
      '50%': { borderLeft: `5px solid ${accentColor}` },
      '100%': { borderLeft: `5px solid #e2e8f0` },
    },
    animation: 'breathe 4s infinite ease-in-out',
    borderLeft: `5px solid #e2e8f0`,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-1px' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Real-time insights from your MySQL Database
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Total Sales - Emerald Theme */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={proCardStyle('#10b981')}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 700 }}>Total Revenue</Typography>
                {loading ? <Skeleton width={100} height={50} /> : (
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    ${stats.sales.toLocaleString()}
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 1, borderRadius: '12px', bgcolor: '#ecfdf5' }}>
                <TrendingUpRounded sx={{ color: '#10b981' }} />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>+12% from yesterday</Typography>
          </Paper>
        </Grid>

        {/* Pending Orders - Rose/Alert Theme */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={proCardStyle('#f43f5e')}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 700 }}>Orders Pending</Typography>
                {loading ? <Skeleton width={60} height={50} /> : (
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    {stats.orders}
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 1, borderRadius: '12px', bgcolor: '#fff1f2' }}>
                <PendingActionsRounded sx={{ color: '#f43f5e' }} />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: '#f43f5e', fontWeight: 600 }}>Needs immediate action</Typography>
          </Paper>
        </Grid>

        {/* Popular Item - Indigo Theme */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={proCardStyle('#6366f1')}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 700 }}>Top Performer</Typography>
                {loading ? <Skeleton width={120} height={50} /> : (
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 1 }}>
                    {stats.popular}
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 1, borderRadius: '12px', bgcolor: '#eef2ff' }}>
                <StarsRounded sx={{ color: '#6366f1' }} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Chart Section - Refined Glass Look */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '24px', 
            border: '1px solid #e2e8f0',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            minHeight: 450
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 3 }}>
              Sales Trends & Order Analytics
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: 350, 
              bgcolor: 'rgba(241, 245, 249, 0.5)', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px dashed #e2e8f0'
            }}>
               <Typography color="textDisabled" sx={{ fontWeight: 500 }}>
                 Waiting for Chart.js stream...
               </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;