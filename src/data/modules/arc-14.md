# Data Loss Prevention (DLP) Strategy

## 1. Orientation

### What this module covers
This module covers keeping the data *inside*.

### Fit in the Learning Path
The perimeter failed. The endpoint failed. Stops the thief at the door.

### Learning Objectives
By the end of this module, you should understand:
*   **Network DLP**.
*   **Endpoint DLP**.
*   **The "Block" vs "Monitor" dilemma**.

---

## 2. Core Content

### Types
1.  **Network**: Watches the firewall implementation. "Hey, why is this PDF going to Mega.nz?"
2.  **Endpoint**: Watches the USB port / Clipboard. "User tried to copy 'Salary.xlsx' to USB."
3.  **Email**: "User is emailing 500 SSNs to Gmail."

### The Pattern
DLP relies on patterns (Regex) and Fingerprints (hashing documents).

---

## 3. Guided Practice

### Tuning the Noise
**Scenario**: You turn on "Block all Credit Card Numbers".
**Result**: The Support Team can't email customers their billing updates. Chaos.
**Fix**:
1.  Run in **Monitoring Mode** for 30 days.
2.  Identify business workflows.
3.  Create exceptions (e.g., "Allow Finance Group to email Billing Partners").
4.  Switch to **Block Mode**.

---

## 4. Reflection Check

1.  **Culture**: DLP tells employees "We don't trust you." balancing act.
2.  **Steganography**: Advanced attackers hide data in images. DLP misses this. (DLP checks for *accidental* or *unsophisticated* loss).
3.  **Cloud**: DLP must extend to CASB (Cloud Access Security Broker) to stop Google Drive uploads.

---

## 5. Completion Criteria

This module is complete when:
1.  You have deployed **DLP in Monitor Mode**.
2.  You have a process for **Business Exceptions**.
3.  You cover **USB, Email, and Web**.
