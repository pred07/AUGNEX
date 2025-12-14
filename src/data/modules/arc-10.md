# Identity and Access Management (IAM) Strategy

## 1. Orientation

### What this module covers
This module covers **Authentication**, **Authorization**, and **Accounting** (AAA). The keys to the kingdom.

### Fit in the Learning Path
Identity is the new perimeter. If I am you, I am in.

### Learning Objectives
By the end of this module, you should understand:
*   **SSO (Single Sign-On)**.
*   **MFA (Multi-Factor Auth)**.
*   **RBAC vs ABAC**.
*   **PAM (Privileged Access Management)**.

---

## 2. Core Content

### The Golden Rule: Least Privilege
Users should have exactly enough access to do their job, and no more.
*   **RBAC (Role Based)**: "Managers" can approve.
*   **ABAC (Attribute Based)**: "Managers" can approve IF "Time is 9-5" AND "Location is Office".

### Life Cycle
1.  **Joiner**: Account creation. (Automate this).
2.  **Mover**: Changed departments. (Revoke old access!).
3.  **Leaver**: Fired/Quit. (Disable immediately!).

---

## 3. Guided Practice

### Designing PAM
**Problem**: Admins share the root password.
**Solution**: CyberArk / Thycotic.
1.  Admin logs into Vault.
2.  Vault rotates root password on server.
3.  Vault logs admin into server.
4.  Admin never sees the password.
5.  Session is recorded.

---

## 4. Reflection Check

1.  **User Experience**: If IAM is hard, users share passwords. Make it seamless (SSO).
2.  **Service Accounts**: The forgotten identity. Rotate their keys too.
3.  **Break Glass**: What if the Vault breaks? Have a physical "Break Glass" account in a safe.

---

## 5. Completion Criteria

This module is complete when:
1.  You advocate for **MFA Everywhere**.
2.  You understand **JML (Joiners, Movers, Leavers)**.
3.  You design for **Privileged Access Management**.
