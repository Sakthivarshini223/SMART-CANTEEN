import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Button, Stack, Box, CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCart } from "./CartContext";

const PaymentPage = () => {
  const { confirmOrder } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { total, paymentMethod, pickupTime } = location.state || { total: 0, paymentMethod: 'Cash', pickupTime: 'Now' };

  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      confirmOrder({ total, pickupTime }); 
      setIsProcessing(false);
      setIsFinished(true);
    }, 2000);
  };

  if (isFinished) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 100, color: "green", mb: 2 }} />
        <Typography variant="h4" fontWeight="900">Payment Successful!</Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>Order confirmed for {pickupTime}</Typography>
        <Button variant="contained" onClick={() => navigate("/food-list")} sx={{ bgcolor: "#263238", px: 4 }}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: "24px", textAlign: 'center' }}>
          <Typography variant="h5" mb={2}>Completing {paymentMethod} Payment</Typography>
          <Typography variant="h3" color="#E65100" fontWeight="900" mb={4}>₹{total}</Typography>
          <Button fullWidth variant="contained" onClick={handlePayNow} disabled={isProcessing} sx={{ py: 2, bgcolor: "#E65100", borderRadius: '12px' }}>
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : `CONFIRM PAY`}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentPage;