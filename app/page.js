'use client'

import { Box, Container, Typography } from '@mui/material';
import PantryTracker from '../components/PantryTracker';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f1f1c5',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ mb: 4, fontWeight: 'bold' }}
          border={'1px solid #333'}
          borderRadius={3}
          backgroundColor='white'
          py={3}
        >
          Pantry Tracker
        </Typography>
        <PantryTracker />
      </Container>
    </Box>
  );
}