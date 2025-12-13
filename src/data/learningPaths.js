import { Hammer, Sword, Shield, GitMerge, Hexagon } from 'lucide-react';

export const LEARNING_PATHS = [
    {
        id: 'forge',
        title: 'FORGE',
        subtitle: 'Foundation / Preparation',
        icon: Hammer,
        color: 'text-blue-400',
        borderColor: 'border-blue-400',
        bgWait: 'bg-blue-400/10',
        philosophy: "Tools are useless without understanding.",
        description: "Baseline cybersecurity literacy and environment readiness. The preparation before the specialization.",
        role: "Observer → Prepared Learner",
        stages: [
            {
                title: "Phase 0: Mental Model",
                modules: [
                    { id: 'f-1', title: "Introduction to Cybersecurity and Computing", status: 'active' }
                ]
            },
            {
                title: "Phase 1: Environment Setup",
                modules: [
                    { id: 'f-2', title: "What is Virtualization and Why It Matters", status: 'locked' },
                    { id: 'f-3', title: "Hypervisors: Type 1 vs Type 2", status: 'locked' },
                    { id: 'f-4', title: "Installing Kali Linux Safely", status: 'locked' },
                    { id: 'f-5', title: "Installing Parrot OS Safely", status: 'locked' },
                    { id: 'f-6', title: "Virtual Networking Concepts", status: 'locked' },
                    { id: 'f-7', title: "Snapshots, Rollbacks, and Lab Hygiene", status: 'locked' }
                ]
            },
            {
                title: "Phase 2: Operating System Basics",
                modules: [
                    { id: 'f-8', title: "Introduction to Computing Systems", status: 'locked' },
                    { id: 'f-9', title: "CPU, Memory, Storage, and Processes", status: 'locked' },
                    { id: 'f-10', title: "Filesystems and Permissions", status: 'locked' },
                    { id: 'f-11', title: "Users, Groups, and Access Control", status: 'locked' },
                    { id: 'f-12', title: "User Space vs Kernel Space", status: 'locked' }
                ]
            },
            {
                title: "Phase 3: Linux & Command Line",
                modules: [
                    { id: 'f-13', title: "Linux Architecture (High-Level)", status: 'locked' },
                    { id: 'f-14', title: "Linux Command Line Essentials", status: 'locked' },
                    { id: 'f-15', title: "File and Process Management", status: 'locked' },
                    { id: 'f-16', title: "Package Management and Updates", status: 'locked' },
                    { id: 'f-17', title: "Shells Explained (Bash, Zsh)", status: 'locked' },
                    { id: 'f-18', title: "Pipes, Redirection, and Environment Variables", status: 'locked' }
                ]
            },
            {
                title: "Phase 4: Windows Awareness",
                modules: [
                    { id: 'f-19', title: "Windows Architecture (High-Level)", status: 'locked' }
                ]
            },
            {
                title: "Phase 5: Networking Fundamentals",
                modules: [
                    { id: 'f-20', title: "Networking Fundamentals (OSI & TCP/IP)", status: 'locked' },
                    { id: 'f-21', title: "IP Addressing, Ports, and Protocols", status: 'locked' },
                    { id: 'f-22', title: "DNS and Name Resolution", status: 'locked' }
                ]
            },
            {
                title: "Phase 6: Web Fundamentals",
                modules: [
                    { id: 'f-23', title: "HTTP, HTTPS, and Web Architecture", status: 'locked' },
                    { id: 'f-24', title: "Cookies, Sessions, and Authentication", status: 'locked' }
                ]
            },
            {
                title: "Phase 7: Tools & Security Context",
                modules: [
                    { id: 'f-25', title: "Git, Version Control, and Tool Management", status: 'locked' },
                    { id: 'f-26', title: "Cybersecurity Fundamentals & Terminology", status: 'locked' },
                    { id: 'f-27', title: "Security Standards, Compliance, Ethics, and Law", status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'exploit',
        title: 'ATTACK MODE',
        subtitle: 'Offensive Security',
        label: 'EXPLOIT',
        icon: Sword,
        color: 'text-accent',
        borderColor: 'border-accent',
        bgWait: 'bg-accent/10',
        philosophy: "Exploit is not chaos. It’s precision.",
        description: "Understand how systems are attacked professionally. Break systems with intent and control.",
        role: "Offensive Security Practitioner",
        stages: [
            // Keeping existing structure for other paths as placeholder/future work based on previous prompt
            // Admin can unlock these later
            {
                title: "Core Foundations",
                modules: [
                    { id: 'e-1', title: "Offensive Security Roles Overview", status: 'locked' },
                    { id: 'e-2', title: "Penetration Testing vs Red Teaming vs VA", status: 'locked' }
                ]
            },
            {
                title: "Web Application Pentesting",
                modules: [
                    { id: 'e-13', title: "How Web Applications Are Built", status: 'locked' }
                ]
            },
            {
                title: "Infrastructure & Network Pentesting",
                modules: [
                    { id: 'e-36', title: "Infrastructure Attack Surface Overview", status: 'locked' }
                ]
            },
            {
                title: "Reporting & Delivery",
                modules: [
                    { id: 'e-62', title: "Privilege Escalation Methodology", status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'protector',
        title: 'DEFENSE MODE',
        subtitle: 'Defensive Security',
        label: 'PROTECTOR',
        icon: Shield,
        color: 'text-primary',
        borderColor: 'border-primary',
        bgWait: 'bg-primary/10',
        philosophy: "You can’t defend what you can’t see.",
        description: "Detect, respond, and protect systems. Stability is a weapon.",
        role: "Defensive Security Operator",
        stages: [
            {
                title: "Foundation",
                modules: [
                    { id: 'p-1', title: "Defensive Security Overview", status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'convergence',
        title: 'CONVERGENCE',
        subtitle: 'Purple Team / Engineer',
        icon: GitMerge,
        color: 'text-purple-400',
        borderColor: 'border-purple-400',
        bgWait: 'bg-purple-400/10',
        philosophy: "The gap between red and blue is where failure lives.",
        description: "Bridge attack and defense. Integration, validation, and improvement.",
        role: "Security Engineer",
        stages: [
            {
                title: "Perspective",
                modules: [
                    { id: 'c-1', title: "Red vs Blue Mental Models", status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'overwatch',
        title: 'ARCHITECT',
        subtitle: 'Advanced / System Design',
        label: 'OVERWATCH',
        icon: Hexagon,
        color: 'text-yellow-400',
        borderColor: 'border-yellow-400',
        bgWait: 'bg-yellow-400/10',
        philosophy: "You no longer execute. You design.",
        description: "System-level security design, oversight, and mastery.",
        role: "Security Architect",
        recommended: true,
        stages: [
            {
                title: "Design Principles",
                modules: [
                    { id: 'arc-1', title: "Security Architecture Fundamentals", status: 'locked' }
                ]
            }
        ]
    }
];
