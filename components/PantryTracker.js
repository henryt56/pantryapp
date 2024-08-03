'use client'

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Grid,
  Box,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../firebase';
import { 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  collection,
  getDoc
} from 'firebase/firestore';

const PantryTracker = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newCount, setNewCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editCount, setEditCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCount, setDeleteCount] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      const newItems = snapshot.docs.map(doc => ({
        name: doc.id,
        count: doc.data().count
      }));
      setItems(newItems);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (newItem.trim() !== '') {
      const itemRef = doc(db, 'pantry', newItem.charAt(0).toUpperCase() + newItem.slice(1).toLowerCase());
      const itemDoc = await getDoc(itemRef);

      if (itemDoc.exists()) {
        await updateDoc(itemRef, {
          count: itemDoc.data().count + newCount
        });
      } else {
        await setDoc(itemRef, {
          count: newCount
        });
      }

      setNewItem('');
      setNewCount(1);
    }
  };

  const deleteItem = async (name) => {
    await deleteDoc(doc(db, 'pantry', name.charAt(0).toUpperCase() + name.slice(1)));
  };

  const openEditDialog = (item) => {
    setEditItem(item);
    setEditCount(item.count);
    setOpenDialog(true);
  };

  const handleEditSave = async () => {
    await updateDoc(doc(db, 'pantry', editItem.name.charAt(0).toUpperCase() + editItemname.slice(1)), {
      count: editCount
    });
    setOpenDialog(false);
  };

  const handleDeletePartial = async (item) => {
    const itemRef = doc(db, 'pantry', item.name.charAt(0).toUpperCase() + item.name.slice(1) );
    if (item.count <= deleteCount) {
      await deleteDoc(itemRef);
    } else {
      await updateDoc(itemRef, {
        count: item.count - deleteCount
      });
    }
    setDeleteCount(1);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2">
          My Pantry
        </Typography>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
        />
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Item
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Item Name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={newCount}
              onChange={(e) => setNewCount(parseInt(e.target.value) || 0)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" onClick={addItem} size="large">
              Add to Pantry
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3}>
        <List>
          {filteredItems.map((item) => (
            <ListItem 
              key={item.name}
              divider
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText 
                primary={item.name} 
                secondary={`Quantity: ${item.count}`}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => openEditDialog(item)} size="small">
                  <EditIcon color='primary'/>
                </IconButton>
                <IconButton onClick={() => deleteItem(item.name)} size="small">
                  <DeleteIcon color='error'/>
                </IconButton>
                <TextField
                  label="Remove Quantity"
                  type="number"
                  value={deleteCount}
                  onChange={(e) => setDeleteCount(parseInt(e.target.value) || 1)}
                  variant="outlined"
                  size="small"
                  sx={{ width: '120px', mr: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleDeletePartial(item)}
                  size="small"
                >
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Pantry Item</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            {editItem?.name}
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            value={editCount}
            onChange={(e) => setEditCount(parseInt(e.target.value) || 0)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PantryTracker;