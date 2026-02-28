import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
} from '@mui/material';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarInitials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Alex Chen',
    role: 'AR/VR Developer',
    company: 'TechVision Studio',
    content:
      'Universo Platformo revolutionized how we create AR experiences. The visual editor is intuitive and the UPDL nodes make complex 3D scene creation accessible to our entire team.',
    rating: 5,
    avatarInitials: 'AC',
    avatarColor: '#1565c0',
  },
  {
    id: '2',
    author: 'Maria Rodriguez',
    role: 'Educational Tech Lead',
    company: 'LearnSphere',
    content:
      'We use Universo to create interactive educational experiences. The LangChain integration allows us to build AI-powered tutors with just a few nodes. Incredible platform!',
    rating: 5,
    avatarInitials: 'MR',
    avatarColor: '#6a1b9a',
  },
  {
    id: '3',
    author: 'Dmitri Volkov',
    role: 'Game Developer',
    company: 'Pixel Worlds',
    content:
      'The multiplayer capabilities and MMOOMM template saved us months of development time. Building persistent virtual worlds has never been this straightforward.',
    rating: 5,
    avatarInitials: 'DV',
    avatarColor: '#1b5e20',
  },
];

export function TestimonialsSection() {
  return (
    <Box sx={{ py: 10, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          What Creators Say
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
        >
          Join thousands of developers, artists, and creators building the next generation of
          immersive experiences
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map(testimonial => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: testimonial.avatarColor, fontWeight: 'bold' }}>
                      {testimonial.avatarInitials}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {testimonial.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default TestimonialsSection;
