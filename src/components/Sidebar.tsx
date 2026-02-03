import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar glass">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">⚙️</span>
                    <h1 className="neon-text">OpenClaw</h1>
                    <p className="subtitle">Creator</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className="active"><span className="icon">🏠</span> Dashboard</li>
                    <li><span className="icon">🤖</span> Agents</li>
                    <li><span className="icon">🚀</span> Deployments</li>
                    <li><span className="icon">⚙️</span> Settings</li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">DF</div>
                    <div className="user-info">
                        <p className="user-name">David F.</p>
                        <p className="user-role">Developer</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
