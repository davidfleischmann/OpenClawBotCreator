export type MessagingPlatform = 'telegram' | 'whatsapp' | 'discord';

export type UserRole = 'admin' | 'user';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

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
    ownerId: string;
    ownerName: string;
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    icon?: string;
}
