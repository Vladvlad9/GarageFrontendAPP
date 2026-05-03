import type {SignInRequest, SignUpRequest, TokenPair, UserProfile} from "../types/auth.ts";
import {requestJson} from "./client.ts";

export function signIn(data: SignInRequest): Promise<TokenPair> {
    return requestJson<TokenPair>("/auth/signin", {
        method: "POST",
        data: data,
    })
}

export function signUp(data: SignUpRequest): Promise<UserProfile> {
    return requestJson<UserProfile>('/auth/signup', {
        method: "POST",
        data: data
    })
}