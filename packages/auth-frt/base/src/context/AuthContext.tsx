// ============================================================
// auth-frt — AuthContext
//
// Security architecture:
//   - NO direct Supabase client in the browser
//   - All auth operations go through the backend API (/api/auth/*)
//   - Sessions are managed via httpOnly cookies (invisible to JS)
//   - User state is maintained in React context, validated on mount
// ============================================================

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, AuthUser } from '../api/authApi';

interface AuthContextType {
user:            AuthUser | null;
session:         null;   // kept for API compatibility; tokens live in httpOnly cookies
isLoading:       boolean;
isAuthenticated: boolean;
signIn: (
email: string,
password: string
) => Promise<{ error?: string }>;
signUp: (
email: string,
password: string,
displayName?: string
) => Promise<{ error?: string; requiresConfirmation?: boolean }>;
signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
const [user,      setUser]      = useState<AuthUser | null>(null);
const [isLoading, setIsLoading] = useState(true);

// On mount: check if there is an existing valid session cookie.
// The backend validates the httpOnly cookie and returns the user.
useEffect(() => {
authApi.getSession()
.then((result) => {
if (result.success && result.data?.user) {
setUser(result.data.user);
}
})
.catch(() => {
// No session or network error — remain logged out
})
.finally(() => {
setIsLoading(false);
});
}, []);

const signIn = async (
email: string,
password: string
): Promise<{ error?: string }> => {
try {
const result = await authApi.login({ email, password });
if (!result.success || !result.data?.user) {
return { error: result.error?.message || 'Login failed' };
}
setUser(result.data.user);
return {};
} catch {
return { error: 'Login failed. Please try again.' };
}
};

const signUp = async (
email: string,
password: string,
displayName?: string
): Promise<{ error?: string; requiresConfirmation?: boolean }> => {
try {
const result = await authApi.register({
email,
password,
display_name: displayName
});
if (!result.success || !result.data) {
return { error: result.error?.message || 'Registration failed' };
}
if (result.data.requires_confirmation) {
return { requiresConfirmation: true };
}
setUser(result.data.user);
return {};
} catch {
return { error: 'Registration failed. Please try again.' };
}
};

const signOut = async (): Promise<void> => {
await authApi.logout().catch(() => { /* ignore logout errors */ });
setUser(null);
};

const value: AuthContextType = {
user,
session:         null,
isLoading,
isAuthenticated: !!user,
signIn,
signUp,
signOut,
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
const context = useContext(AuthContext);
if (!context) {
throw new Error('useAuthContext must be used within an AuthProvider');
}
return context;
}
