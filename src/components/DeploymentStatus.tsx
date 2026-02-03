import { useState, useEffect, type FC } from 'react';
import './DeploymentStatus.css';

interface DeploymentStatusProps {
    agentName: string;
    onClose: () => void;
}

const DeploymentStatus: FC<DeploymentStatusProps> = ({ agentName, onClose }) => {
    const [status, setStatus] = useState<'initializing' | 'provisioning' | 'deploying' | 'running'>('initializing');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const statusSequence: Array<'initializing' | 'provisioning' | 'deploying' | 'running'> = [
            'initializing', 'provisioning', 'deploying', 'running'
        ];

        let currentIdx = 0;

        const interval = setInterval(() => {
            if (currentIdx < statusSequence.length - 1) {
                currentIdx++;
                setStatus(statusSequence[currentIdx]);
                setProgress((currentIdx / (statusSequence.length - 1)) * 100);

                // Add log messages
                const messages = {
                    'provisioning': `Provisioning isolated Docker container for ${agentName}...`,
                    'deploying': 'Cloning OpenClaw repository and installing dependencies...',
                    'running': 'Agent started successfully! Listening for messages.',
                };
                // @ts-ignore
                if (messages[statusSequence[currentIdx]]) {
                    // @ts-ignore
                    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[statusSequence[currentIdx]]}`]);
                }
            } else {
                clearInterval(interval);
            }
        }, 2000);

        setLogs([`[${new Date().toLocaleTimeString()}] Initializing deployment for ${agentName}...`]);

        return () => clearInterval(interval);
    }, [agentName]);

    return (
        <div className="deployment-status glass">
            <div className="status-header">
                <h2>Deployment: <span className="neon-text">{agentName}</span></h2>
                <span className={`status-badge ${status}`}>{status.toUpperCase()}</span>
            </div>

            <div className="progress-container">
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="progress-text">{Math.round(progress)}% Complete</span>
            </div>

            <div className="logs-container">
                <h3>Live Logs</h3>
                <div className="logs-viewer">
                    {logs.map((log, i) => (
                        <div key={i} className="log-line">{log}</div>
                    ))}
                    {status !== 'running' && <div className="log-line pulse">...</div>}
                </div>
            </div>

            <div className="status-footer">
                {status === 'running' && (
                    <button className="btn-primary" onClick={onClose}>Finish & Return</button>
                )}
            </div>
        </div>
    );
};

export default DeploymentStatus;
