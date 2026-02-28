import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider, Stack } from '@mui/material';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a237e',
        color: 'white',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Universo Platformo
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8, mb: 2 }}>
              An open-source platform for creating immersive AR/VR experiences, AI-powered
              workflows, and multiplayer virtual worlds using visual programming.
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              Built with Total.js v5 + React + MUI
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Platform
            </Typography>
            <Stack spacing={1}>
              {['Features', 'Documentation', 'API Reference', 'Changelog'].map(item => (
                <Link
                  key={item}
                  href="#"
                  color="inherit"
                  underline="hover"
                  variant="body2"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Community
            </Typography>
            <Stack spacing={1}>
              {['GitHub', 'Discord', 'Forum', 'Blog'].map(item => (
                <Link
                  key={item}
                  href={item === 'GitHub' ? 'https://github.com/teknokomo' : '#'}
                  color="inherit"
                  underline="hover"
                  variant="body2"
                  target={item === 'GitHub' ? '_blank' : undefined}
                  rel={item === 'GitHub' ? 'noopener noreferrer' : undefined}
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {['About', 'Privacy', 'Terms', 'Contact'].map(item => (
                <Link
                  key={item}
                  href="#"
                  color="inherit"
                  underline="hover"
                  variant="body2"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Languages
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'English', href: '#' },
                { label: 'Русский', href: '#' },
              ].map(lang => (
                <Link
                  key={lang.label}
                  href={lang.href}
                  color="inherit"
                  underline="hover"
                  variant="body2"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {lang.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Teknokomo. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Open source under MIT License
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default FooterSection;
