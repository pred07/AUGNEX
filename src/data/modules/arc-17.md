# Business Continuity & Disaster Recovery (BCP/DR)

## 1. Orientation

### What this module covers
This module covers **Survival**. When the building burns down.

### Fit in the Learning Path
The CISO is often responsible for ensuring the business survives physical and digital disasters.

### Learning Objectives
By the end of this module, you should understand:
*   **RTO (Recovery Time Objective)**.
*   **RPO (Recovery Point Objective)**.
*   **The BIA (Business Impact Analysis)**.

---

## 2. Core Content

### The Definitions
*   **RPO**: How much data can you lose? (e.g., "Max 1 hour of transactions"). Requires backups every hour.
*   **RTO**: How long can you be down? (e.g., "Max 4 hours"). Requires hot-standby site.
*   *Cost*: Lower RPO/RTO = Higher Cost.

### BCP vs DR
*   **DR**: Technical. "Restore the servers."
*   **BCP**: Organizational. "People work from home. We use paper forms."

---

## 3. Guided Practice

### The Backup Test
**Scenario**: You have backups.
**The Test**: Restore them.
*   *Shock*: 50% of companies fail to restore from tape/cloud.
*   *Rule of 3-2-1*: 3 Copies, 2 Media Types, 1 Offsite.

**Activity**: Restore a non-critical server from backup today.

---

## 4. Reflection Check

1.  **Ransomware**: Attackers encrypt backups first. Your backups must be **Immutable** (Write Once, Read Many).
2.  **Communication**: If email is down, how do you talk? (Signal, WhatsApp, Personal Phones).
3.  **Dependencies**: You restored the App, but the Auth server is still down. Dependency mapping is key.

---

## 5. Completion Criteria

This module is complete when:
1.  You have defined **RTO/RPO**.
2.  You have **Tested Backups**.
3.  You have a **Communication Plan** for outages.
