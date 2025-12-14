# IoT & OT Security (SCADA/ICS)

## 1. Orientation

### What this module covers
This module covers **Operational Technology**. Factories, Power Grids, and Medical Devices.

### Fit in the Learning Path
IT Security = Confidentiality. OT Security = Safety. (Human lives).

### Learning Objectives
By the end of this module, you should understand:
*   **The Purdue Model**.
*   **IT/OT Convergence**.
*   **Legacy Systems**.

---

## 2. Core Content

### The Purdue Model
*   **Level 4**: Enterprise (Email, ERP). -> *Connects to Internet*.
*   **Level 3**: DMZ.
*   **Level 2**: Control Center (HMI).
*   **Level 1**: PLCs (The robotic arms).
*   **Level 0**: Sensors/Actuators. -> *Physical World*.

### Safety First
You cannot "Scan" a PLC. It might crash and stop the assembly line.
*   *Passive Monitoring*: Sniff the traffic (Span Port). Do not ping.

---

## 3. Guided Practice

### The Air Gap Myth
**Scenario**: Engineers say "The factory is air-gapped."
**Reality**: A vendor plugs in a 4G modem for remote support. The gap is gone.
**Task**: Walk the floor. count the connections.

---

## 4. Reflection Check

1.  **Patching**: You can't patch a Windows XP machine running a centrifuge every Tuesday. You wrap it in firewalls.
2.  **Protocols**: Modbus/DNP3 have no authentication. (If you can talk to the PLC, you own it).
3.  **Culture**: OT Engineers hate IT. Bridging the gap requires respect for their uptime requirements.

---

## 5. Completion Criteria

This module is complete when:
1.  You know the **Purdue Model**.
2.  You prioritize **Safety** over **Confidentiality**.
3.  You use **Passive Monitoring** in OT.
