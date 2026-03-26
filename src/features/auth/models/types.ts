export type AuthUser = {
    name: string;
    email: string;
    sub: string; // Okta user ID
};

export type AuthState = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};