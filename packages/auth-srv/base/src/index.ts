import { validateEnv, logger } from '@universo-platformo/utils';

// Validate required environment variables
validateEnv({
  required: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'],
  optional: ['PORT', 'JWT_SECRET'],
});

logger.info('auth-srv', 'Auth service starting...');

// Export services for use in other packages
export { AuthService } from './services/AuthService';

// When executed directly (e.g. via `pnpm dev`), bootstrap Total.js
// and register auth routes so the service is actually reachable over HTTP.
if (require.main === module) {
  (async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('total5');

      // Load and register HTTP routes for the auth service
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { registerRoutes } = require('./controllers/auth.controller');
      registerRoutes();

      const port = parseInt(process.env.PORT || '5000', 10);
      logger.info('auth-srv', `Starting Total.js server on port ${port}...`);
      Total.run({ port });
    } catch (err) {
      logger.error('auth-srv', 'Failed to start Total.js server', {
        error: err instanceof Error ? err.message : String(err),
      });
      process.exit(1);
    }
  })();
}
