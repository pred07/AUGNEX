# Third Party Risk Management (TPRM)

## 1. Orientation

### What this module covers
This module covers **Vendor Risk**. "SolarWinds".

### Fit in the Learning Path
You secured your house, but you gave the keys to the plumber. Is the plumber secure?

### Learning Objectives
By the end of this module, you should understand:
*   **The SIG (Standard Information Gathering)** questionnaire.
*   **SOC 2 Reports**.
*   **Continuous Monitoring**.

---

## 2. Core Content

### The Assessment
Before buying software:
1.  **Review SOC 2 Type II**: Did an auditor check them?
2.  **Review Pen Test**: Did they fix the Criticals?
3.  **Review Liability**: If they leak your data, do they pay?

### Supply Chain Attacks
Attackers compromise the vendor to get to you.
*   *Defense*: Zero Trust. Treat vendor software as untrusted. Segment it.

---

## 3. Guided Practice

### Reading a SOC 2
**Scenario**: Vendor hands you a flexible SOC 2 report.
**Check**:
1.  **Scope**: Did they audit the *whole* company or just the "Print Server"?
2.  **Exceptions**: Look at the "Qualified Opinion". Did the auditor say "It's good, EXCEPT..."?
3.  **Bridge Letter**: Ensure the report covers the current dates.

---

## 4. Reflection Check

1.  **Questionnaires**: Everyone lies on questionnaires. "Do you encrypt data?" "Yes." (But maybe they use ROT13).
2.  **Scoring**: Use tools (SecurityScorecard/BitSight) for outside-in views.
3.  **Offboarding**: When you fire a vendor, they must delete your data. Prove it.

---

## 5. Completion Criteria

This module is complete when:
1.  You have a **Vendor Onboarding Process**.
2.  You know how to read a **SOC 2**.
3.  You segment **Vendor Access**.
