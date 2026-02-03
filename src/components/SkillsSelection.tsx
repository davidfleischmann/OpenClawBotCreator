import { type FC } from 'react';
import './SkillsSelection.css';
import type { Skill } from '../types/agent';

const AVAILABLE_SKILLS: Skill[] = [
    { id: 'browser', name: 'Browser Control', description: 'Allows the agent to navigate the web and interact with pages.', icon: '🌐' },
    { id: 'file', name: 'File Manager', description: 'Enables reading and writing files to the local system.', icon: '📁' },
    { id: 'terminal', name: 'Terminal Access', description: 'Allows running shell commands and scripts.', icon: '💻' },
    { id: 'email', name: 'Email Management', description: 'Can read, draft, and send emails.', icon: '📧' },
    { id: 'calendar', name: 'Calendar', description: 'Schedule and manage appointments.', icon: '📅' },
    { id: 'code', name: 'Code Interpreter', description: 'Executes Python or JS code to solve problems.', icon: '🔢' },
];

interface SkillsSelectionProps {
    selectedSkills: string[];
    onToggleSkill: (skillId: string) => void;
}

const SkillsSelection: FC<SkillsSelectionProps> = ({ selectedSkills, onToggleSkill }) => {
    return (
        <div className="skills-selection">
            <div className="skills-grid">
                {AVAILABLE_SKILLS.map((skill) => (
                    <div
                        key={skill.id}
                        className={`skill-card glass ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                        onClick={() => onToggleSkill(skill.id)}
                    >
                        <div className="skill-icon-wrapper">
                            <span className="skill-icon">{skill.icon}</span>
                            {selectedSkills.includes(skill.id) && <span className="check-badge">✓</span>}
                        </div>
                        <div className="skill-info">
                            <h3>{skill.name}</h3>
                            <p>{skill.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsSelection;
