import { useState } from 'react'
import Layout from './components/Layout'
import AgentCreationForm from './components/AgentCreationForm'
import DeploymentStatus from './components/DeploymentStatus'
import './App.css'

function App() {
  const [view, setView] = useState<'dashboard' | 'create' | 'deploying'>('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string>('');

  const startDeployment = (name: string) => {
    setSelectedAgent(name);
    setView('deploying');
  };

  return (
    <Layout>
      <div className="dashboard-home">
        {view === 'dashboard' && (
          <>
            <header className="content-header">
              <h1>Welcome back, <span className="neon-text">David</span></h1>
              <div className="header-flex">
                <p className="subtitle">Manage your OpenClaw agents and deployments from here.</p>
                <button className="btn-primary" onClick={() => setView('create')}>+ Create New Agent</button>
              </div>
            </header>

            <div className="stats-grid">
              <div className="stat-card glass">
                <h3>Active Agents</h3>
                <p className="stat-value">3</p>
              </div>
              <div className="stat-card glass">
                <h3>Deployments</h3>
                <p className="stat-value">12</p>
              </div>
              <div className="stat-card glass">
                <h3>System Status</h3>
                <p className="stat-value status-online">Online</p>
              </div>
            </div>

            <section className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list glass">
                <div className="activity-item">
                  <span className="activity-icon">✅</span>
                  <div className="activity-info">
                    <p>Agent <strong>Alpha-Bot</strong> successfully deployed to Telegram.</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">⚠️</span>
                  <div className="activity-info">
                    <p>Agent <strong>Beta-Bot</strong> encountered an error during startup.</p>
                    <span className="activity-time">5 hours ago</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'create' && (
          <>
            <header className="content-header">
              <button className="btn-back" onClick={() => setView('dashboard')}>← Back to Dashboard</button>
              <h1>Create <span className="neon-text">New Agent</span></h1>
            </header>
            <AgentCreationForm onDeploy={startDeployment} />
          </>
        )}

        {view === 'deploying' && (
          <DeploymentStatus agentName={selectedAgent} onClose={() => setView('dashboard')} />
        )}
      </div>
    </Layout>
  )
}

export default App
