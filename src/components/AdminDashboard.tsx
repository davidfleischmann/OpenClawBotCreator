import { type FC, useEffect, useState } from 'react';
import { ConfigService } from '../utils/ConfigService';
import type { AgentConfig } from '../types/agent';
import './AdminDashboard.css';

const AdminDashboard: FC = () => {
    const [allAgents, setAllAgents] = useState<AgentConfig[]>([]);

    useEffect(() => {
        setAllAgents(ConfigService.getAgents());
    }, []);

    return (
        <div className="admin-dashboard glass">
            <header className="admin-header">
                <h1>Platform <span className="neon-text">Administration</span></h1>
                <p className="subtitle">Overseeing all active deployments across the OpenClaw network.</p>
            </header>

            <div className="admin-stats-grid">
                <div className="stat-card glass">
                    <h3>Total Agents</h3>
                    <p className="stat-value">{allAgents.length}</p>
                </div>
                <div className="stat-card glass">
                    <h3>Healthy Deployments</h3>
                    <p className="stat-value status-online">
                        {allAgents.filter(a => a.status === 'running').length}
                    </p>
                </div>
                <div className="stat-card glass">
                    <h3>System Load</h3>
                    <p className="stat-value">Low</p>
                </div>
            </div>

            <section className="all-agents-list">
                <h2>All Deployed Agents</h2>
                <div className="table-container glass">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Agent Name</th>
                                <th>Platform</th>
                                <th>Owner</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAgents.map(agent => (
                                <tr key={agent.id}>
                                    <td><strong>{agent.name}</strong></td>
                                    <td>{agent.platform}</td>
                                    <td>{agent.ownerName || 'Unknown'}</td>
                                    <td>
                                        <span className={`status-dot ${agent.status}`}></span>
                                        {agent.status}
                                    </td>
                                    <td>{new Date(agent.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn-table-action">Logs</button>
                                        <button className="btn-table-action danger">Stop</button>
                                    </td>
                                </tr>
                            ))}
                            {allAgents.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="empty-state">No agents deployed on the platform.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
