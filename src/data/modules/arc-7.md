# Defense in Depth (Layered Defense)

## 1. Orientation

### What this module covers
This module covers the **Onion Model**. Avoiding Single Points of Failure (SPOF).

### Fit in the Learning Path
Controls fail. The Architect assumes failure and adds another layer.

### Learning Objectives
By the end of this module, you should understand:
*   **The Layers**: Physical, Network, Host, App, Data.
*   **Diversity of Defense**.
*   **Delay vs Prevent**.

---

## 2. Core Content

### The Layers
1.  **Physical**: Guards, Locks.
2.  **Network**: Firewalls, NIDS.
3.  **Host**: EDR, Patching.
4.  **App**: Input Validation, WAF.
5.  **Data**: Encryption, DLP.

### Diversity
If your Firewall is Cisco, your Endpoint is Cisco, and your IDP is Cisco... a single CVE in Cisco code owns you.
*   *Strategy*: Mix vendors (Constructively). Or assume the vendor will fail.

---

## 3. Guided Practice

### Analyzing an Attack Path
**Attack**: Phishing -> Malware -> Data Exfil.
**Layers**:
1.  *Email Gateway*: Scans attachment. (Layer 1).
2.  *User Training*: Notices typo. (Layer 2).
3.  *Endpoint AV*: Detects execution. (Layer 3).
4.  *Egress Filter*: Blocks connection to C2. (Layer 4).

**Exercise**: Remove any 2 layers. Does the attack succeed? (Ideally, no).

---

## 4. Reflection Check

1.  **Complexity**: Too many layers = Unmanageable. (Balance).
2.  **Cost**: Each layer costs money. Focus on the "Crown Jewels".
3.  **Detection**: Defense in Depth is also *Detection in Depth*. More chances to hear the alarm.

---

## 5. Completion Criteria

This module is complete when:
1.  You can map controls to **Layers**.
2.  You avoid **Single Points of Failure**.
3.  You ensure that a failure in one layer is caught by the next.
