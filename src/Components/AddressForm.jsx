import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';

const AddressForm = ({ onSave, onCancel, initialData }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {['firstName', 'lastName', 'phone', 'company', 'address1', 'address2', 'city', 'state', 'country', 'zip'].map((field) => (
          <Grid item xs={12} sm={field === 'address1' || field === 'address2' ? 12 : 6} key={field}>
            <TextField
              fullWidth
              name={field}
              label={field.replace(/([A-Z])/g, ' $1')}
              value={form[field]}
              onChange={handleChange}
              required={['firstName', 'lastName', 'phone', 'address1', 'city', 'state', 'country', 'zip'].includes(field)}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">Save Address</Button>
        <Button onClick={onCancel} sx={{ ml: 2 }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default AddressForm;
