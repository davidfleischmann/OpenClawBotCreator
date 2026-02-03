export type MessagingPlatform = 'telegram' | 'whatsapp' | 'discord';

export interface AgentVersion {
    versionId: string;
    config: Omit<AgentConfig, 'history' | 'version'>;
    timestamp: number;
}

export interface AgentConfig {
    id: string;
    name: string;
    description: string;
    platform: MessagingPlatform;
    apiKey: string;
    skills: string[];
    status: 'stopped' | 'running' | 'deploying' | 'error';
    createdAt: number;
    version: number;
    history: AgentVersion[];
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    icon?: string;
}
