type AuthStatus = "idle" | "loading" | "authenticated" | "error";

export interface AuthState {
    status: AuthStatus;
    error: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    profile: UserProfile | null;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest extends SignInRequest {
    name: string;
    confirm: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    is_verified: boolean;
}
