export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface UserEntity extends BaseEntity {
  email: string;
  display_name?: string;
  avatar_url?: string;
  is_active: boolean;
}

export interface AuthSession {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user: UserEntity;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  display_name?: string;
}
