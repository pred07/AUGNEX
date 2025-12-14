# Blockchain & Web3 Security

## 1. Orientation

### What this module covers
This module covers **Smart Contracts** and **Wallet Security**.

### Fit in the Learning Path
"Code is Law." If the code has a bug, the money is gone. Irreversibly.

### Learning Objectives
By the end of this module, you should understand:
*   **Reentrancy Attacks**.
*   **Cold vs Hot Wallets**.
*   **Rug Pulls**.

---

## 2. Core Content

### Smart Contract Auditing
Once deployed, you can't patch it (usually).
*   **Reentrancy**: Calling a function before the previous one updates the balance. (The DAO Hack).
*   **Integer Overflow**: Rolling over the number of tokens.

### Corporate Crypto
If your company holds crypto:
*   Use Multi-Sig (Requires 3 of 5 keys to move funds).
*   Use Institutional Custody (Coinbase Prime/Fireblocks).

---

## 3. Guided Practice

### The Phishing Sign
**Scenario**: User connects MetaMask to `malicious-site.com`.
**Request**: "Set Approval for All".
**Action**: User clicks Sign.
**Result**: Wallet drained.
**Defense**: Hardware Wallets (Ledger) with clear signing screens.

---

## 4. Reflection Check

1.  **Immutability**: The feature is the bug. You can't rollback a hack.
2.  **Transparency**: Everyone can see your balance. Privacy is hard (Zero Knowledge Proofs are the solution).
3.  **Hype**: 99% of Web3 projects are scams. Focus on the underlying tech capability.

---

## 5. Completion Criteria

This module is complete when:
1.  You understand **Smart Contract Risks**.
2.  You enforce **Multi-Sig** for corporate interaction.
3.  You recognize **Wallet Phishing**.
