export type UserRole = 'admin' | 'viewer';

export type AuthUser = {
    name: string;
    email: string;
    sub: string; // Okta user ID
    user_role: UserRole;
};

export type AuthState = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};