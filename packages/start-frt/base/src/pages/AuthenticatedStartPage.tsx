import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '@universo-platformo/auth-frt';
import { OnboardingWizard } from '../components/OnboardingWizard';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'workspace',
    title: 'New Workspace',
    description: 'Create a new Unik workspace',
    icon: '🗂️',
    color: '#e8eaf6',
  },
  {
    id: 'canvas',
    title: 'New Canvas',
    description: 'Start a blank visual canvas',
    icon: '🎨',
    color: '#e8f5e9',
  },
  {
    id: 'ar-scene',
    title: 'AR Scene',
    description: 'Build an AR experience',
    icon: '🥽',
    color: '#fff3e0',
  },
  {
    id: 'ai-flow',
    title: 'AI Workflow',
    description: 'Create LangChain workflow',
    icon: '🤖',
    color: '#fce4ec',
  },
];

export function AuthenticatedStartPage() {
  const { user, signOut, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userEmail = user?.email;
  const emailUsername = typeof userEmail === 'string' && userEmail.includes('@')
    ? userEmail.split('@')[0]
    : null;
  const displayName: string =
    user?.display_name ??
    emailUsername ??
    'User';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  if (isLoading) return null;

  if (showOnboarding) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1a237e' }}>
              Universo Platformo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Toolbar>
        </AppBar>
        <OnboardingWizard
          userName={displayName}
          onComplete={() => setShowOnboarding(false)}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* App Bar */}
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <DashboardIcon sx={{ color: '#1a237e', mr: 1.5 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1a237e' }}>
            Universo Platformo
          </Typography>

          <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar sx={{ bgcolor: '#1a237e', width: 36, height: 36, fontSize: '0.9rem' }}>
              {avatarInitial}
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                signOut();
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome back, {displayName}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue building your immersive experiences
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {quickActions.map(action => (
            <Grid item xs={6} sm={3} key={action.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  textAlign: 'center',
                  bgcolor: action.color,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {action.icon}
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {action.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Recent Workspaces (Empty State) */}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
        >
          <Typography variant="h6" fontWeight="bold">
            Your Workspaces
          </Typography>
          <Button startIcon={<AddIcon />} variant="outlined" size="small">
            New Workspace
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'white',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            🗂️
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            No workspaces yet
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
          >
            Create your first workspace (Unik) to organize your projects and canvases
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Workspace
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default AuthenticatedStartPage;
