export const QUIZZES = {
    'f-1': {
        title: "Introduction to Cybersecurity",
        questions: [
            {
                question: "What is the primary goal of the 'CIA Triad'?",
                options: [
                    "To hack into foreign governments.",
                    "To ensure Confidentiality, Integrity, and Availability.",
                    "To install antivirus software.",
                    "To create complex passwords."
                ],
                correct: 1
            },
            {
                question: "Which term describes a 'White Hat' hacker?",
                options: [
                    "A criminal who steals credit cards.",
                    "A government spy.",
                    "An ethical security researcher who improves defense.",
                    "Someone who hacks only for fun."
                ],
                correct: 2
            },
            {
                question: "What is 'Phishing'?",
                options: [
                    "A technique to catch fish using Wi-Fi.",
                    "A social engineering attack using deceptive emails.",
                    "A method of encrypting data.",
                    "The process of cleaning a hard drive."
                ],
                correct: 1
            }
        ]
    },
    'f-2': {
        title: "What is Virtualization",
        questions: [
            {
                question: "What is the primary function of a Hypervisor?",
                options: [
                    "To increase internet speed.",
                    "To create a software layer that allows running multiple OSs on one machine.",
                    "To bypass firewalls.",
                    "To clean viruses from the system."
                ],
                correct: 1
            },
            {
                question: "What is the security benefit of using a VM for malware analysis?",
                options: [
                    "It makes the malware run faster.",
                    "It isolates the malware in a sandbox, protecting the host machine.",
                    "It automatically deletes the malware.",
                    "It encrypts the malware source code."
                ],
                correct: 1
            },
            {
                question: "Where must you check if Virtualization is enabled if it shows as 'Disabled'?",
                options: [
                    "Windows Registry",
                    "BIOS / UEFI Firmware Settings",
                    "Browser Settings",
                    "System32 Folder"
                ],
                correct: 1
            }
        ]
    },
    'f-3': {
        title: "Hypervisors: Type 1 vs Type 2",
        questions: [
            {
                question: "Which type of Hypervisor installs directly on bare metal hardware?",
                options: [
                    "Type 1",
                    "Type 2",
                    "Type 3",
                    "Hybrid Type"
                ],
                correct: 0
            },
            {
                question: "VirtualBox and VMware Workstation are examples of which type?",
                options: [
                    "Type 1 (Bare Metal)",
                    "Type 2 (Hosted)",
                    "Cloud Hypervisors",
                    "Container Engines"
                ],
                correct: 1
            },
            {
                question: "Why is a Type 2 Hypervisor recommended for the FORGE learning path?",
                options: [
                    "It is faster than Type 1.",
                    "It requires a dedicated server.",
                    "It allows you to run labs on your existing laptop/desktop along with other apps.",
                    "It is the only one that supports Linux."
                ],
                correct: 2
            }
        ]
    },
    'e-1': {
        title: "Red Team Fundamentals",
        questions: [
            {
                question: "What is the primary objective of a Red Team?",
                options: [
                    "To fix bugs in software.",
                    "To simulate a realistic adversary attack to test defenses.",
                    "To manage the firewall rules.",
                    "To write security policies."
                ],
                correct: 1
            },
            {
                question: "Which phase comes first in the Cyber Kill Chain?",
                options: [
                    "Actions on Objectives",
                    "Exploitation",
                    "Reconnaissance",
                    "Command and Control"
                ],
                correct: 2
            }
        ]
    },
    'd-1': {
        title: "Blue Team Fundamentals",
        questions: [
            {
                question: "What is the core function of a SOC (Security Operations Center)?",
                options: [
                    "To develop marketing strategies.",
                    "To monitor, detect, and respond to cyber threats.",
                    "To build new servers.",
                    "To audit financial records."
                ],
                correct: 1
            }
        ]
    },
    'c-1': {
        title: "Purple Team Fundamentals",
        questions: [
            {
                question: "What defines a 'Purple Team' engagement?",
                options: [
                    "Red and Blue teams fighting without communication.",
                    "Collaborative testing where Red attacks and Blue verifies detection.",
                    "A team dedicated to physical security.",
                    "Managers who oversee the budget."
                ],
                correct: 1
            }
        ]
    },
    'arc-1': {
        title: "Security Architecture",
        questions: [
            {
                question: "What is 'Defense in Depth'?",
                options: [
                    "Digging deep trenches around the data center.",
                    "Relying solely on a strong firewall.",
                    "Layering multiple defensive controls to protect assets.",
                    "Buying the most expensive software."
                ],
                correct: 2
            }
        ]
    }
};
