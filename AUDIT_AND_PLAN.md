# Content Quality Audit & Upgrade Roadmap

## 1. Quality Audit
**Status as of:** 2026-02-01

| Path | Total Modules | Expert Quality | Scaffold (Template) | Status |
|------|--------------|----------------|---------------------|--------|
| **Forge** | 27 | 27 (100%) | 0 | 🟢 Complete |
| **Attack** | 60 | 60 (100%) | 0 | 🟢 Complete |
| **Defense** | 45 | 45 (100%) | 0 | 🟢 Complete |
| **Convergence**| 40 | 40 (100%) | 0 | 🟢 Complete |
| **Architect** | 40 | 40 (100%) | 0 | 🟢 Complete |
| **Sentinel** | 40 | 40 (100%) | 0 | 🟢 Complete |
| **Builder** | 40 | 40 (100%) | 0 | 🟢 Complete |

**Definition of "Scaffold":**
*   File size < 3KB.
*   Contains generic headers ("Concept A", "Concept B").
*   Missing specific technical depth (Code snippets, specific tool commands).

## 2. Batch Implementation Plan
To complete the remaining ~70 modules without errors, we will execute in **10 Batches**.

### ✅ Batch 1: OSINT & Recon (Sentinel Phase 2)
*   **Modules:** s-6 to s-13
*   **Topic:** Dorking, SOCMINT, Dark Web, IMINT.
*   **Status:** *Ready to Run (Created by AI Agent)*

### ✅ Batch 2: Advanced Engineering (Builder Phase 2 & 3)
*   **Modules:** b-10 to b-15
*   **Topic:** Virtualization, Python/Bash Automation, Secure Coding.
*   **Status:** *Deployed*

### ✅ Batch 3: Tactical CTI (Sentinel Phase 3)
*   **Modules:** s-14 to s-20
*   **Topic:** IOCs, YARA, SIGMA, Malware Analysis.
*   **Status:** *Deployed*

### ✅ Batch 4: Infrastructure as Code (Builder Phase 4)
*   **Modules:** b-16 to b-20
*   **Topic:** Terraform, Ansible, Policy-as-Code.
*   **Status:** *Deployed*

### ✅ Batch 5: Operational Intel (Sentinel Phase 4)
*   **Modules:** s-21 to s-25
*   **Topic:** Attribution, Kill Chain, Diamond Model.
*   **Status:** *Deployed*

### ✅ Batch 6: Cloud Security (Builder Phase 5)
*   **Modules:** b-21 to b-25
*   **Topic:** AWS/Azure/GCP Security Design.
*   **Status:** *Deployed*

### ✅ Batch 7: Strategic Intel (Sentinel Phase 5)
*   **Modules:** s-26 to s-30
*   **Topic:** Geopolitics, Briefings, Risk Analysis.
*   **Status:** *Deployed*

### ✅ Batch 8: DevSecOps (Builder Phase 6)
*   **Modules:** b-26 to b-30
*   **Topic:** CI/CD, Containers, Kubernetes.
*   **Status:** *Deployed*

### ✅ Batch 9: Intel Tooling (Sentinel Phase 6/7)
*   **Modules:** s-31 to s-40
*   **Topic:** MISP, OpenCTI, AI in CTI.
*   **Status:** *Deployed*

### ✅ Batch 10: Detection Engineering (Builder Phase 7/8)
*   **Modules:** b-31 to b-38, b-40
*   **Topic:** SIEM, EDR, Logging, Capstone.
*   **Status:** *Deployed*

## 3. How to Run
1.  Ensure `scripts/batches/batch_X.json` exists.
2.  Run: `node scripts/upgrade_content.cjs --batch=X`
