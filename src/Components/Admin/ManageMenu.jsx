import React, { useState, useEffect } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Typography, Dialog, TextField, MenuItem, 
  IconButton, Avatar, Chip, DialogTitle, DialogContent, 
  DialogActions, Stack 
} from '@mui/material';
import { 
  AddRounded, EditRounded, DeleteRounded, 
  VisibilityRounded, VisibilityOffRounded, CloudUploadRounded 
} from '@mui/icons-material';

const ManageMenu = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentItem, setCurrentItem] = useState({ 
    name: '', price: '', category: 'Morning', status: 'Available', image_url: '' 
  });

  // --- REAL-TIME SYNC LOGIC ---
  const fetchMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }
    } catch (error) { 
      console.error("Sync failed:", error); 
    }
  };

  useEffect(() => {
    // Initial fetch when page loads
    fetchMenu();

    // POLLING: Re-fetch every 5 seconds to show changes from other users/admins
    const interval = setInterval(() => {
      fetchMenu();
    }, 5000);

    // Cleanup interval when user leaves the page
    return () => clearInterval(interval);
  }, []);

  // --- UI HANDLERS ---
  const handleOpen = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setEditMode(true);
    } else {
      setCurrentItem({ name: '', price: '', category: 'Morning', status: 'Available', image_url: '' });
      setEditMode(false);
    }
    setSelectedFile(null);
    setOpen(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', currentItem.name);
    formData.append('price', currentItem.price);
    formData.append('category', currentItem.category);
    formData.append('status', currentItem.status);

    if (editMode && !selectedFile && currentItem.image_url) {
      formData.append('image_url', currentItem.image_url);
    }
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    const url = editMode 
      ? `http://localhost:5000/api/menu/${currentItem.id}` 
      : 'http://localhost:5000/api/menu';

    try {
      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        body: formData, 
      });

      if (response.ok) {
        setOpen(false);
        fetchMenu(); // Instant local refresh
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) { 
      console.error("Save failed:", error); 
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'Available' ? 'Unavailable' : 'Available';
    
    // Optimistic Update: Change UI immediately
    setMenuItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, status: newStatus } : i
    ));

    try {
      const response = await fetch(`http://localhost:5000/api/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, status: newStatus }),
      });

      if (!response.ok) fetchMenu(); // Rollback if server fails
    } catch (error) { 
      fetchMenu();
      console.error("Toggle failed:", error); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete item?")) {
      // Optimistic Update: Remove from UI immediately
      setMenuItems(prev => prev.filter(item => item.id !== id));

      try {
        const response = await fetch(`http://localhost:5000/api/menu/${id}`, { method: 'DELETE' });
        if (!response.ok) fetchMenu(); // Rollback if server fails
      } catch (error) {
        fetchMenu();
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={800}>Manage Menu</Typography>
        <Button variant="contained" startIcon={<AddRounded />} onClick={() => handleOpen()} sx={{ bgcolor: '#10b981' }}>
          Add Item
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '16px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={item.image_url}>{item.name[0]}</Avatar>
                    <Typography fontWeight={600}>{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.status} 
                    color={item.status === 'Available' ? 'success' : 'error'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleToggleStatus(item)}>
                    {item.status === 'Available' ? <VisibilityOffRounded /> : <VisibilityRounded />}
                  </IconButton>
                  <IconButton onClick={() => handleOpen(item)} color="primary"><EditRounded /></IconButton>
                  <IconButton onClick={() => handleDelete(item.id)} color="error"><DeleteRounded /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle fontWeight={800}>{editMode ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Name" fullWidth value={currentItem.name} onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})} />
            
            <Button variant="outlined" component="label" startIcon={<CloudUploadRounded />}>
              {selectedFile ? selectedFile.name : "Upload Food Image"}
              <input type="file" hidden accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
            </Button>

            <TextField label="Price" type="number" fullWidth value={currentItem.price} onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})} />
            
            <TextField select label="Category" fullWidth value={currentItem.category} onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}>
              <MenuItem value="Morning">Morning (Breakfast)</MenuItem>
              <MenuItem value="Afternoon">Afternoon (Lunch)</MenuItem>
              <MenuItem value="Evening">Evening (Snacks)</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#10b981' }}>Save Item</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageMenu;