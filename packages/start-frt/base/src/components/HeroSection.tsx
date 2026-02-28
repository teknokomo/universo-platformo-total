import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
        color: 'white',
        py: { xs: 8, md: 16 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}
        >
          Universo Platformo
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{ mb: 2, opacity: 0.9, fontSize: { xs: '1.1rem', md: '1.5rem' } }}
        >
          Build immersive AR/VR experiences with visual programming
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 6,
            opacity: 0.8,
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
          }}
        >
          Create interactive 3D worlds, intelligent workflows, and multiplayer experiences using
          our node-based visual editor. No coding required.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{
              bgcolor: 'white',
              color: '#1a237e',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#e8eaf6' },
            }}
          >
            Get Started Free
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="https://github.com/teknokomo/universo-platformo-total"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: 'white',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { borderColor: '#e8eaf6', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            View on GitHub
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroSection;
