import type { AgentConfig, AgentVersion } from '../types/agent';

const STORAGE_KEY = 'openclaw_agents';
const MAX_VERSIONS = 5;

export const ConfigService = {
    getAgents: (): AgentConfig[] => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveAgent: (config: Omit<AgentConfig, 'history' | 'version' | 'id' | 'createdAt' | 'status'>, id?: string): AgentConfig => {
        const agents = ConfigService.getAgents();
        let agent: AgentConfig;

        if (id) {
            const existingIdx = agents.findIndex(a => a.id === id);
            if (existingIdx === -1) throw new Error('Agent not found');

            const existing = agents[existingIdx];

            // Create new version from current config before updating
            const newVersion: AgentVersion = {
                versionId: crypto.randomUUID(),
                config: { ...existing },
                timestamp: Date.now()
            };

            const history = [newVersion, ...(existing.history || [])].slice(0, MAX_VERSIONS);

            agent = {
                ...existing,
                ...config,
                version: existing.version + 1,
                history
            };

            agents[existingIdx] = agent;
        } else {
            agent = {
                id: crypto.randomUUID(),
                ...config,
                status: 'stopped',
                createdAt: Date.now(),
                version: 1,
                history: []
            };
            agents.push(agent);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
        return agent;
    },

    restoreVersion: (agentId: string, versionId: string): AgentConfig => {
        const agents = ConfigService.getAgents();
        const agentIdx = agents.findIndex(a => a.id === agentId);
        if (agentIdx === -1) throw new Error('Agent not found');

        const agent = agents[agentIdx];
        const version = agent.history.find(v => v.versionId === versionId);
        if (!version) throw new Error('Version not found');

        // Create a new version of the current state before restoring
        const backupVersion: AgentVersion = {
            versionId: crypto.randomUUID(),
            config: { ...agent },
            timestamp: Date.now()
        };

        const restoredAgent: AgentConfig = {
            ...version.config,
            id: agent.id, // Keep ID
            version: agent.version + 1,
            history: [backupVersion, ...agent.history].slice(0, MAX_VERSIONS)
        };

        agents[agentIdx] = restoredAgent;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
        return restoredAgent;
    }
};
