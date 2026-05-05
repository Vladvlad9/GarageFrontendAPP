import {defineStore} from "pinia";
import type {AuthState, SignInRequest, SignUpRequest, TokenPair} from "../types/auth.ts";
import {signIn, signUp} from "../api/auth.ts";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function persistTokens(tokens: TokenPair) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export const useAuthStore = defineStore("authStore", {
    state: (): AuthState => ({
        status: "idle",
        error: null,
        accessToken: null,
        refreshToken: null,
        profile: null,
    }),
    getters: {
        isAuthenticated: (state) => Boolean(state.accessToken),
    },
    actions: {
        restore() {
            if (typeof window === "undefined") {
                return;
            }

            this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
            this.refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            this.status = this.accessToken ? "authenticated" : "idle";
        },

        async signIn(payload: SignInRequest): Promise<Boolean> {
            this.status = "loading"
            this.error = null

            try {
                const tokens: TokenPair = await signIn(payload)
                this.accessToken = tokens.accessToken
                this.refreshToken = tokens.refreshToken

                persistTokens(tokens);
                this.status = "authenticated";
                return true
            } catch (error) {
                this.status = "error";
                this.error = error instanceof Error ? error.message : "Unknown error";
                return false
            } finally {
                this.status = 'idle'
            }
        },

        async signUp(payload: SignUpRequest) {
            this.status = 'loading'
            this.error = null

            try {
                await signUp(payload)
                this.status = "idle";
                return true
            } catch (error) {
                this.status = "error";
                this.error = error instanceof Error ? error.message : "Unknown error";
                return false
            } finally {
                this.status = 'idle'
            }
        },

        signOut() {
            this.status = "idle";
            this.error = null;
            this.accessToken = null;
            this.refreshToken = null;
            this.profile = null;

            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        },
        clearError() {
            this.error = null
        },

    }
})
