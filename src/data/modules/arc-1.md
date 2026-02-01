# Security Architecture Fundamentals

## 1. Orientation

### What this module covers
This module marks the transition from security operator to security architect. You will learn to think in systems—understanding how security decisions at the design phase cascade through implementation, operations, and eventual incidents. Architects don't just secure systems; they design systems that are inherently more securable.

### Fit in the Learning Path
This is the **first module** of the ARCHITECT path (OVERWATCH). You've learned to attack systems, defend them, and bridge the gap. Now you learn to design them. Architecture is where security strategy becomes reality—where policies become controls and where trade-offs become permanent constraints.

### Learning Objectives
By the end of this module, you will:
*   Distinguish architectural thinking from operational thinking
*   Apply security design principles at the system level
*   Understand the architect's role in organizational security
*   Navigate the trade-offs between security, business, and usability

---

## 2. Core Content

### Mental Model: Designing the Battlefield

**How architects think:**
Operators fight battles on terrain they're given. Architects design the terrain.

```
Operator Question: "How do I secure this server?"
Architect Question: "Should this server exist? Where should it be? What connections does it need?"
```

**The leverage principle:**
A 30-minute architecture decision impacts years of operations. A misconfigured firewall rule can be fixed in minutes. A poorly designed network topology requires years to remediate.

### The Shift: From Tactics to Strategy

| Dimension | Operator Thinking | Architect Thinking |
|-----------|-------------------|-------------------|
| **Time horizon** | Days to weeks | Years to decades |
| **Scope** | Individual systems | Entire environments |
| **Success metric** | "Is it secure now?" | "Will it remain securable?" |
| **Failure mode** | Incident occurs | Incidents become inevitable |
| **Primary tool** | Configuration | Design |

**Critical insight:** Architects make decisions that operators cannot easily change. A database placed in the wrong network segment, a protocol chosen without forward-looking consideration, or an authentication model that doesn't scale—these become technical debt that persists for years.

### Core Architectural Thinking Patterns

#### 1. Think in Trust Boundaries
Every architecture can be decomposed into zones of trust. The fundamental questions:
- What assets exist in each zone?
- What is the trust level of each zone?
- What must flow between zones?
- How is that flow controlled and monitored?

**Example: Three-tier web application**
```
[Internet Zone]    →   [DMZ / Web Tier]   →   [App Zone]   →   [Data Zone]
                   ↑                      ↑               ↑
                   │                      │               │
              WAF, DDoS              Firewall        DB Firewall + Auth
              Load Balancer          Auth Proxy      Encryption in transit
```

Each arrow represents a trust boundary that must be explicitly controlled.

#### 2. Think in Failure Modes
Architects assume everything will fail. The question isn't "Will this fail?" but "How will it fail, and what's the blast radius?"

**Failure mode analysis:**
- **Single point of failure:** If this component fails, what else fails?
- **Blast radius:** If this component is compromised, what else is compromised?
- **Recovery path:** How do we restore service after failure?
- **Detection capability:** Will we know when this component fails/is compromised?

#### 3. Think in Data Flows
Security follows data. If you don't know where data flows, you can't protect it.

**Data flow analysis questions:**
- Where is data created/ingested?
- Where is data stored (at rest)?
- Where does data move (in transit)?
- Where is data processed?
- Where is data destroyed?
- Who/what can access data at each stage?

#### 4. Think in Attack Paths
Architects think like attackers—not to exploit, but to identify design weaknesses.

**Attack path analysis:**
- What paths lead from the internet to crown jewels?
- Which paths have the fewest controls?
- What single compromise enables the most lateral movement?
- Where are credentials cached or exposed?

### Foundational Security Architecture Principles

#### Defense in Depth
No single control is sufficient. Layer multiple controls so that failure of one doesn't mean total failure.

**Implementation:**
- Network: Perimeter firewall + Internal segmentation + Host firewall
- Identity: Password + MFA + Behavioral analytics
- Data: Access control + Encryption + DLP

**Architect's caution:** Defense in depth is not "add more tools." It's "layer independent controls." If all controls rely on the same authentication system, they're not independent.

#### Least Privilege (Architectural Scale)
Not just user permissions—every component should have minimum necessary access.

**Component-level least privilege:**
- Application servers shouldn't have direct internet access
- Database servers shouldn't be able to reach email servers
- Build systems shouldn't have production credentials

#### Separation of Duties
Critical operations should require multiple actors/approvals.

**Architectural separation:**
- Developer ≠ Deployer to production
- Security reviewer ≠ Code author
- Key generator ≠ Key user

#### Secure by Default
Systems should be secure in their default state, requiring explicit action to reduce security.

**Examples:**
- Deny all network traffic by default; explicitly permit required flows
- Encrypt data at rest by default; require justification for unencrypted
- Require authentication by default; explicitly mark public endpoints

### The Architect's Position in the Organization

