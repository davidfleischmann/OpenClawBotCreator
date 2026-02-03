import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar glass">
                        <span>🔍</span>
                        <input type="text" placeholder="Search agents or deployments..." />
                    </div>
                    <div className="header-actions">
                        <button className="btn-notification">🔔</button>
                        <button className="btn-create neon-border">Create New Agent</button>
                    </div>
                </header>
                <section className="content-area">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default Layout;
