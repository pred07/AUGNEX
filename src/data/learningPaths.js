import { Hammer, Sword, Shield, GitMerge, Hexagon } from 'lucide-react';

export const LEARNING_PATHS = [
    {
        id: 'forge',
        title: 'FORGE',
        subtitle: 'Foundation / Preparation',
        icon: Hammer,
        color: 'text-cyan-400',
        borderColor: 'border-cyan-400',
        bgWait: 'bg-cyan-400/10',
        philosophy: "Tools are useless without understanding.",
        description: "Baseline cybersecurity literacy and environment readiness. The preparation before the specialization.",
        role: "Observer → Prepared Learner",
        sections: [
            {
                title: "Phase 0: Mental Model",
                modules: [
                    { id: 'f-1', title: "Introduction to Cybersecurity and Computing", type: "theory", xp: 50, duration: "30m" }
                ]
            },
            {
                title: "Phase 1: Environment Setup",
                modules: [
                    { id: 'f-2', title: "What is Virtualization and Why It Matters", type: "theory", xp: 50, duration: "45m" },
                    { id: 'f-3', title: "Hypervisors: Type 1 vs Type 2", type: "theory", xp: 50, duration: "45m" },
                    { id: 'f-4', title: "Installing Kali Linux Safely", type: "lab", xp: 150, duration: "2h" },
                    { id: 'f-5', title: "Installing Parrot OS Safely", type: "lab", xp: 150, duration: "2h" },
                    { id: 'f-6', title: "Virtual Networking Concepts", type: "theory", xp: 100, duration: "1h" },
                    { id: 'f-7', title: "Snapshots, Rollbacks, and Lab Hygiene", type: "lab", xp: 100, duration: "1h" }
                ]
            },
            {
                title: "Phase 2: Operating System Basics",
                modules: [
                    { id: 'f-8', title: "Introduction to Computing Systems", type: "theory", xp: 50, duration: "30m" },
                    { id: 'f-9', title: "CPU, Memory, Storage, and Processes", type: "theory", xp: 75, duration: "1h" },
                    { id: 'f-10', title: "Filesystems and Permissions", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'f-11', title: "Users, Groups, and Access Control", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'f-12', title: "User Space vs Kernel Space", type: "theory", xp: 100, duration: "1h" }
                ]
            },
            {
                title: "Phase 3: Linux & Command Line",
                modules: [
                    { id: 'f-13', title: "Linux Architecture (High-Level)", type: "theory", xp: 50, duration: "45m" },
                    { id: 'f-14', title: "Linux Command Line Essentials", type: "lab", xp: 200, duration: "3h" },
                    { id: 'f-15', title: "File and Process Management", type: "lab", xp: 150, duration: "2h" },
                    { id: 'f-16', title: "Package Management and Updates", type: "lab", xp: 100, duration: "1h" },
                    { id: 'f-17', title: "Shells Explained (Bash, Zsh)", type: "theory", xp: 50, duration: "30m" },
                    { id: 'f-18', title: "Pipes, Redirection, and Environment Variables", type: "lab", xp: 175, duration: "2h" }
                ]
            },
            {
                title: "Phase 4: Windows Awareness",
                modules: [
                    { id: 'f-19', title: "Windows Architecture (High-Level)", type: "theory", xp: 75, duration: "1h" }
                ]
            },
            {
                title: "Phase 5: Networking Fundamentals",
                modules: [
                    { id: 'f-20', title: "Networking Fundamentals (OSI & TCP/IP)", type: "theory", xp: 150, duration: "2h" },
                    { id: 'f-21', title: "IP Addressing, Ports, and Protocols", type: "lab", xp: 200, duration: "3h" },
                    { id: 'f-22', title: "DNS and Name Resolution", type: "lab", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Phase 6: Web Fundamentals",
                modules: [
                    { id: 'f-23', title: "HTTP, HTTPS, and Web Architecture", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'f-24', title: "Cookies, Sessions, and Authentication", type: "lab", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Phase 7: Tools & Security Context",
                modules: [
                    { id: 'f-25', title: "Git, Version Control, and Tool Management", type: "lab", xp: 150, duration: "2h" },
                    { id: 'f-26', title: "Cybersecurity Fundamentals & Terminology", type: "theory", xp: 50, duration: "1h" },
                    { id: 'f-27', title: "Security Standards, Compliance, Ethics, and Law", type: "theory", xp: 100, duration: "1.5h" }
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
        sections: [
            {
                title: "Core Foundations",
                modules: [
                    { id: 'e-1', title: "Offensive Security Roles Overview", type: "theory", xp: 50, duration: "30m" },
                    { id: 'e-2', title: "Penetration Testing vs Red Teaming vs VA", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-3', title: "Legal Authorization, Scope, and Rules of Engagement", type: "theory", xp: 100, duration: "1h" },
                    { id: 'e-4', title: "Penetration Testing Methodologies (PTES, OWASP, NIST)", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'e-5', title: "Threat Modeling and Attack Surface Mapping", type: "lab", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Information Gathering",
                modules: [
                    { id: 'e-6', title: "Information Gathering Principles", type: "theory", xp: 50, duration: "45m" },
                    { id: 'e-7', title: "Passive Reconnaissance Techniques", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-8', title: "Active Reconnaissance Techniques", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-9', title: "Open-Source Intelligence (OSINT) Fundamentals", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'e-10', title: "Understanding Exposure and Misconfiguration", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-11', title: "CVE, CVSS, and Risk Context", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-12', title: "Tooling Strategy and Operator Mindset", type: "theory", xp: 50, duration: "45m" }
                ]
            },
            {
                title: "Web Application Pentesting",
                modules: [
                    { id: 'e-13', title: "How Web Applications Are Built", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-14', title: "HTTP Protocol Deep Dive", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-15', title: "Web Authentication Mechanisms", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'e-16', title: "Session Management and Token Handling", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-17', title: "Web Application Attack Surface Mapping", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-18', title: "Technology Stack Fingerprinting", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'e-19', title: "Directory and Endpoint Enumeration", type: "ctf", xp: 200, duration: "2.5h" },
                    { id: 'e-20', title: "Parameter Discovery and Mapping", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'e-21', title: "Input Validation and Injection Fundamentals", type: "theory", xp: 100, duration: "1h" },
                    { id: 'e-22', title: "SQL Injection Concepts and Exploitation", type: "ctf", xp: 300, duration: "4h" },
                    { id: 'e-23', title: "Cross-Site Scripting (XSS) Fundamentals", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'e-24', title: "Authentication Attacks and Logic Flaws", type: "lab", xp: 175, duration: "2h" },
                    { id: 'e-25', title: "Authorization Attacks (IDOR and Access Control)", type: "ctf", xp: 225, duration: "3h" },
                    { id: 'e-26', title: "File Upload and File Inclusion Vulnerabilities", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'e-27', title: "Server-Side Request Forgery (SSRF)", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'e-28', title: "Insecure Deserialization (Conceptual)", type: "theory", xp: 150, duration: "2h" },
                    { id: 'e-29', title: "Business Logic Vulnerabilities", type: "lab", xp: 175, duration: "2h" },
                    { id: 'e-30', title: "API Security Testing Fundamentals", type: "lab", xp: 175, duration: "2h" },
                    { id: 'e-31', title: "Vulnerability Chaining in Web Applications", type: "ctf", xp: 300, duration: "4h" },
                    { id: 'e-32', title: "Web Proxy Methodology (Burp Suite / ZAP)", type: "lab", xp: 200, duration: "2h" }
                ]
            },
            {
                title: "Infrastructure & Network Pentesting",
                modules: [
                    { id: 'e-33', title: "Infrastructure Attack Surface Overview", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-34', title: "External vs Internal Network Penetration Testing", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-35', title: "Network Scanning Theory and Host Discovery", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-36', title: "Service Enumeration and Banner Grabbing", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'e-37', title: "Common Network Services Attacks (SMB, FTP, SSH, RDP)", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'e-38', title: "Network Protocol Weaknesses", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'e-39', title: "Misconfigured Services and Default Credentials", type: "lab", xp: 100, duration: "1h" },
                    { id: 'e-40', title: "Password Attacks and Credential Exposure", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-41', title: "Password Spraying vs Brute Force Techniques", type: "ctf", xp: 200, duration: "2.5h" }
                ]
            },
            {
                title: "Windows & Active Directory Offense",
                modules: [
                    { id: 'e-42', title: "Windows Internals for Pentesters", type: "theory", xp: 150, duration: "2h" },
                    { id: 'e-43', title: "Active Directory Architecture Overview", type: "theory", xp: 150, duration: "2h" },
                    { id: 'e-44', title: "Active Directory Enumeration Techniques", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'e-45', title: "Common Active Directory Misconfigurations", type: "lab", xp: 175, duration: "2h" },
                    { id: 'e-46', title: "Credential Harvesting Concepts", type: "lab", xp: 150, duration: "2h" },
                    { id: 'e-47', title: "Lateral Movement Techniques", type: "ctf", xp: 300, duration: "4h" },
                    { id: 'e-48', title: "Pivoting, Tunneling, and Port Forwarding", type: "lab", xp: 250, duration: "3h" }
                ]
            },
            {
                title: "Privilege Escalation & Post-Exploitation",
                modules: [
                    { id: 'e-49', title: "Privilege Escalation Methodology", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'e-50', title: "Linux Privilege Escalation Fundamentals", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'e-51', title: "Windows Privilege Escalation Fundamentals", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'e-52', title: "Enumeration as a Skill", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'e-53', title: "Persistence Concepts and Ethical Boundaries", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'e-54', title: "Cleanup and Client Safety", type: "theory", xp: 75, duration: "1h" }
                ]
            },
            {
                title: "Reporting & Delivery",
                modules: [
                    { id: 'e-55', title: "Writing Effective Technical Findings", type: "lab", xp: 100, duration: "1.5h" },
                    { id: 'e-56', title: "Risk-Based Vulnerability Reporting", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-57', title: "Executive vs Technical Reporting", type: "theory", xp: 75, duration: "1h" },
                    { id: 'e-58', title: "Proof-of-Concept Ethics", type: "theory", xp: 50, duration: "45m" },
                    { id: 'e-59', title: "Final Penetration Test Report Structure", type: "lab", xp: 100, duration: "1.5h" },
                    { id: 'e-60', title: "Client Debrief and Communication", type: "theory", xp: 50, duration: "45m" }
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
        color: 'text-blue-500',
        borderColor: 'border-blue-500',
        bgWait: 'bg-blue-500/10',
        philosophy: "You can’t defend what you can’t see.",
        description: "Detect, respond, and protect systems. Stability is a weapon.",
        role: "Defensive Security Operator",
        sections: [
            {
                title: "Defensive Foundations",
                modules: [
                    { id: 'd-1', title: "Defensive Security Roles Overview", type: "theory", xp: 50, duration: "30m" },
                    { id: 'd-2', title: "SOC Structure and Responsibilities", type: "theory", xp: 50, duration: "45m" },
                    { id: 'd-3', title: "Prevention vs Detection vs Response", type: "theory", xp: 75, duration: "1h" },
                    { id: 'd-4', title: "Security Monitoring Concepts", type: "theory", xp: 75, duration: "1h" },
                    { id: 'd-5', title: "Visibility as a Security Requirement", type: "theory", xp: 75, duration: "1h" },
                    { id: 'd-6', title: "Threats, Adversaries, and Attack Lifecycle", type: "theory", xp: 100, duration: "1.5h" }
                ]
            },
            {
                title: "Logging & Visibility (Core)",
                modules: [
                    { id: 'd-7', title: "Why Logging Matters in Security", type: "theory", xp: 50, duration: "45m" },
                    { id: 'd-8', title: "Types of Logs (System, Application, Security)", type: "lab", xp: 100, duration: "1.5h" },
                    { id: 'd-9', title: "Windows Logging Fundamentals", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-10', title: "Linux Logging Fundamentals", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-11', title: "Authentication and Authorization Logs", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'd-12', title: "Network Device Logging (Firewalls, Routers)", type: "theory", xp: 100, duration: "1h" },
                    { id: 'd-13', title: "Centralized Logging Concepts", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'd-14', title: "Log Retention and Integrity", type: "theory", xp: 75, duration: "1h" }
                ]
            },
            {
                title: "Network Defense",
                modules: [
                    { id: 'd-15', title: "Network Defense Fundamentals", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'd-16', title: "Firewalls: Concepts and Rule Logic", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-17', title: "IDS vs IPS Explained", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'd-18', title: "Network Segmentation and Zones", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'd-19', title: "Baseline Network Behavior", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-20', title: "Detecting Suspicious Network Activity", type: "ctf", xp: 250, duration: "3h" }
                ]
            },
            {
                title: "Endpoint Security",
                modules: [
                    { id: 'd-21', title: "Endpoint Security Fundamentals", type: "theory", xp: 75, duration: "1h" },
                    { id: 'd-22', title: "Antivirus vs EDR", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'd-23', title: "Endpoint Telemetry and Signals", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-24', title: "Process, File, and Registry Monitoring", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'd-25', title: "Detecting Malicious Processes", type: "ctf", xp: 225, duration: "3h" },
                    { id: 'd-26', title: "Persistence Mechanisms (Defensive View)", type: "theory", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Threats & Attack Techniques",
                modules: [
                    { id: 'd-27', title: "Malware Fundamentals", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'd-28', title: "Initial Access Techniques", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'd-29', title: "Phishing and Social Engineering", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-30', title: "Credential Abuse and Account Compromise", type: "ctf", xp: 200, duration: "2.5h" },
                    { id: 'd-31', title: "Living-off-the-Land Techniques", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'd-32', title: "Insider Threat Basics", type: "theory", xp: 75, duration: "1h" }
                ]
            },
            {
                title: "Incident Response (IR)",
                modules: [
                    { id: 'd-33', title: "Incident Response Lifecycle", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'd-34', title: "Alert Triage and Prioritization", type: "ctf", xp: 250, duration: "3h" },
                    { id: 'd-35', title: "Containment Strategies", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'd-36', title: "Eradication and Recovery", type: "lab", xp: 175, duration: "2h" },
                    { id: 'd-37', title: "Evidence Collection and Preservation", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-38', title: "Communication During Incidents", type: "theory", xp: 100, duration: "1h" }
                ]
            },
            {
                title: "Hardening & Prevention",
                modules: [
                    { id: 'd-39', title: "System Hardening Fundamentals", type: "lab", xp: 150, duration: "2h" },
                    { id: 'd-40', title: "Patch and Vulnerability Management", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'd-41', title: "Secure Configuration Baselines", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'd-42', title: "Least Privilege and Access Control", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'd-43', title: "Backup, Recovery, and Resilience", type: "theory", xp: 100, duration: "1.5h" }
                ]
            },
            {
                title: "Frameworks & Operations",
                modules: [
                    { id: 'd-44', title: "MITRE ATT&CK for Defenders", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'd-45', title: "Measuring Defensive Effectiveness", type: "theory", xp: 125, duration: "1.5h" }
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
        sections: [
            {
                title: "Purple Team Foundations",
                modules: [
                    { id: 'c-1', title: "Purple Teaming Explained", type: "theory", xp: 50, duration: "45m" },
                    { id: 'c-2', title: "Red vs Blue Mental Models", type: "theory", xp: 75, duration: "1h" },
                    { id: 'c-3', title: "Why Security Controls Fail", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-4', title: "Attackers vs Assumptions", type: "theory", xp: 75, duration: "1h" },
                    { id: 'c-5', title: "Detection as an Engineering Problem", type: "theory", xp: 125, duration: "1.5h" }
                ]
            },
            {
                title: "Attack–Defense Mapping",
                modules: [
                    { id: 'c-6', title: "Mapping Attacks to Defensive Controls", type: "lab", xp: 175, duration: "2h" },
                    { id: 'c-7', title: "Understanding Kill Chains End-to-End", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-8', title: "MITRE ATT&CK for Purple Teams", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'c-9', title: "Coverage Gaps and Blind Spots", type: "lab", xp: 150, duration: "2h" },
                    { id: 'c-10', title: "Control Ownership and Responsibility", type: "theory", xp: 75, duration: "1h" }
                ]
            },
            {
                title: "Logging & Visibility Validation",
                modules: [
                    { id: 'c-11', title: "Logging Requirements from an Attacker’s View", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-12', title: "Validating Authentication Visibility", type: "ctf", xp: 200, duration: "2.5h" },
                    { id: 'c-13', title: "Validating Process Execution Visibility", type: "ctf", xp: 200, duration: "2.5h" },
                    { id: 'c-14', title: "Validating Network Visibility", type: "ctf", xp: 200, duration: "2.5h" },
                    { id: 'c-15', title: "Validating Command-Line and Script Activity", type: "ctf", xp: 200, duration: "2.5h" }
                ]
            },
            {
                title: "Detection Engineering Fundamentals",
                modules: [
                    { id: 'c-16', title: "What Makes a Good Detection", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-17', title: "Signal vs Noise", type: "theory", xp: 75, duration: "1h" },
                    { id: 'c-18', title: "Detection Logic Basics", type: "lab", xp: 150, duration: "2h" },
                    { id: 'c-19', title: "Rule-Based vs Behavioral Detection", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'c-20', title: "False Positives and False Negatives", type: "lab", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Purple Team Tooling",
                modules: [
                    { id: 'c-21', title: "Using SIEMs for Validation (Conceptual)", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'c-22', title: "Endpoint Telemetry for Detection Testing", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'c-23', title: "Network Telemetry for Attack Validation", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'c-24', title: "Threat Intelligence Integration", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-25', title: "Baseline Creation and Drift Detection", type: "lab", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Attack Simulation & Validation",
                modules: [
                    { id: 'c-26', title: "Safe Attack Simulation Concepts", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-27', title: "Atomic Testing Fundamentals", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'c-28', title: "Breach and Attack Simulation (BAS) Overview", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'c-29', title: "Validation Without Exploitation", type: "lab", xp: 150, duration: "2h" },
                    { id: 'c-30', title: "Measuring Detection Coverage", type: "lab", xp: 150, duration: "2h" }
                ]
            },
            {
                title: "Metrics & Continuous Improvement",
                modules: [
                    { id: 'c-31', title: "Mean Time to Detect (MTTD)", type: "theory", xp: 75, duration: "1h" },
                    { id: 'c-32', title: "Mean Time to Respond (MTTR)", type: "theory", xp: 75, duration: "1h" },
                    { id: 'c-33', title: "Measuring Detection Effectiveness", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-34', title: "Control Maturity and Gaps", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'c-35', title: "Turning Incidents into Improvements", type: "theory", xp: 100, duration: "1.5h" }
                ]
            },
            {
                title: "Engineering & Communication",
                modules: [
                    { id: 'c-36', title: "Improving SOC Efficiency", type: "theory", xp: 75, duration: "1h" },
                    { id: 'c-37', title: "Reducing Alert Fatigue", type: "lab", xp: 150, duration: "2h" },
                    { id: 'c-38', title: "Communicating with Red and Blue Teams", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'c-39', title: "Documenting Control Gaps", type: "lab", xp: 125, duration: "1.5h" },
                    { id: 'c-40', title: "Building a Purple Team Program", type: "theory", xp: 150, duration: "2h" }
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
        sections: [
            {
                title: "Architecture Foundations",
                modules: [
                    { id: 'arc-1', title: "Security Architecture Fundamentals", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-2', title: "Business Alignment and Enablement", type: "theory", xp: 75, duration: "1h" },
                    { id: 'arc-3', title: "The SABSA and TOGAF Frameworks", type: "theory", xp: 125, duration: "2h" },
                    { id: 'arc-4', title: "Defense in Depth vs Zero Trust", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-5', title: "Threat Modeling at Scale", type: "lab", xp: 175, duration: "2.5h" }
                ]
            },
            {
                title: "Governance, Risk, and Compliance (GRC)",
                modules: [
                    { id: 'arc-6', title: "Building a Security Policy Framework", type: "lab", xp: 150, duration: "2h" },
                    { id: 'arc-7', title: "Risk Assessment Methodologies (FAIR, NIST)", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'arc-8', title: "Regulatory Landscape (GDPR, PCI, HIPAA, SOX)", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-9', title: "Third-Party Risk Management (TPRM)", type: "theory", xp: 125, duration: "2h" },
                    { id: 'arc-10', title: "Audits and Assurance", type: "theory", xp: 100, duration: "1.5h" }
                ]
            },
            {
                title: "Identity & Access Architecture",
                modules: [
                    { id: 'arc-11', title: "Identity as the New Perimeter", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-12', title: "Modern Auth Standards (OIDC, SAML, OAuth2)", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'arc-13', title: "Privileged Access Management (PAM) Strategy", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'arc-14', title: "Customer IAM (CIAM) Considerations", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'arc-15', title: "Directory Design (Active Directory, LDAP, Cloud IGA)", type: "lab", xp: 200, duration: "3h" }
                ]
            },
            {
                title: "Cloud Security Architecture",
                modules: [
                    { id: 'arc-16', title: "Shared Responsibility Models (IaaS, PaaS, SaaS)", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-17', title: "Cloud Native Security Patterns", type: "theory", xp: 125, duration: "2h" },
                    { id: 'arc-18', title: "Container and Kubernetes Security Design", type: "lab", xp: 200, duration: "2.5h" },
                    { id: 'arc-19', title: "Serverless Security Implications", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'arc-20', title: "Multi-Cloud Strategy and Federation", type: "lab", xp: 175, duration: "2.5h" }
                ]
            },
            {
                title: "Application Security Design",
                modules: [
                    { id: 'arc-21', title: "Secure Software Development Life Cycle (S-SDLC)", type: "lab", xp: 150, duration: "2h" },
                    { id: 'arc-22', title: "API Security Standards and Gateways", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'arc-23', title: "Data Protection Design (Encryption, Tokenization)", type: "theory", xp: 150, duration: "2h" },
                    { id: 'arc-24', title: "Microservices Security Patterns", type: "theory", xp: 150, duration: "2h" },
                    { id: 'arc-25', title: "DevSecOps Pipeline Integration", type: "lab", xp: 200, duration: "3h" }
                ]
            },
            {
                title: "Zero Trust & Network Design",
                modules: [
                    { id: 'arc-26', title: "Zero Trust Architecture Principles (NIST 800-207)", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-27', title: "Micro-segmentation Strategy", type: "lab", xp: 175, duration: "2.5h" },
                    { id: 'arc-28', title: "Secure Access Service Edge (SASE)", type: "theory", xp: 125, duration: "2h" },
                    { id: 'arc-29', title: "Software-Defined Networking (SDN) Security", type: "theory", xp: 150, duration: "2h" },
                    { id: 'arc-30', title: "Remote Access Evolution (VPN vs ZTNA)", type: "lab", xp: 175, duration: "2.5h" }
                ]
            },
            {
                title: "SecOps & Resilience Architecture",
                modules: [
                    { id: 'arc-31', title: "Designing for Resilience and Recovery", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'arc-32', title: "Security Operations Center (SOC) Architecture", type: "lab", xp: 150, duration: "2h" },
                    { id: 'arc-33', title: "Incident Response Readiness", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-34', title: "Business Continuity Planning (BCP)", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-35', title: "Designing Deception Technologies", type: "lab", xp: 175, duration: "2.5h" }
                ]
            },
            {
                title: "Security Leadership & Strategy",
                modules: [
                    { id: 'arc-36', title: "The CISO Role and Reporting Lines", type: "theory", xp: 100, duration: "1.5h" },
                    { id: 'arc-37', title: "Budgeting and ROI for Security", type: "theory", xp: 125, duration: "2h" },
                    { id: 'arc-38', title: "Security Culture and Awareness Programs", type: "lab", xp: 150, duration: "2h" },
                    { id: 'arc-39', title: "Metrics and KPIs for Executives", type: "theory", xp: 125, duration: "1.5h" },
                    { id: 'arc-40', title: "Emerging Threats and Future Trends (AI/Quantum)", type: "theory", xp: 150, duration: "2h" }
                ]
            }
        ]
    }
];