**Where architects sit:**
```
                ┌─────────────┐
                │   CISO      │
                └──────┬──────┘
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
┌───▼───┐        ┌─────▼─────┐      ┌─────▼─────┐
│SecOps │        │ Security  │      │ GRC       │
│       │        │ Architect │      │           │
└───────┘        └───────────┘      └───────────┘
                       │
                       ▼
              ┌───────────────────┐
              │ Enterprise/Cloud  │
              │ Architects        │
              │ Development Teams │
              └───────────────────┘
```

**Architect responsibilities:**
- Review and approve architectural designs
- Define security standards and patterns
- Translate security requirements into implementable designs
- Guide technology selection
- Assess risk of architectural decisions

#### The "No" vs "How" Problem

**Poor architect:** "No, you can't use that technology."
**Good architect:** "Here's how to use that technology securely."

Architects who only say "no" become bottlenecks and get bypassed. Architects who enable secure solutions become partners.

### Trade-off Navigation

Architects constantly balance competing priorities:

#### Security vs Usability
More authentication friction → Lower user adoption → Shadow IT → Less security

**Architecture solution:** Risk-based authentication (challenge when risky, not always)

#### Security vs Performance
More encryption → More latency → User complaints

**Architecture solution:** Identify where encryption is mandatory vs optional based on data sensitivity

#### Security vs Cost
Required security controls → Budget exceeded → Controls not implemented

**Architecture solution:** Prioritize controls by risk reduction per dollar spent

#### Security vs Time to Market
Security review required → Release delayed → Business pressure to skip

**Architecture solution:** Shift left—integrate security into design phase, not review phase

### Frameworks for Architects

#### SABSA (Sherwood Applied Business Security Architecture)
Business-driven security architecture. Start with business requirements, derive security requirements.

**Key concept:** A security architecture that doesn't serve business objectives is overhead.

#### TOGAF (The Open Group Architecture Framework)
Enterprise architecture framework with security integration.

**Key concept:** Security is a cross-cutting concern that influences all architectural domains.

#### NIST Cybersecurity Framework
Risk-based approach: Identify → Protect → Detect → Respond → Recover

**Key concept:** Architectures should enable all five functions, not just protection.

---

## 3. Guided Practice

### Exercise 1: Trust Boundary Mapping

Draw the trust boundaries for this scenario:

**System:** Customer-facing e-commerce application
**Components:**
- CDN for static assets
- Load balancer
- Web application servers (3)
- API gateway
- Microservices (payment, inventory, user)
- Database (PostgreSQL)
- Third-party payment processor (Stripe)
- Customer browser

Identify:
- What are the trust zones?
- What flows between zones?
- Where are the most critical boundaries?

### Exercise 2: Failure Mode Analysis

**Component:** API Gateway that handles all authentication for an organization

- **If it fails completely (outage):** ____________
- **If it fails silently (passes all requests):** ____________
- **If credentials are stolen:** ____________
- **Design mitigation for each failure mode:** ____________

### Exercise 3: Security vs Business Trade-off

**Scenario:** The development team wants to use a new open-source database that's faster but has fewer security certifications.

How would you approach this? What questions would you ask? What conditions would you set?

---

## 4. Reflection Check

### Strategic Thinking
1. Why is a poorly designed architecture harder to fix than a misconfigured system?

2. A startup says "We'll add security later when we scale." What's the architectural counterargument?

3. How does cloud computing change the architect's role compared to traditional on-premise environments?

### Organizational Dynamics
1. An architect who always says "no" is ________. An architect who enables "how" is ________.

2. How should a security architect influence decisions when they don't have direct authority over development teams?

3. What happens when security architecture is created in isolation from enterprise architecture?

---

## 5. Key Misconceptions

**MYTH: "Architects design, operators implement—they're separate"**
REALITY: Good architecture considers operational reality. Designs that can't be operated securely are failures.

**MYTH: "More controls = more security"**
REALITY: Overlapping, complex controls create gaps and operational burden. Simplicity is a security property.

**MYTH: "Architecture is just drawing diagrams"**
REALITY: Diagrams represent decisions. The value is in the decision-making, not the drawing.

**MYTH: "Security architecture is the CISO's job"**
REALITY: The CISO sets strategy. Security architects translate strategy into implementable designs.

**MYTH: "Best practices are always right"**
REALITY: Best practices are starting points. Context determines what's actually best for your organization.

---

## 6. Completion Criteria

This module is complete when you can:

1. **Explain** the difference between operational and architectural security thinking
2. **Apply** trust boundary analysis to a system design
3. **Identify** failure modes and blast radius for critical components
4. **Navigate** trade-offs between security, usability, and business requirements
5. **Articulate** the architect's role and influence within an organization

---

## 7. Further Depth (Optional)

*   **Reading:** "Security Engineering" by Ross Anderson (classic text, free online)
*   **Framework:** SABSA White Paper (business-driven security architecture)
*   **Resource:** AWS Well-Architected Security Pillar
*   **Exercise:** Review an architecture diagram from your organization—identify trust boundaries and gaps
