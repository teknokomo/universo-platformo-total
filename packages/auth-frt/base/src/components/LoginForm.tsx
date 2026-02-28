import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  Paper,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterSuccess?: (requiresConfirmation: boolean) => void;
}

type TabValue = 'login' | 'register';

export function LoginForm({ onSuccess, onRegisterSuccess }: LoginFormProps) {
  const [tab, setTab] = useState<TabValue>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (tab === 'login') {
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
        } else {
          onSuccess?.();
        }
      } else {
        const result = await signUp(email, password, displayName || undefined);
        if (result.error) {
          setError(result.error);
        } else if (result.requiresConfirmation) {
          setSuccessMessage('Please check your email to confirm your account.');
          onRegisterSuccess?.(true);
        } else {
          onRegisterSuccess?.(false);
          onSuccess?.();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
        Universo Platformo
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, newValue: TabValue) => {
          setTab(newValue);
          setError(null);
          setSuccessMessage(null);
        }}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="Sign In" value="login" />
        <Tab label="Sign Up" value="register" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {tab === 'register' && (
          <TextField
            label="Display Name"
            type="text"
            fullWidth
            margin="normal"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            autoComplete="name"
          />
        )}

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus={tab === 'login'}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
          helperText={tab === 'register' ? 'Minimum 8 characters' : undefined}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading || !email || !password}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : tab === 'login' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;
