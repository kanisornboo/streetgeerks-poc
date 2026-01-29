"use client"

import { createContext, useContext } from "react"

// Type for mock user with password (internal storage)
export interface MockUserWithPassword {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  imageUrl: string | null
}

// Mock user data for POC
export const MOCK_USERS: MockUserWithPassword[] = [
  {
    id: "user_demo_001",
    email: "demo@streetleague.org",
    password: "Demo123!",
    firstName: "Demo",
    lastName: "User",
    role: "admin",
    imageUrl: null,
  },
  {
    id: "user_trainer_001",
    email: "trainer@streetleague.org",
    password: "Trainer123!",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "trainer",
    imageUrl: null,
  },
  {
    id: "user_participant_001",
    email: "participant@streetleague.org",
    password: "Participant123!",
    firstName: "John",
    lastName: "Smith",
    role: "participant",
    imageUrl: null,
  },
]

export interface MockUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  imageUrl: string | null
}

export interface MockAuthState {
  isLoaded: boolean
  isSignedIn: boolean
  user: MockUser | null
}

export interface MockAuthContextType extends MockAuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const MockAuthContext = createContext<MockAuthContextType | null>(null)

export function useMockAuth() {
  const context = useContext(MockAuthContext)
  if (!context) {
    throw new Error("useMockAuth must be used within a MockAuthProvider")
  }
  return context
}

// Storage key for persisting mock auth state
export const MOCK_AUTH_STORAGE_KEY = "skillbuilder_mock_auth"

// Helper to get stored auth state
export function getStoredAuthState(): MockAuthState {
  if (typeof window === "undefined") {
    return { isLoaded: false, isSignedIn: false, user: null }
  }
  
  try {
    const stored = localStorage.getItem(MOCK_AUTH_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { isLoaded: true, isSignedIn: true, user: parsed }
    }
  } catch {
    // Invalid stored data
  }
  
  return { isLoaded: true, isSignedIn: false, user: null }
}

// Helper to store auth state
export function storeAuthState(user: MockUser | null) {
  if (typeof window === "undefined") return
  
  if (user) {
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(MOCK_AUTH_STORAGE_KEY)
  }
}
