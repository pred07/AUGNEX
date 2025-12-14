# Secure Development Lifecycle (SDLC/DevSecOps)

## 1. Orientation

### What this module covers
This module covers **Shifting Left**. Fixing bugs in design, not production.

### Fit in the Learning Path
Fixing a bug in Prod costs $10,000. Fixing it in Design costs $10.

### Learning Objectives
By the end of this module, you should understand:
*   **SAST/DAST/SCA**.
*   **Threat Modeling**.
*   **The Pipeline Guardrails**.

---

## 2. Core Content

### The Phases
1.  **Design**: Threat Model. (Architecture Analysis).
2.  **Code**: IDE Plugins (Linting).
3.  **Build**: SAST (Static Analysis) & SCA (Software Composition Analysis - catching vulnerable libraries).
4.  **Test**: DAST (Dynamic Analysis - attacking the running app).
5.  **Deploy**: RASP (Runtime Protection).

### DevSecOps
Security is not a gatekeeper at the end. Security is a guardrail throughout.
*   *Concept*: If SAST finds a Critical, the build fails. Automatically.

---

## 3. Guided Practice

### Pipeline Anatomy
**Toolchain**:
*   *GitHub*: Repo.
*   *Dependabot*: SCA (Checks `package.json`).
*   *SonarQube*: SAST (Checks code quality).
*   *OWASP ZAP*: DAST (Scans the staging URL).

**Exercise**: Where would you place a manual Pen Test? (Before major releases, but not every commit).

---

## 4. Reflection Check

1.  **False Positives**: If your SAST breaks the build for a fake error, Devs will turn it off. Tune aggressively.
2.  **Speed**: Scans must be fast. (Run deep scans nightly, quick scans per commit).
3.  **Culture**: Developers are not the enemy. They are the ones fixing the code. Help them.

---

## 5. Completion Criteria

This module is complete when:
1.  You can define **SAST** vs **DAST**.
2.  You understand the value of **SCA** (Supply Chain Security).
3.  You advocate for **Shifting Left**.
