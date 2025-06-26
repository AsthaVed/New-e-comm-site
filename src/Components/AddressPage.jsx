import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddressForm from './AddressForm';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddAddress = (address) => {
    if (editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = address;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, address]);
    }
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Addresses</Typography>

      {!showForm && (
        <Box mb={2}>
          {addresses.length === 0 ? (
            <Typography>You have no saved address, please add a new one.</Typography>
          ) : (
            <Grid container spacing={2}>
              {addresses.map((address, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography><strong>{address.firstName} {address.lastName}</strong></Typography>
                      <Typography>{address.phone}</Typography>
                      <Typography>{address.address1}, {address.address2}</Typography>
                      <Typography>{address.city}, {address.state}, {address.country} - {address.zip}</Typography>
                      <IconButton onClick={() => handleEdit(index)}><Edit /></IconButton>
                      <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setShowForm(true)}>
            Add New Address
          </Button>
        </Box>
      )}

      {showForm && (
        <AddressForm
          onSave={handleAddAddress}
          onCancel={() => {
            setShowForm(false);
            setEditIndex(null);
          }}
          initialData={editIndex !== null ? addresses[editIndex] : null}
        />
      )}
    </Box>
  );
};

export default AddressPage;
