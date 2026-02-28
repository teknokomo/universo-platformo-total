import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Chip } from '@mui/material';
import { HeroSection } from '../components/HeroSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FooterSection } from '../components/FooterSection';
import { LoginForm } from '@universo-platformo/auth-frt';

export function GuestStartPage() {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = () => {
    setShowLogin(true);
    // Scroll to auth section
    setTimeout(() => {
      document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Box>
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            Everything You Need to Build
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
          >
            From AR/VR scenes to AI workflows, Universo Platformo has the tools to bring your
            vision to life
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: 'Visual Node Editor',
                description: 'Drag-and-drop canvas editor with real-time preview',
                tags: ['React Flow', 'Real-time'],
                color: '#e8eaf6',
              },
              {
                title: 'UPDL Scene Nodes',
                description: 'Universal nodes for 3D/AR/VR scene description',
                tags: ['AR.js', 'PlayCanvas', '3D'],
                color: '#e8f5e9',
              },
              {
                title: 'LangChain Integration',
                description: 'AI-powered nodes for building intelligent workflows',
                tags: ['GPT-4', 'Claude', 'AI'],
                color: '#fff3e0',
              },
              {
                title: 'Multiplayer Support',
                description: 'Real-time collaboration with Colyseus server',
                tags: ['WebSocket', 'Real-time'],
                color: '#fce4ec',
              },
              {
                title: 'Workspace Management',
                description: 'Organize projects with Uniks, Spaces, and Canvases',
                tags: ['Hierarchy', 'Organization'],
                color: '#e1f5fe',
              },
              {
                title: 'One-Click Publishing',
                description: 'Export to AR.js or PlayCanvas with shareable URLs',
                tags: ['Export', 'Share', 'AR'],
                color: '#f3e5f5',
              },
            ].map(feature => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: feature.color,
                    borderRadius: 3,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {feature.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <TestimonialsSection />

      {/* Auth Section */}
      <Box id="auth-section" sx={{ py: 10, bgcolor: '#f9f9f9' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            {showLogin ? 'Join Universo Platformo' : 'Start Building Today'}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Create a free account and start building immersive experiences
          </Typography>
          {showLogin ? (
            <LoginForm />
          ) : (
            <Box textAlign="center">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setShowLogin(true)}
              >
                Sign in or create an account to get started →
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      <FooterSection />
    </Box>
  );
}

export default GuestStartPage;
