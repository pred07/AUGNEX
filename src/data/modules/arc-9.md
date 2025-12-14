# Cloud Security Architecture

## 1. Orientation

### What this module covers
This module covers the **Shared Responsibility Model** and Cloud-Native security.

### Fit in the Learning Path
The Cloud is not just "someone else's computer". It's a programmable datacenter.

### Learning Objectives
By the end of this module, you should understand:
*   **IaaS vs PaaS vs SaaS**.
*   **CSPM (Cloud Security Posture Management)**.
*   **IAM Roles**.

---

## 2. Core Content

### Shared Responsibility
*   **IaaS (EC2)**: You own the OS, the App, the Data. AWS owns the hardware.
*   **PaaS (RDS)**: You own the Data. AWS owns the OS and Hardware.
*   **SaaS (Gmail)**: You own the Config/Data. Google exercises the rest.

### The Cloud Difference
*   **Ephemeral**: Servers live for minutes. IP addresses change.
*   **API Driven**: Infrastructure is Code. Security is Code.
*   **Identity is Key**: IAM roles replace firewall rules in many cases.

---

## 3. Guided Practice

### The S3 Bucket Leak
**Scenario**: User uploads `passwords.txt` to a public bucket.
**Prevention**:
1.  **Organization Policy**: "Block Public Access" enabled at the Org level.
2.  **Detection**: CSPM tool (like Wiz or Prisma) scans API and alerts instantly.
3.  **Remediation**: Lambda function auto-remediates (makes it private).

---

## 4. Reflection Check

1.  **Visibility**: It's easy to spin up a server and forget it. (Shadow Cloud).
2.  **Cost**: DDoS in the cloud = Financial DDoS (Autoscaling bill).
3.  **Multi-Cloud**: AWS security != Azure security. Specialization is required.

---

## 5. Completion Criteria

This module is complete when:
1.  You can explain the **Shared Responsibility Model**.
2.  You understand why **IAM** is critical in Cloud.
3.  You know what **CSPM** is.
