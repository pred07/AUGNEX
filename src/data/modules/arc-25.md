# 5G & Edge Computing

## 1. Orientation

### What this module covers
This module covers **The Edge**. Computing happening on the tower/device, not the cloud.

### Fit in the Learning Path
The perimeter is now 5 miles away on a Cell Tower.

### Learning Objectives
By the end of this module, you should understand:
*   **Slice Security**.
*   **Physical Security at Edge**.
*   **Distributed Denial of Service**.

---

## 2. Core Content

### Network Slicing
5G allows "Slices". One slice for self-driving cars (Low Latency), one for Netflix (High Bandwidth).
*   *Risk*: Breaking out of the slice. (Side channel attacks).

### The Edge
Servers in a box at a retail store.
*   *Threat*: Someone picks up the box and runs.
*   *Defense*: Disk Encryption + TPM.

---

## 3. Guided Practice

### Trusted Boot
**Scenario**: Edge device rebooting.
**Process**:
1.  Hardware checks BIOS signature.
2.  BIOS checks Bootloader signature.
3.  Bootloader checks Kernel signature.
4.  Kernel checks OS partition.
**Goal**: If any byte changes, the device refuses to boot.

---

## 4. Reflection Check

1.  **Scale**: Managing 1 Cloud region is hard. Managing 10,000 Edge nodes is harder. Automation is key.
2.  **Zero Trust**: Assume every Edge node is compromised. Don't let them talk to each other unless necessary.
3.  **Privacy**: Edge cameras processing data locally. Ensure data is deleted after processing.

---

## 5. Completion Criteria

This module is complete when:
1.  You secure **Physical Access** to Edge.
2.  You rely on **Trusted Boot**.
3.  You understand **5G Slicing**.
