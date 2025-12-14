# Resilience Engineering

## 1. Orientation

### What this module covers
This module covers **Chaos Engineering**. Breaking things on purpose to ensure they self-heal.

### Fit in the Learning Path
"Uptime is a Security Feature." - If the auth server is down, security is bypassed or business stops.

### Learning Objectives
By the end of this module, you should understand:
*   **Chaos Monkey**.
*   **Fault Tolerance**.
*   **Graceful Degradation**.

---

## 2. Core Content

### The Philosophy
Systems *will* fail. Minimize the blast radius.
*   **Robustness**: Withstanding a blow.
*   **Resilience**: Recovering from a blow.
*   **Antifragility**: Getting stronger from a blow.

### Chaos Engineering
Experimenting on production.
*   *Hypothesis*: "If we kill the Primary Database, the Secondary will take over in < 30 seconds."
*   *Test*: Kill the Primary.
*   *Result*: It took 5 minutes. (Fail). Fix the failover script.

---

## 3. Guided Practice

### Game Days
**Event**: Scheduled chaos.
**Scenario**: "Ransomware on the Payment Gateway."
1.  Isolate the gateway.
2.  Does the website switch to "Maintenance Mode" or crash with a stack trace?
3.  Can we route payments to PayPal instead?

---

## 4. Reflection Check

1.  **Safety**: Don't run chaos in prod until you trust staging.
2.  **Culture**: Don't fire the engineer who wrote the code that broke. Thank them for the learning opportunity.
3.  **Security**: Attackers are the ultimate Chaos Monkey. Be ready.

---

## 5. Completion Criteria

This module is complete when:
1.  You prioritize **Resilience** over **Perfection**.
2.  You conduct **Tabletop Exercises**.
3.  You design systems that **Fail Open** or **Fail Closed** deliberately.
