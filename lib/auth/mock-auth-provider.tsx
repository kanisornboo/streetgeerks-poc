"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
    MockAuthContext,
    MOCK_USERS,
    getStoredAuthState,
    storeAuthState,
    type MockAuthState,
    type MockUser,
    type SignUpData,
} from "./mock-auth";

interface MockAuthProviderProps {
    children: ReactNode;
}

export function MockAuthProvider({ children }: MockAuthProviderProps) {
    const [authState, setAuthState] = useState<MockAuthState>({
        isLoaded: false,
        isSignedIn: false,
        user: null,
    });

    // Load stored auth state on mount
    useEffect(() => {
        const storedState = getStoredAuthState();
        setAuthState(storedState);
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const user = MOCK_USERS.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password,
        );

        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            storeAuthState(userWithoutPassword);
            setAuthState({
                isLoaded: true,
                isSignedIn: true,
                user: userWithoutPassword,
            });
            return { success: true };
        }

        return { success: false, error: "Invalid email or password" };
    }, []);

    const signUp = useCallback(async (data: SignUpData) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check if user already exists
        const existingUser = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (existingUser) {
            return {
                success: false,
                error: "An account with this email already exists",
            };
        }

        // Create new mock user (in real app this would persist to backend)
        const newUser: MockUser = {
            id: `user_${Date.now()}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: "participant",
            imageUrl: null,
        };

        // Add to mock users array (runtime only, resets on refresh)
        MOCK_USERS.push({ ...newUser, password: data.password });

        storeAuthState(newUser);
        setAuthState({
            isLoaded: true,
            isSignedIn: true,
            user: newUser,
        });

        return { success: true };
    }, []);

    const signOut = useCallback(() => {
        storeAuthState(null);
        setAuthState({
            isLoaded: true,
            isSignedIn: false,
            user: null,
        });
    }, []);

    return (
        <MockAuthContext.Provider
            value={{
                ...authState,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </MockAuthContext.Provider>
    );
}
