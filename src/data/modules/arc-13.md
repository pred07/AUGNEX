# Encryption Strategy (PKI)

## 1. Orientation

### What this module covers
This module covers **Cryptography Management**. Not the math, but the *process*.

### Fit in the Learning Path
Crypto is hard. Bad crypto is worse than no crypto (false sense of security).

### Learning Objectives
By the end of this module, you should understand:
*   **Data at Rest vs In Transit**.
*   **Key Management (KMS/HSM)**.
*   **Certificate Lifecycle (CLM)**.

---

## 2. Core Content

### The Triangle
1.  **At Rest**: Disk Encryption (BitLocker), DB Encryption (TDE).
2.  **In Transit**: TLS 1.3. (Disable SSLv3, TLS 1.0, 1.1).
3.  **In Use**: Enclaves (Intel SGX). Rare, but emerging.

### Key Management
The Lock is only as good as the Key.
*   Don't hardcode keys in GitHub.
*   Use an HSM (Hardware Security Module) for root keys.
*   Rotate keys annually.

---

## 3. Guided Practice

### The Expired Cert
**Scenario**: The website certificate expired at 2 AM. Revenue stops.
**Root Cause**: Manual process. Admin forgot.
**Fix**: Automate with ACME Protocol (Let's Encrypt / Certbot).
**Policy**: Alert 30 days before expiration.

---

## 4. Reflection Check

1.  **Quantum**: Post-Quantum Crypto is coming. Be crypto-agile (able to switch algos).
2.  **Visibility**: You can't inspect encrypted traffic. (You need TLS Interception/Inspection at the firewall).
3.  **Backdoors**: Never, ever build a backdoor. (Attackers *will* find it).

---

## 5. Completion Criteria

This module is complete when:
1.  You enforce **TLS 1.2+**.
2.  You automate **Certificate Renewal**.
3.  You use a **KMS** for secrets.
