import { type FC } from 'react';
import type { User } from '../types/agent';
import './Login.css';

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
    const handleGoogleLogin = () => {
        // Simulate Google Authentication Flow
        const mockUser: User = {
            id: crypto.randomUUID(),
            name: 'David Fleischmann',
            email: 'david@openclaw.ai',
            role: 'user',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
        };
        onLogin(mockUser);
    };

    const handleAdminLogin = () => {
        // Shortcut for demo purposes
        const adminUser: User = {
            id: 'admin-123',
            name: 'System Admin',
            email: 'admin@openclaw.ai',
            role: 'admin',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        };
        onLogin(adminUser);
    };

    return (
        <div className="login-container">
            <div className="login-card glass">
                <div className="login-header">
                    <div className="logo">
                        <span className="logo-icon">⚙️</span>
                        <h1 className="neon-text">OpenClaw</h1>
                        <p className="subtitle">Creator</p>
                    </div>
                    <h2>Welcome to the Future of AI Agents</h2>
                    <p>Sign in to start building and deploying your autonomous assistants.</p>
                </div>

                <div className="social-login-grid">
                    <button className="social-btn google" onClick={handleGoogleLogin}>
                        <span className="social-icon">G</span>
                        Continue with Google
                    </button>
                    <button className="social-btn github" onClick={handleGoogleLogin}>
                        <span className="social-icon">🐙</span>
                        Continue with GitHub
                    </button>
                    <button className="social-btn apple" onClick={handleGoogleLogin}>
                        <span className="social-icon">🍎</span>
                        Continue with Apple
                    </button>
                    <button className="social-btn facebook" onClick={handleGoogleLogin}>
                        <span className="social-icon">f</span>
                        Continue with Facebook
                    </button>

                    <div className="divider"><span>OR</span></div>

                    <button className="social-btn admin-demo" onClick={handleAdminLogin}>
                        <span className="social-icon">🛡️</span>
                        Login as Administrator (Demo)
                    </button>
                </div>

                <div className="login-footer">
                    <p>By signing in, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
