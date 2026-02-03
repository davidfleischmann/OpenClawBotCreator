import { useState, type FC } from 'react';
import './AgentCreationForm.css';
import SkillsSelection from './SkillsSelection';
import type { MessagingPlatform } from '../types/agent';
import { ConfigService } from '../utils/ConfigService';
import type { User } from '../types/agent';

interface AgentCreationFormProps {
    onDeploy: (name: string) => void;
    currentUser: User;
}

const AgentCreationForm: FC<AgentCreationFormProps> = ({ onDeploy, currentUser }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        platform: 'telegram' as MessagingPlatform,
        apiKey: '',
        skills: [] as string[],
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const toggleSkill = (skillId: string) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.includes(skillId)
                ? prev.skills.filter((id) => id !== skillId)
                : [...prev.skills, skillId],
        }));
    };

    const handleDeploy = () => {
        ConfigService.saveAgent(formData, { id: currentUser.id, name: currentUser.name });
        onDeploy(formData.name || 'Unnamed Agent');
    };

    return (
        <div className="agent-form-container glass">
            <div className="form-stepper">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Identity</div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Platform</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Skills</div>
            </div>

            <div className="form-content">
                {step === 1 && (
                    <div className="form-step">
                        <h2>Agent Identity</h2>
                        <div className="input-group">
                            <label>Agent Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Jarvis"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                placeholder="What is the purpose of this bot?"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step">
                        <h2>Platform Connection</h2>
                        <div className="platform-grid">
                            <div
                                className={`platform-card ${formData.platform === 'telegram' ? 'selected' : ''}`}
                                onClick={() => setFormData({ ...formData, platform: 'telegram' })}
                            >
                                <span className="platform-icon">✈️</span>
                                <span>Telegram</span>
                                <button className="btn-platform-help" onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Follow these steps:\n1. Open @BotFather on Telegram\n2. Send /newbot\n3. Copy the API Token provided.');
                                }}>Guide</button>
                            </div>
                            <div
                                className={`platform-card ${formData.platform === 'discord' ? 'selected' : ''}`}
                                onClick={() => setFormData({ ...formData, platform: 'discord' })}
                            >
                                <span className="platform-icon">👾</span>
                                <span>Discord</span>
                                <button className="btn-platform-help" onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Follow these steps:\n1. Go to Discord Developer Portal\n2. Create Application -> Bot\n3. Copy Token.');
                                }}>Guide</button>
                            </div>
                            <div
                                className={`platform-card ${formData.platform === 'whatsapp' ? 'selected' : ''}`}
                                onClick={() => setFormData({ ...formData, platform: 'whatsapp' })}
                            >
                                <span className="platform-icon">💬</span>
                                <span>WhatsApp</span>
                                <button className="btn-platform-help" onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Scan the QR code in the next step to connect your WhatsApp account via OpenClaw Bridge.');
                                }}>Quick Link</button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>API Key / Token</label>
                            <div className="token-input-wrapper">
                                <input
                                    type="password"
                                    placeholder="Enter your platform token"
                                    value={formData.apiKey}
                                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                                />
                                <button className="btn-verify-token" onClick={() => alert('Token verified! Validating connection...')}>Verify</button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step">
                        <h2>Skills & Capabilities</h2>
                        <p>Select the skills your agent should have access to.</p>
                        <SkillsSelection
                            selectedSkills={formData.skills}
                            onToggleSkill={toggleSkill}
                        />
                    </div>
                )}
            </div>

            <div className="form-footer">
                {step > 1 && <button className="btn-secondary" onClick={prevStep}>Back</button>}
                {step < 3 ? (
                    <button className="btn-primary" onClick={nextStep}>Continue</button>
                ) : (
                    <button className="btn-primary neon-border" onClick={handleDeploy}>Create & Deploy Agent</button>
                )}
            </div>
        </div>
    );
};

export default AgentCreationForm;
