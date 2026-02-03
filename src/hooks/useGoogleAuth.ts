import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import type { User } from '../types/agent';

export const useGoogleAuth = (onSuccess: (user: User) => void) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useGoogleLogin({
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
        login,
        isAuthenticating,
        error
    };
};
