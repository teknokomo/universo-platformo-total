import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PaletteIcon from '@mui/icons-material/Palette';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

interface UseCase {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    id: 'ar-vr',
    icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
    title: 'AR/VR Experiences',
    description: 'Build immersive augmented and virtual reality experiences',
  },
  {
    id: 'creative',
    icon: <PaletteIcon sx={{ fontSize: 40 }} />,
    title: 'Creative Projects',
    description: 'Create interactive art, visualizations, and media',
  },
  {
    id: 'education',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Education',
    description: 'Develop interactive learning experiences and quizzes',
  },
  {
    id: 'multiplayer',
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    title: 'Multiplayer Worlds',
    description: 'Build MMO games and collaborative virtual spaces',
  },
];

const steps = ['Welcome', 'Your Use Case', 'Set Up Workspace', 'Ready!'];

interface OnboardingWizardProps {
  userName?: string;
  onComplete?: () => void;
}

export function OnboardingWizard({ userName, onComplete }: OnboardingWizardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState('');

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(0, prev - 1));
  };

  const canProceed = () => {
    if (activeStep === 1) return !!selectedUseCase;
    if (activeStep === 2) return workspaceName.trim().length > 0;
    return true;
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Paper
        elevation={0}
        sx={{ maxWidth: 700, mx: 'auto', p: { xs: 3, md: 5 }, borderRadius: 3 }}
      >
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome{userName ? `, ${userName}` : ''}! 🎉
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
            >
              You've joined Universo Platformo — the visual platform for creating immersive AR/VR
              experiences, AI workflows, and multiplayer worlds. Let's set you up!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {['Visual Programming', 'No-Code AR/VR', 'AI Integration', 'Multiplayer'].map(
                feature => (
                  <Box
                    key={feature}
                    sx={{
                      px: 2,
                      py: 0.75,
                      bgcolor: '#e8eaf6',
                      color: '#1a237e',
                      borderRadius: 5,
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    {feature}
                  </Box>
                )
              )}
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              What will you build?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Choose your primary use case to personalize your experience
            </Typography>
            <Grid container spacing={2}>
              {useCases.map(useCase => (
                <Grid item xs={12} sm={6} key={useCase.id}>
                  <Card
                    elevation={0}
                    sx={{
                      border: '2px solid',
                      borderColor: selectedUseCase === useCase.id ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      bgcolor:
                        selectedUseCase === useCase.id ? '#e8eaf6' : 'background.paper',
                    }}
                  >
                    <CardActionArea onClick={() => setSelectedUseCase(useCase.id)} sx={{ p: 2 }}>
                      <CardContent>
                        <Box
                          sx={{
                            color:
                              selectedUseCase === useCase.id ? 'primary.main' : 'text.secondary',
                            mb: 1,
                          }}
                        >
                          {useCase.icon}
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {useCase.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {useCase.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create your first workspace
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              A workspace (Unik) is where your projects and experiences live
            </Typography>
            <TextField
              label="Workspace Name"
              fullWidth
              value={workspaceName}
              onChange={e => setWorkspaceName(e.target.value)}
              placeholder="e.g., My AR Projects, Virtual Gallery..."
              helperText="You can create more workspaces later"
              autoFocus
            />
          </Box>
        )}

        {activeStep === 3 && (
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              You're all set! 🚀
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
            >
              Your workspace <strong>"{workspaceName || 'My Workspace'}"</strong> is ready. Start
              creating your first canvas and bring your ideas to life!
            </Typography>
            <Box
              sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#e8f5e9',
                  borderRadius: 2,
                  textAlign: 'center',
                  minWidth: 120,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  1
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Workspace created
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#e8eaf6',
                  borderRadius: 2,
                  textAlign: 'center',
                  minWidth: 120,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ∞
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Possibilities
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
          <Button onClick={handleBack} disabled={activeStep === 0} variant="outlined">
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={!canProceed()}
            size="large"
          >
            {activeStep === steps.length - 1 ? 'Start Building' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default OnboardingWizard;
