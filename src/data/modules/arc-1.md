# The Security Architect's Role

## 1. Orientation

### What this module covers
This module covers the shift from **Operator** to **Architect**. Thinking in systems, not tickets.

### Fit in the Learning Path
You are now in **Overwatch**. You see the whole board. The generic soldier triggers the tactical trap; the architect designed the battlefield.

### Learning Objectives
By the end of this module, you should understand:
*   **Systemic Thinking**.
*   **Design Principles**.
*   **The "No" vs "How"**.

---

## 2. Core Content

### The Shield design
An architect doesn't just configure the firewall. They decide *where* the firewall goes.
*   **Operator**: "I blocked port 80."
*   **Architect**: "Why do we have a web server in the accounting subnet?"

### Resilience > Protection
You cannot stop everything.
*   *Old Way*: Build a higher wall.
*   *New Way*: Assume the wall falls. How do we survive? (Segmentation, Backups, Redundancy).

---

## 3. Guided Practice

### The Whiteboard Interview
**Scenario**: "Design a secure photo sharing app."
**Operator Answer**: Use HTTPS and encrypt the DB.
**Architect Answer**:
1.  **Threat Model**: Who are the attackers? (Script kiddies? Nation states?).
2.  **Data Flow**: Where does the photo go? S3? CDN?
3.  **Auth**: OAuth2 or SAML?
4.  **Privacy**: GDPR implications?

**Exercise**: Sketch the data flow for a generic "Login" page. Where are the chokepoints?

---

## 4. Reflection Check

1.  **Cost**: Security is expensive. An Architect balances Risk vs Cost. (Don't spend $1M to protect $1000).
2.  **Usability**: If you make it too secure, users will bypass it. (The "Shadow IT" problem).
3.  **Future-proof**: Will this design work in 5 years? (Scalability).

---

## 5. Completion Criteria

This module is complete when:
1.  You stop looking for **Tools** and start looking for **Design Flaws**.
2.  You can draw a **Network Diagram** from memory.
3.  You understand that **Business Goals** dictate **Security Architecture**.
