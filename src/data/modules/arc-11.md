# Data Governance Strategy

## 1. Orientation

### What this module covers
This module covers knowing what you have. **Data Classification** and **Ownership**.

### Fit in the Learning Path
You cannot protect "Data". You can only protect "Generic Stuff". You must know specific value.

### Learning Objectives
By the end of this module, you should understand:
*   **Classification Levels** (Public, Internal, Confidential, Restricted).
*   **Data Owners** vs **Data Custodians**.
*   **Data Lifecycle**.

---

## 2. Core Content

### The Levels
*   **Public**: Marketing website. (Risk: Reputation).
*   **Internal**: Employee handbook. (Risk: Operation).
*   **Confidential**: PII, Salaries. (Risk: Legal/Financial).
*   **Restricted**: Mergers & Acquisitions info. (Risk: Existential).

### Roles
*   **Owner**: The VP of Sales (Decides who accesses the CRM).
*   **Custodian**: The IT Admin (Configures the permissions on the CRM).
*   *Conflict*: IT should not decide who sees what. The Business Owner must decide.

---

## 3. Guided Practice

### The Tagging Exercise
**Scenario**: You have 100TB of unstructured data on a file server.
**Task**: Use a tool (like Varonis or AIP) to scan and tag.
1.  **Regex Scan**: Find `\d{3}-\d{2}-\d{4}` (SSN).
2.  **Auto-Tag**: Apply label "Confidential".
3.  **Policy**: Block "Confidential" files from being emailed outside.

---

## 4. Reflection Check

1.  **Rot**: Data is toxic. Keep it only as long as legally required. (Retention Policy).
2.  **Shadow Data**: Users copying data to USB drives. (Endpoint Controls).
3.  **Buy-in**: Users hate tagging files. Automate it.

---

## 5. Completion Criteria

This module is complete when:
1.  You have defined **Classification Levels**.
2.  You identify **Data Owners**.
3.  You understand the **Data Lifecycle** (Create -> Store -> Use -> Share -> Archive -> Destroy).
