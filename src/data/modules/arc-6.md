# Zero Trust Architecture (ZTA)

## 1. Orientation

### What this module covers
This module covers moving from **Perimeter Security** to **Identity Security**. "Never Trust, Always Verify."

### Fit in the Learning Path
The castle wall is dead. The data is on Starbucks 5G.

### Learning Objectives
By the end of this module, you should understand:
*   **Identity as the Perimeter**.
*   **Micro-segmentation**.
*   **Continuous Auth**.

---

## 2. Core Content

### The Core Tenets (NIST SP 800-207)
1.  **All data sources and services are resources**.
2.  **All communication is secured regardless of network location**.
3.  **Access is granted on a per-session basis**.
4.  **Access is determined by dynamic policy**.

### The Implementation
*   **Old**: "I am on the VPN, so I can access everything."
*   **Zero Trust**: "I don't care if you are on the VPN. Who are you? Is your device patched? Do you need this specific server right now?"

---

## 3. Guided Practice

### Designing a ZT Flow
**Scenario**: User Accessing HR App.
**Checks**:
1.  **Identity**: MFA passed? (Okta).
2.  **Device**: Is the laptop managed? (Intune).
3.  **Health**: Is CrowdStrike running?
4.  **Context**: Is the user in their usual country?
5.  **Result**: Grant access for 1 hour.

---

## 4. Reflection Check

1.  **Legacy**: How do you do Zero Trust with a Mainframe? (Hard. You put a ZT Proxy in front of it).
2.  **User Friction**: If you ask for MFA every 5 minutes, users revolt. (Use "Risk-Based Auth").
3.  **Journey**: ZT is a multi-year journey, not a product you buy.

---

## 5. Completion Criteria

This module is complete when:
1.  You can define **Zero Trust** (It's not just a buzzword).
2.  You understand **Device Posture Checks**.
3.  You prioritize **Identity** over **IP Address**.
