# Mergers & Acquisitions (M&A) Security

## 1. Orientation

### What this module covers
This module covers **Due Diligence**. Buying a company = Buying their bugs.

### Fit in the Learning Path
The biggest breaches often happen after an acquisition. (e.g., Marriott/Starwood).

### Learning Objectives
By the end of this module, you should understand:
*   **The Due Diligence Checklist**.
*   **Integration Risks**.
*   **The "Clean Room" strategy**.

---

## 2. Core Content

### The Assessment
Before the deal closes:
1.  **Architecture Review**: Is it held together by duct tape?
2.  **Compromise Assessment**: Are they *already* hacked? (Deploy your tooling to check).
3.  **Data Map**: Do they have PII? (GDPR liability).

### Integration
Don't connect their network to yours on Day 1.
*   *Strategy*: Keep them separate (Clean Room) until they meet your standards.
*   *Accounts*: Create new accounts in your AD. Don't trust theirs.

---

## 3. Guided Practice

### The "Go / No-Go" Logic
**Scenario**: You find the target company has open RDP to the internet and no MFA.
**Decision**:
*   *Kill Deal*: Rare.
*   *Price Adjustment*: "It will cost $5M to fix their security. Reduce the purchase price by $5M."
*   *Isolation*: Buy them, but treat them as a hostile network.

---

## 4. Reflection Check

1.  **Speed**: M&A moves fast. Security is usually an afterthought. Fight for your seat at the table.
2.  **Culture Clash**: Their security team might be lax. You need to win hearts and minds, not just force policy.
3.  **Shadow IT**: They will hav servers under desks. Find them.

---

## 5. Completion Criteria

This module is complete when:
1.  You have a **Due Diligence Checklist**.
2.  You understand the **Marriott Breach** case study.
3.  You advocate for **Isolation before Integration**.
