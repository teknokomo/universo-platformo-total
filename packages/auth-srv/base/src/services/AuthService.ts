import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { AuthCredentials, RegisterCredentials, AuthSession, UserEntity } from '@universo-platformo/types';
import { logger, ERROR_CODES } from '@universo-platformo/utils';

const SERVICE_NAME = 'auth-srv';

export class AuthService {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  async login(credentials: AuthCredentials): Promise<AuthSession> {
    logger.info(SERVICE_NAME, 'Login attempt', { email: credentials.email });

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || !data.session || !data.user) {
      logger.warn(SERVICE_NAME, 'Login failed', { email: credentials.email, error: error?.message });
      throw new Error(ERROR_CODES.AUTH_INVALID_CREDENTIALS);
    }

    logger.info(SERVICE_NAME, 'Login successful', { userId: data.user.id });

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user: this.mapUser(data.user),
    };
  }

  async register(credentials: RegisterCredentials): Promise<AuthSession> {
    logger.info(SERVICE_NAME, 'Registration attempt', { email: credentials.email });

    const { data, error } = await this.supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          display_name: credentials.display_name,
        },
      },
    });

    if (error || !data.user) {
      logger.warn(SERVICE_NAME, 'Registration failed', {
        email: credentials.email,
        error: error?.message,
      });
      if (error?.message?.includes('already registered')) {
        throw new Error(ERROR_CODES.AUTH_EMAIL_TAKEN);
      }
      throw new Error(error?.message || ERROR_CODES.SERVER_ERROR);
    }

    if (!data.session) {
      // Email confirmation required
      logger.info(SERVICE_NAME, 'Registration requires email confirmation', { userId: data.user.id });
      return {
        access_token: '',
        user: this.mapUser(data.user),
      };
    }

    logger.info(SERVICE_NAME, 'Registration successful', { userId: data.user.id });

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user: this.mapUser(data.user),
    };
  }

  async logout(_accessToken: string): Promise<void> {
    logger.info(SERVICE_NAME, 'Logout attempt');

    const { error } = await this.supabase.auth.signOut();

    if (error) {
      logger.warn(SERVICE_NAME, 'Logout error', { error: error.message });
    }

    logger.info(SERVICE_NAME, 'Logout successful');
  }

  async getSession(accessToken: string): Promise<AuthSession | null> {
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      return null;
    }

    return {
      access_token: accessToken,
      user: this.mapUser(data.user),
    };
  }

  async refreshSession(refreshToken: string): Promise<AuthSession> {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session || !data.user) {
      throw new Error(ERROR_CODES.AUTH_TOKEN_EXPIRED);
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user: this.mapUser(data.user),
    };
  }

  private mapUser(user: User): UserEntity {
    return {
      id: user.id,
      email: user.email ?? '',
      display_name: user.user_metadata?.display_name,
      avatar_url: user.user_metadata?.avatar_url,
      is_active: true,
      created_at: user.created_at,
      updated_at: user.updated_at ?? user.created_at,
    };
  }
}
