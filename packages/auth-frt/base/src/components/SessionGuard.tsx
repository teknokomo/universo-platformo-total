import React, { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm';

interface SessionGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SessionGuard({ children, fallback }: SessionGuardProps) {
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
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 2,
        }}
      >
        <LoginForm />
      </Box>
    );
  }

  return <>{children}</>;
}

export default SessionGuard;
