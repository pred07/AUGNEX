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
        sections: [
            // Keeping existing structure for other paths as placeholder/future work based on previous prompt
            // Admin can unlock these later
            {
                title: "Core Foundations",
                modules: [
                    { id: 'e-1', title: "Offensive Security Roles Overview", status: 'locked' },
                    { id: 'e-2', title: "Penetration Testing vs Red Teaming vs VA", status: 'locked' },
                    { id: 'e-3', title: "Legal Authorization, Scope, and Rules of Engagement", status: 'locked' },
                    { id: 'e-4', title: "Penetration Testing Methodologies (PTES, OWASP, NIST)", status: 'locked' },
                    { id: 'e-5', title: "Threat Modeling and Attack Surface Mapping", status: 'locked' }
                ]
            },
            {
                title: "Information Gathering",
                modules: [
                    { id: 'e-6', title: "Information Gathering Principles", status: 'locked' },
                    { id: 'e-7', title: "Passive Reconnaissance Techniques", status: 'locked' },
                    { id: 'e-8', title: "Active Reconnaissance Techniques", status: 'locked' },
                    { id: 'e-9', title: "Open-Source Intelligence (OSINT) Fundamentals", status: 'locked' },
                    { id: 'e-10', title: "Understanding Exposure and Misconfiguration", status: 'locked' },
                    { id: 'e-11', title: "CVE, CVSS, and Risk Context", status: 'locked' },
                    { id: 'e-12', title: "Tooling Strategy and Operator Mindset", status: 'locked' }
                ]
            },
            {
                title: "Web Application Pentesting",
                modules: [
                    { id: 'e-13', title: "How Web Applications Are Built", status: 'locked' },
                    { id: 'e-14', title: "HTTP Protocol Deep Dive", status: 'locked' },
                    { id: 'e-15', title: "Web Authentication Mechanisms", status: 'locked' },
                    { id: 'e-16', title: "Session Management and Token Handling", status: 'locked' },
                    { id: 'e-17', title: "Web Application Attack Surface Mapping", status: 'locked' },
                    { id: 'e-18', title: "Technology Stack Fingerprinting", status: 'locked' },
                    { id: 'e-19', title: "Directory and Endpoint Enumeration", status: 'locked' },
                    { id: 'e-20', title: "Parameter Discovery and Mapping", status: 'locked' },
                    { id: 'e-21', title: "Input Validation and Injection Fundamentals", status: 'locked' },
                    { id: 'e-22', title: "SQL Injection Concepts and Exploitation", status: 'locked' },
                    { id: 'e-23', title: "Cross-Site Scripting (XSS) Fundamentals", status: 'locked' },
                    { id: 'e-24', title: "Authentication Attacks and Logic Flaws", status: 'locked' },
                    { id: 'e-25', title: "Authorization Attacks (IDOR and Access Control)", status: 'locked' },
                    { id: 'e-26', title: "File Upload and File Inclusion Vulnerabilities", status: 'locked' },
                    { id: 'e-27', title: "Server-Side Request Forgery (SSRF)", status: 'locked' },
                    { id: 'e-28', title: "Insecure Deserialization (Conceptual)", status: 'locked' },
                    { id: 'e-29', title: "Business Logic Vulnerabilities", status: 'locked' },
                    { id: 'e-30', title: "API Security Testing Fundamentals", status: 'locked' },
                    { id: 'e-31', title: "Vulnerability Chaining in Web Applications", status: 'locked' },
                    { id: 'e-32', title: "Web Proxy Methodology (Burp Suite / ZAP)", status: 'locked' }
                ]
            },
            {
                title: "Infrastructure & Network Pentesting",
                modules: [
                    { id: 'e-33', title: "Infrastructure Attack Surface Overview", status: 'locked' },
                    { id: 'e-34', title: "External vs Internal Network Penetration Testing", status: 'locked' },
                    { id: 'e-35', title: "Network Scanning Theory and Host Discovery", status: 'locked' },
                    { id: 'e-36', title: "Service Enumeration and Banner Grabbing", status: 'locked' },
                    { id: 'e-37', title: "Common Network Services Attacks (SMB, FTP, SSH, RDP)", status: 'locked' },
                    { id: 'e-38', title: "Network Protocol Weaknesses", status: 'locked' },
                    { id: 'e-39', title: "Misconfigured Services and Default Credentials", status: 'locked' },
                    { id: 'e-40', title: "Password Attacks and Credential Exposure", status: 'locked' },
                    { id: 'e-41', title: "Password Spraying vs Brute Force Techniques", status: 'locked' }
                ]
            },
            {
                title: "Windows & Active Directory Offense",
                modules: [
                    { id: 'e-42', title: "Windows Internals for Pentesters", status: 'locked' },
                    { id: 'e-43', title: "Active Directory Architecture Overview", status: 'locked' },
                    { id: 'e-44', title: "Active Directory Enumeration Techniques", status: 'locked' },
                    { id: 'e-45', title: "Common Active Directory Misconfigurations", status: 'locked' },
                    { id: 'e-46', title: "Credential Harvesting Concepts", status: 'locked' },
                    { id: 'e-47', title: "Lateral Movement Techniques", status: 'locked' },
                    { id: 'e-48', title: "Pivoting, Tunneling, and Port Forwarding", status: 'locked' }
                ]
            },
            {
                title: "Privilege Escalation & Post-Exploitation",
                modules: [
                    { id: 'e-49', title: "Privilege Escalation Methodology", status: 'locked' },
                    { id: 'e-50', title: "Linux Privilege Escalation Fundamentals", status: 'locked' },
                    { id: 'e-51', title: "Windows Privilege Escalation Fundamentals", status: 'locked' },
                    { id: 'e-52', title: "Enumeration as a Skill", status: 'locked' },
                    { id: 'e-53', title: "Persistence Concepts and Ethical Boundaries", status: 'locked' },
                    { id: 'e-54', title: "Cleanup and Client Safety", status: 'locked' }
                ]
            },
            {
                title: "Reporting & Delivery",
                modules: [
                    { id: 'e-55', title: "Writing Effective Technical Findings", status: 'locked' },
                    { id: 'e-56', title: "Risk-Based Vulnerability Reporting", status: 'locked' },
                    { id: 'e-57', title: "Executive vs Technical Reporting", status: 'locked' },
                    { id: 'e-58', title: "Proof-of-Concept Ethics", status: 'locked' },
                    { id: 'e-59', title: "Final Penetration Test Report Structure", status: 'locked' },
                    { id: 'e-60', title: "Client Debrief and Communication", status: 'locked' }
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
                    { id: 'd-1', title: "Defensive Security Roles Overview", status: 'locked' },
                    { id: 'd-2', title: "SOC Structure and Responsibilities", status: 'locked' },
                    { id: 'd-3', title: "Prevention vs Detection vs Response", status: 'locked' },
                    { id: 'd-4', title: "Security Monitoring Concepts", status: 'locked' },
                    { id: 'd-5', title: "Visibility as a Security Requirement", status: 'locked' },
                    { id: 'd-6', title: "Threats, Adversaries, and Attack Lifecycle", status: 'locked' }
                ]
            },
            {
                title: "Logging & Visibility (Core)",
                modules: [
                    { id: 'd-7', title: "Why Logging Matters in Security", status: 'locked' },
                    { id: 'd-8', title: "Types of Logs (System, Application, Security)", status: 'locked' },
                    { id: 'd-9', title: "Windows Logging Fundamentals", status: 'locked' },
                    { id: 'd-10', title: "Linux Logging Fundamentals", status: 'locked' },
                    { id: 'd-11', title: "Authentication and Authorization Logs", status: 'locked' },
                    { id: 'd-12', title: "Network Device Logging (Firewalls, Routers)", status: 'locked' },
                    { id: 'd-13', title: "Centralized Logging Concepts", status: 'locked' },
                    { id: 'd-14', title: "Log Retention and Integrity", status: 'locked' }
                ]
            },
            {
                title: "Network Defense",
                modules: [
                    { id: 'd-15', title: "Network Defense Fundamentals", status: 'locked' },
                    { id: 'd-16', title: "Firewalls: Concepts and Rule Logic", status: 'locked' },
                    { id: 'd-17', title: "IDS vs IPS Explained", status: 'locked' },
                    { id: 'd-18', title: "Network Segmentation and Zones", status: 'locked' },
                    { id: 'd-19', title: "Baseline Network Behavior", status: 'locked' },
                    { id: 'd-20', title: "Detecting Suspicious Network Activity", status: 'locked' }
                ]
            },
            {
                title: "Endpoint Security",
                modules: [
                    { id: 'd-21', title: "Endpoint Security Fundamentals", status: 'locked' },
                    { id: 'd-22', title: "Antivirus vs EDR", status: 'locked' },
                    { id: 'd-23', title: "Endpoint Telemetry and Signals", status: 'locked' },
                    { id: 'd-24', title: "Process, File, and Registry Monitoring", status: 'locked' },
                    { id: 'd-25', title: "Detecting Malicious Processes", status: 'locked' },
                    { id: 'd-26', title: "Persistence Mechanisms (Defensive View)", status: 'locked' }
                ]
            },
            {
                title: "Threats & Attack Techniques",
                modules: [
                    { id: 'd-27', title: "Malware Fundamentals", status: 'locked' },
                    { id: 'd-28', title: "Initial Access Techniques", status: 'locked' },
                    { id: 'd-29', title: "Phishing and Social Engineering", status: 'locked' },
                    { id: 'd-30', title: "Credential Abuse and Account Compromise", status: 'locked' },
                    { id: 'd-31', title: "Living-off-the-Land Techniques", status: 'locked' },
                    { id: 'd-32', title: "Insider Threat Basics", status: 'locked' }
                ]
            },
            {
                title: "Incident Response (IR)",
                modules: [
                    { id: 'd-33', title: "Incident Response Lifecycle", status: 'locked' },
                    { id: 'd-34', title: "Alert Triage and Prioritization", status: 'locked' },
                    { id: 'd-35', title: "Containment Strategies", status: 'locked' },
                    { id: 'd-36', title: "Eradication and Recovery", status: 'locked' },
                    { id: 'd-37', title: "Evidence Collection and Preservation", status: 'locked' },
                    { id: 'd-38', title: "Communication During Incidents", status: 'locked' }
                ]
            },
            {
                title: "Hardening & Prevention",
                modules: [
                    { id: 'd-39', title: "System Hardening Fundamentals", status: 'locked' },
                    { id: 'd-40', title: "Patch and Vulnerability Management", status: 'locked' },
                    { id: 'd-41', title: "Secure Configuration Baselines", status: 'locked' },
                    { id: 'd-42', title: "Least Privilege and Access Control", status: 'locked' },
                    { id: 'd-43', title: "Backup, Recovery, and Resilience", status: 'locked' }
                ]
            },
            {
                title: "Frameworks & Operations",
                modules: [
                    { id: 'd-44', title: "MITRE ATT&CK for Defenders", status: 'locked' },
                    { id: 'd-45', title: "Measuring Defensive Effectiveness", status: 'locked' }
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
                    { id: 'c-1', title: "Purple Teaming Explained", status: 'locked' },
                    { id: 'c-2', title: "Red vs Blue Mental Models", status: 'locked' },
                    { id: 'c-3', title: "Why Security Controls Fail", status: 'locked' },
                    { id: 'c-4', title: "Attackers vs Assumptions", status: 'locked' },
                    { id: 'c-5', title: "Detection as an Engineering Problem", status: 'locked' }
                ]
            },
            {
                title: "Attack–Defense Mapping",
                modules: [
                    { id: 'c-6', title: "Mapping Attacks to Defensive Controls", status: 'locked' },
                    { id: 'c-7', title: "Understanding Kill Chains End-to-End", status: 'locked' },
                    { id: 'c-8', title: "MITRE ATT&CK for Purple Teams", status: 'locked' },
                    { id: 'c-9', title: "Coverage Gaps and Blind Spots", status: 'locked' },
                    { id: 'c-10', title: "Control Ownership and Responsibility", status: 'locked' }
                ]
            },
            {
                title: "Logging & Visibility Validation",
                modules: [
                    { id: 'c-11', title: "Logging Requirements from an Attacker’s View", status: 'locked' },
                    { id: 'c-12', title: "Validating Authentication Visibility", status: 'locked' },
                    { id: 'c-13', title: "Validating Process Execution Visibility", status: 'locked' },
                    { id: 'c-14', title: "Validating Network Visibility", status: 'locked' },
                    { id: 'c-15', title: "Validating Command-Line and Script Activity", status: 'locked' }
                ]
            },
            {
                title: "Detection Engineering Fundamentals",
                modules: [
                    { id: 'c-16', title: "What Makes a Good Detection", status: 'locked' },
                    { id: 'c-17', title: "Signal vs Noise", status: 'locked' },
                    { id: 'c-18', title: "Detection Logic Basics", status: 'locked' },
                    { id: 'c-19', title: "Rule-Based vs Behavioral Detection", status: 'locked' },
                    { id: 'c-20', title: "False Positives and False Negatives", status: 'locked' }
                ]
            },
            {
                title: "Purple Team Tooling",
                modules: [
                    { id: 'c-21', title: "Using SIEMs for Validation (Conceptual)", status: 'locked' },
                    { id: 'c-22', title: "Endpoint Telemetry for Detection Testing", status: 'locked' },
                    { id: 'c-23', title: "Network Telemetry for Attack Validation", status: 'locked' },
                    { id: 'c-24', title: "Threat Intelligence Integration", status: 'locked' },
                    { id: 'c-25', title: "Baseline Creation and Drift Detection", status: 'locked' }
                ]
            },
            {
                title: "Attack Simulation & Validation",
                modules: [
                    { id: 'c-26', title: "Safe Attack Simulation Concepts", status: 'locked' },
                    { id: 'c-27', title: "Atomic Testing Fundamentals", status: 'locked' },
                    { id: 'c-28', title: "Breach and Attack Simulation (BAS) Overview", status: 'locked' },
                    { id: 'c-29', title: "Validation Without Exploitation", status: 'locked' },
                    { id: 'c-30', title: "Measuring Detection Coverage", status: 'locked' }
                ]
            },
            {
                title: "Metrics & Continuous Improvement",
                modules: [
                    { id: 'c-31', title: "Mean Time to Detect (MTTD)", status: 'locked' },
                    { id: 'c-32', title: "Mean Time to Respond (MTTR)", status: 'locked' },
                    { id: 'c-33', title: "Measuring Detection Effectiveness", status: 'locked' },
                    { id: 'c-34', title: "Control Maturity and Gaps", status: 'locked' },
                    { id: 'c-35', title: "Turning Incidents into Improvements", status: 'locked' }
                ]
            },
            {
                title: "Engineering & Communication",
                modules: [
                    { id: 'c-36', title: "Improving SOC Efficiency", status: 'locked' },
                    { id: 'c-37', title: "Reducing Alert Fatigue", status: 'locked' },
                    { id: 'c-38', title: "Communicating with Red and Blue Teams", status: 'locked' },
                    { id: 'c-39', title: "Documenting Control Gaps", status: 'locked' },
                    { id: 'c-40', title: "Building a Purple Team Program", status: 'locked' }
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
                    { id: 'arc-1', title: "Security Architecture Fundamentals", status: 'locked' },
                    { id: 'arc-2', title: "Business Alignment and Enablement", status: 'locked' },
                    { id: 'arc-3', title: "The SABSA and TOGAF Frameworks", status: 'locked' },
                    { id: 'arc-4', title: "Defense in Depth vs Zero Trust", status: 'locked' },
                    { id: 'arc-5', title: "Threat Modeling at Scale", status: 'locked' }
                ]
            },
            {
                title: "Governance, Risk, and Compliance (GRC)",
                modules: [
                    { id: 'arc-6', title: "Building a Security Policy Framework", status: 'locked' },
                    { id: 'arc-7', title: "Risk Assessment Methodologies (FAIR, NIST)", status: 'locked' },
                    { id: 'arc-8', title: "Regulatory Landscape (GDPR, PCI, HIPAA, SOX)", status: 'locked' },
                    { id: 'arc-9', title: "Third-Party Risk Management (TPRM)", status: 'locked' },
                    { id: 'arc-10', title: "Audits and Assurance", status: 'locked' }
                ]
            },
            {
                title: "Identity & Access Architecture",
                modules: [
                    { id: 'arc-11', title: "Identity as the New Perimeter", status: 'locked' },
                    { id: 'arc-12', title: "Modern Auth Standards (OIDC, SAML, OAuth2)", status: 'locked' },
                    { id: 'arc-13', title: "Privileged Access Management (PAM) Strategy", status: 'locked' },
                    { id: 'arc-14', title: "Customer IAM (CIAM) Considerations", status: 'locked' },
                    { id: 'arc-15', title: "Directory Design (Active Directory, LDAP, Cloud IGA)", status: 'locked' }
                ]
            },
            {
                title: "Cloud Security Architecture",
                modules: [
                    { id: 'arc-16', title: "Shared Responsibility Models (IaaS, PaaS, SaaS)", status: 'locked' },
                    { id: 'arc-17', title: "Cloud Native Security Patterns", status: 'locked' },
                    { id: 'arc-18', title: "Container and Kubernetes Security Design", status: 'locked' },
                    { id: 'arc-19', title: "Serverless Security Implications", status: 'locked' },
                    { id: 'arc-20', title: "Multi-Cloud Strategy and Federation", status: 'locked' }
                ]
            },
            {
                title: "Application Security Design",
                modules: [
                    { id: 'arc-21', title: "Secure Software Development Life Cycle (S-SDLC)", status: 'locked' },
                    { id: 'arc-22', title: "API Security Standards and Gateways", status: 'locked' },
                    { id: 'arc-23', title: "Data Protection Design (Encryption, Tokenization)", status: 'locked' },
                    { id: 'arc-24', title: "Microservices Security Patterns", status: 'locked' },
                    { id: 'arc-25', title: "DevSecOps Pipeline Integration", status: 'locked' }
                ]
            },
            {
                title: "Zero Trust & Network Design",
                modules: [
                    { id: 'arc-26', title: "Zero Trust Architecture Principles (NIST 800-207)", status: 'locked' },
                    { id: 'arc-27', title: "Micro-segmentation Strategy", status: 'locked' },
                    { id: 'arc-28', title: "Secure Access Service Edge (SASE)", status: 'locked' },
                    { id: 'arc-29', title: "Software-Defined Networking (SDN) Security", status: 'locked' },
                    { id: 'arc-30', title: "Remote Access Evolution (VPN vs ZTNA)", status: 'locked' }
                ]
            },
            {
                title: "SecOps & Resilience Architecture",
                modules: [
                    { id: 'arc-31', title: "Designing for Resilience and Recovery", status: 'locked' },
                    { id: 'arc-32', title: "Security Operations Center (SOC) Architecture", status: 'locked' },
                    { id: 'arc-33', title: "Incident Response Readiness", status: 'locked' },
                    { id: 'arc-34', title: "Business Continuity Planning (BCP)", status: 'locked' },
                    { id: 'arc-35', title: "Designing Deception Technologies", status: 'locked' }
                ]
            },
            {
                title: "Security Leadership & Strategy",
                modules: [
                    { id: 'arc-36', title: "The CISO Role and Reporting Lines", status: 'locked' },
                    { id: 'arc-37', title: "Budgeting and ROI for Security", status: 'locked' },
                    { id: 'arc-38', title: "Security Culture and Awareness Programs", status: 'locked' },
                    { id: 'arc-39', title: "Metrics and KPIs for Executives", status: 'locked' },
                    { id: 'arc-40', title: "Emerging Threats and Future Trends (AI/Quantum)", status: 'locked' }
                ]
            }
        ]
    }
];
