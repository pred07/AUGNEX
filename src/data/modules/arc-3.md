# Business Alignment

## 1. Orientation

### What this module covers
This module covers the hardest truth: **Security implies a cost**.

### Fit in the Learning Path
The business exists to make money (or save lives/serve public). Security exists to enable that mission, not to stop it.

### Learning Objectives
By the end of this module, you should understand:
*   **The Department of "No"**.
*   **Enabling Velocity**.
*   **Risk Appetite**.

---

## 2. Core Content

### The Friction
*   *Dev*: "We need to deploy 10 times a day."
*   *Sec*: "We need to manual pen test every release."
*   *Result*: Dev bypasses Sec.

### The Alignment
*   *Sec*: "We will build automated tests in the pipeline. If you pass, you deploy."
*   *Result*: Dev moves fast and is secure. Alignment.

### Risk Appetite
Does a startup need the same security as a Bank? No.
*   **Startup**: Speed > Security.
*   **Bank**: Security > Speed.

---

## 3. Guided Practice

### The Feature Request
**Scenario**: Marketing wants to put a "File Upload" form on the public site for a contest.
**Bad Architect**: "No. Too risky."
**Good Architect**: "Ok. But we need to:
1.  Host it on a separate domain (sandbox).
2.  Strip EXIF data.
3.  Scan for malware asynchronously.
4.  Does the budget cover these controls?"

---

## 4. Reflection Check

1.  **Revenue**: If your security control stops the sales team from selling, remove the control. (Then find a better one).
2.  **Language**: Don't talk "XSS". Talk "Brand Reputation Damage".
3.  **Partnership**: Go to lunch with the VP of Sales. Understand their pain.

---

## 5. Completion Criteria

This module is complete when:
1.  You stop being the **Department of No**.
2.  You align security controls with **Business Velocity**.
3.  You understand **Risk Appetite**.
