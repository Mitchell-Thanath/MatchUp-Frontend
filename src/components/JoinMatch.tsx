import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import api from '../services/api';

const JoinMatch: React.FC = () => {
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Using a mock user ID for now
      const result = await api.joinMatch(inviteCode, 'user123');
      console.log('Joined match:', result);
      // Handle success (e.g., redirect to predictions page)
    } catch (error) {
      console.error('Error joining match:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Join a Match
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Invite Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            margin="normal"
          />
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Join Match
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default JoinMatch;
