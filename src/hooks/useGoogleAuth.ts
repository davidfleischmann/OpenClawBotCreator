import { useState, useCallback } from 'react';
import type { User } from '../types/agent';

export const useGoogleAuth = (onSuccess: (user: User) => void) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async () => {
        setIsAuthenticating(true);
        setError(null);

        try {
            // Simulate the delay of redirecting to Google and user interacting
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate profile retrieval
            const mockUser: User = {
                id: `google-${Math.floor(Math.random() * 1000000)}`,
                name: 'David Fleischmann',
                email: 'david@openclaw.ai',
                role: 'user',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
            };

            // Demo condition for admin
            if (window.location.search.includes('admin=true')) {
                mockUser.role = 'admin';
                mockUser.name = 'System Admin';
                mockUser.email = 'admin@openclaw.ai';
            }

            onSuccess(mockUser);
        } catch (err) {
            setError('Failed to authenticate with Google. Please try again.');
        } finally {
            setIsAuthenticating(false);
        }
    }, [onSuccess]);

    return {
        login,
        isAuthenticating,
        error
    };
};
