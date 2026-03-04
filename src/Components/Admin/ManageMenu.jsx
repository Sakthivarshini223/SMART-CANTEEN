import React, { useState } from 'react';
// Missing imports that caused the crashes in image_01e54b.png
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Typography, Dialog, TextField, MenuItem, 
  IconButton, Tooltip, Avatar, Switch, Chip 
} from '@mui/material';
import { 
  AddRounded, EditRounded, DeleteRounded, CloudUploadRounded, 
  VisibilityRounded, VisibilityOffRounded 
} from '@mui/icons-material';

const ManageMenu = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Masala Dosa', category: 'Morning', price: 5.00, status: 'Available', inStock: true },
    { id: 2, name: 'Paneer Tikka', category: 'Evening', price: 12.00, status: 'Available', inStock: false }
  ]);

  const [currentItem, setCurrentItem] = useState({ 
    name: '', price: '', category: 'Morning', status: 'Available', inStock: true 
  });

  const handleOpen = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setEditMode(true);
    } else {
      setCurrentItem({ name: '', price: '', category: 'Morning', status: 'Available', inStock: true });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!currentItem.name || !currentItem.price) return;
    if (editMode) {
      setMenuItems(menuItems.map(item => item.id === currentItem.id ? { ...currentItem, price: parseFloat(currentItem.price) } : item));
    } else {
      setMenuItems([...menuItems, { ...currentItem, id: Date.now(), price: parseFloat(currentItem.price) }]);
    }
    setOpen(false);
  };

  // Toggle Stock Visibility Logic
  const toggleStock = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>Manage Menu</Typography>
        <Button variant="contained" startIcon={<AddRounded />} onClick={() => handleOpen()} sx={{ bgcolor: '#10b981', borderRadius: '12px' }}>
          Add Item
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Item</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow 
                key={item.id} 
                sx={{ 
                  position: 'relative',
                  opacity: item.inStock ? 1 : 0.5, // Black opacity effect
                  bgcolor: item.inStock ? 'transparent' : 'rgba(0,0,0,0.05)',
                  transition: '0.3s'
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#f1f5f9', color: '#10b981' }}>{item.name[0]}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                      {!item.inStock && <Typography variant="caption" color="error" sx={{fontWeight: 800}}>HIDDEN</Typography>}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={item.inStock ? "Available" : "Out of Stock"} color={item.inStock ? "success" : "default"} size="small" />
                </TableCell>
                <TableCell align="right">
                  {/* Stock Toggle Action */}
                  <Tooltip title={item.inStock ? "Hide from Menu" : "Show in Menu"}>
                    <IconButton onClick={() => toggleStock(item.id)} color={item.inStock ? "primary" : "default"}>
                      {item.inStock ? <VisibilityRounded /> : <VisibilityOffRounded />}
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={() => handleOpen(item)} sx={{ color: '#6366f1' }}><EditRounded /></IconButton>
                  <IconButton onClick={() => handleDelete(item.id)} sx={{ color: '#f43f5e' }}><DeleteRounded /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ... (Dialog code remains the same as previous) */}
    </Box>
  );
};

export default ManageMenu;