'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
    emailVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    verify: (data: { email: string; code: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error('Check auth error:', err);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials: any) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                const roleSlug = data.user.role.toLowerCase().replace(/_/g, '-');
                router.push(`/${roleSlug}`);
            } else {
                if (data.emailVerified === false) {
                    throw new Error('EMAIL_NOT_VERIFIED');
                }
                throw new Error(data.error || 'Login failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: any) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (res.ok) {
                sessionStorage.setItem('pendingVerification', JSON.stringify({
                    email: userData.email,
                    role: userData.role,
                    fullName: userData.fullName,
                }));
                router.push('/verify-email');
            } else {
                throw new Error(data.error || 'Registration failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const verify = async (verifyData: { email: string; code: string }) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(verifyData),
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                const roleSlug = data.user.role.toLowerCase().replace(/_/g, '-');
                router.push(`/dashboards/${roleSlug}`);
            } else {
                throw new Error(data.error || 'Verification failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            router.push('/login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, verify, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
