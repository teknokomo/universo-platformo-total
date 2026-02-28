import { validateEnv, logger } from '@universo-platformo/utils';

// Validate required environment variables
validateEnv({
  required: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'],
  optional: ['PORT', 'JWT_SECRET'],
});

logger.info('auth-srv', 'Auth service starting...');

// Export services for use in other packages
export { AuthService } from './services/AuthService';
