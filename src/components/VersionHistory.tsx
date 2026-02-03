import { type FC } from 'react';
import type { AgentVersion } from '../types/agent';
import './VersionHistory.css';

interface VersionHistoryProps {
    history: AgentVersion[];
    onRestore: (versionId: string) => void;
}

const VersionHistory: FC<VersionHistoryProps> = ({ history, onRestore }) => {
    if (!history || history.length === 0) {
        return <div className="version-history-empty">No previous versions available.</div>;
    }

    return (
        <div className="version-history">
            <h3>Configuration History</h3>
            <div className="version-list">
                {history.map((v) => (
                    <div key={v.versionId} className="version-item glass">
                        <div className="version-info">
                            <span className="version-date">{new Date(v.timestamp).toLocaleString()}</span>
                            <span className="version-name">{v.config.name} ({v.config.platform})</span>
                        </div>
                        <button className="btn-restore" onClick={() => onRestore(v.versionId)}>Restore</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VersionHistory;
