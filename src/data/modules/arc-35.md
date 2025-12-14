# Zero Trust for Remote Work

## 1. Orientation

### What this module covers
This module covers **Work From Anywhere**. The Death of the VPN.

### Fit in the Learning Path
The office is dead (or hybrid). The LAN is the Internet.

### Learning Objectives
By the end of this module, you should understand:
*   **SASE (Secure Access Service Edge)**.
*   **Always-On VPN** vs **App Proxy**.
*   **BYOD (Bring Your Own Device)**.

---

## 2. Core Content

### SASE
Convergence of Network (SD-WAN) and Security (CASB/FWaaS).
*   Traffic goes from Laptop -> SASE Cloud -> Internet/App.
*   Policy is applied at the SASE Cloud.

### BYOD
*   *Risk*: Corporate data on personal iPhone.
*   *Solution*: MAM (Mobile Application Management). Containerize the Outlook app. If they quit, wipe the Outlook container, not the family photos.

---

## 3. Guided Practice

### The Coffee Shop Test
**Scenario**: User at Starbucks.
**Attack**: Evil Twin Wi-Fi.
**Defense**:
1.  **Transport**: TLS Everywhere.
2.  **DNS**: Encrypted DNS (DoH).
3.  **Endpoint**: Firewall blocks inbound connections.
*   *Result*: The network is assumed hostile. User is safe.

---

## 4. Reflection Check

1.  **Performance**: If security slows down Zoom, users turn it off. Latency matters.
2.  **Privacy**: Don't inspect personal banking traffic on BYOD. (Split Tunneling).
3.  **Identity**: Does the user need a YubiKey? (Yes).

---

## 5. Completion Criteria

This module is complete when:
1.  You adopt a **Internet-First** network strategy.
2.  You implement **MAM** for BYOD.
3.  You treat **Starbucks Wi-Fi** the same as **Office Wi-Fi**.
