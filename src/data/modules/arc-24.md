# Quantum Computing Risks

## 1. Orientation

### What this module covers
This module covers **Post-Quantum Cryptography** (PQC). "Store Now, Decrypt Later".

### Fit in the Learning Path
RSA-2048 will be broken. Not today, but effectively instantly when the quantum computer arrives.

### Learning Objectives
By the end of this module, you should understand:
*   **Shor's Algorithm**.
*   **Crypto-Agility**.
*   **PQC Standards** (NIST Crystals-Kyber).

---

## 2. Core Content

### The Threat
*   **Shor's Algorithm**: Breaks Asymmetric Crypto (RSA, ECC).
*   **Grover's Algorithm**: Weakens Symmetric Crypto (AES). (Solution: Double key size. AES-128 -> AES-256).

### Harvest Now, Decrypt Later
Attackers are stealing encrypted data *today*. They will keep it for 10 years until they can break it.
*   *Risk*: Long-term secrets (Genomic data, State secrets).

---

## 3. Guided Practice

### The Assessment
**Inventory**: Where do we use RSA?
1.  VPN Certificates.
2.  Web Server Certificates.
3.  JWT Signing Keys.
**Plan**: How hard is it to switch to Kyber? (Do libraries exist?).

---

## 4. Reflection Check

1.  **Timeline**: Experts say 5-15 years. But risk = Probability x Impact. Impact is total.
2.  **Preparation**: Inventory your crypto. If you don't know where keys are, you can't replace them.
3.  **AES**: AES-256 is remarkably quantum-resistant. We don't need to replace everything.

---

## 5. Completion Criteria

This module is complete when:
1.  You understand the **Harvest Now, Decrypt Later** threat.
2.  You prioritize **Inventory** of cryptography.
3.  You monitor **NIST PQC Standardization**.
