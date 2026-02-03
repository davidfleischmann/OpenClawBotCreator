import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import type { User } from '../types/agent';

export const useGoogleAuth = (onSuccess: (user: User) => void) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isPlaceholder = import.meta.env.VITE_GOOGLE_CLIENT_ID?.includes('your-google-client-id');

    const handleSimulation = useCallback(async () => {
        setIsAuthenticating(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 800));

        onSuccess({
            id: 'sim-123',
            name: 'David Fleischmann (Demo)',
            email: 'david@openclaw.ai',
            role: 'user',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
        });
        setIsAuthenticating(false);
    }, [onSuccess]);

    const realLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsAuthenticating(true);
            setError(null);

            try {
                // In a real scenario, you'd send tokenResponse.access_token to your backend
                // or use the userinfo endpoint. For this integration, we'll fetch from Google's userinfo.
                const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });

                if (!response.ok) throw new Error('Failed to fetch user profile');

                const profile = await response.json();

                const user: User = {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    role: profile.email === 'admin@openclaw.ai' ? 'admin' : 'user',
                    avatar: profile.picture
                };

                onSuccess(user);
            } catch (err) {
                console.error('Google Profile Fetch Error:', err);
                setError('Failed to retrieve profile information from Google.');
            } finally {
                setIsAuthenticating(false);
            }
        },
        onError: (errorResponse) => {
            console.error('Google Login Error:', errorResponse);
            setError('Google authentication failed. Please try again.');
            setIsAuthenticating(false);
        }
    });

    return {
        login: isPlaceholder ? handleSimulation : realLogin,
        isAuthenticating,
        error,
        isSimulated: isPlaceholder
    };
};
