import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@universo-platformo/auth-frt';
import { GuestStartPage } from './GuestStartPage';
import { AuthenticatedStartPage } from './AuthenticatedStartPage';

export function StartPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <AuthenticatedStartPage />;
  }

  return <GuestStartPage />;
}

export default StartPage;
