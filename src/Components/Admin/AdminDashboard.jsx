import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import {
  TrendingUpRounded,
  PendingActionsRounded,
  StarsRounded,
} from "@mui/icons-material";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ sales: 0, orders: 0, popular: "" });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/stats");
      if (!response.ok) throw new Error("API failed");
      
      const data = await response.json();
      setStats({
        sales: Number(data.totalSales) || 0, 
        orders: data.pendingCount || 0,
        popular: data.topItem || "None", // Backend should send the food name here
      });
    } catch (err) {
      console.error("Using fallback mock data due to error:", err);
      setStats({ 
        sales: 1580, 
        orders: 12, 
        popular: "Paneer Tikka" // Fallback top selling food
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  const proCardStyle = (accentColor) => ({
    p: 3,
    borderRadius: "20px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    height: '100%',
    "&:hover": {
      transform: "translateY(-8px)",
      borderColor: accentColor,
      boxShadow: `0 20px 25px -5px ${accentColor}20`,
    },
    "@keyframes breathe": {
      "0%": { borderLeft: `5px solid #e2e8f0` },
      "50%": { borderLeft: `5px solid ${accentColor}` },
      "100%": { borderLeft: `5px solid #e2e8f0` },
    },
    animation: "breathe 4s infinite ease-in-out",
    borderLeft: `5px solid #e2e8f0`,
  });

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: "#64748b" }}>
          Real-time insights from your MySQL Database
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Total Sales */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={proCardStyle("#10b981")}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" sx={{ color: "#64748b", fontWeight: 700 }}>
                  Total Revenue
                </Typography>
                {loading ? (
                  <Skeleton width={100} height={50} />
                ) : (
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a" }}>
                    ₹{stats.sales.toLocaleString()}
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 1, borderRadius: "12px", bgcolor: "#ecfdf5" }}>
                <TrendingUpRounded sx={{ color: "#10b981" }} />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: "#10b981", fontWeight: 600 }}>
              Live revenue stream
            </Typography>
          </Paper>
        </Grid>

        {/* Pending Orders */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={proCardStyle("#f43f5e")}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" sx={{ color: "#64748b", fontWeight: 700 }}>
                  Orders Pending
                </Typography>
                {loading ? (
                  <Skeleton width={60} height={50} />
                ) : (
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a" }}>
                    {stats.orders}
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 1, borderRadius: "12px", bgcolor: "#fff1f2" }}>
                <PendingActionsRounded sx={{ color: "#f43f5e" }} />
              </Box>
            </Box>
            <Typography 
              variant="caption" 
              sx={{ 
                color: stats.orders > 0 ? "#f43f5e" : "#10b981", 
                fontWeight: 600 
              }}
            >
              {stats.orders > 0 ? "Needs immediate action" : "All orders caught up!"}
            </Typography>
          </Paper>
        </Grid>

        {/* Top Selling Food */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={proCardStyle("#6366f1")}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" sx={{ color: "#64748b", fontWeight: 700 }}>
                  Top Selling Food
                </Typography>
                {loading ? (
                  <Skeleton width={120} height={50} />
                ) : (
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mt: 1 }}>
                    {stats.popular}
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 1, borderRadius: "12px", bgcolor: "#eef2ff" }}>
                <StarsRounded sx={{ color: "#6366f1" }} />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Most ordered item
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;