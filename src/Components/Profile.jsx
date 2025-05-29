// src/pages/Account/Profile.js
import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Profile = () => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile Information
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
          maxWidth: 500,
        }}
      >
        <TextField label="Full Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" type="email" fullWidth />
        <TextField label="Phone Number" variant="outlined" fullWidth />
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;
