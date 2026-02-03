import { type FC } from 'react';
import './Login.css';

interface LoginProps {
    onLogin: () => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
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
                    <button className="social-btn google" onClick={onLogin}>
                        <span className="social-icon">G</span>
                        Continue with Google
                    </button>
                    <button className="social-btn github" onClick={onLogin}>
                        <span className="social-icon">🐙</span>
                        Continue with GitHub
                    </button>
                    <button className="social-btn apple" onClick={onLogin}>
                        <span className="social-icon">🍎</span>
                        Continue with Apple
                    </button>
                    <button className="social-btn facebook" onClick={onLogin}>
                        <span className="social-icon">f</span>
                        Continue with Facebook
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
