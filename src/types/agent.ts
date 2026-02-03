export type MessagingPlatform = 'telegram' | 'whatsapp' | 'discord';

export interface AgentConfig {
    id: string;
    name: string;
    platform: MessagingPlatform;
    apiKey: string;
    capabilities: string[];
    status: 'stopped' | 'running' | 'deploying' | 'error';
    createdAt: number;
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    icon?: string;
}
