const fs = require('fs');
const path = require('path');

// Paths
const DATA_DIR = path.join(__dirname, '../src/data');
const MODULES_DIR = path.join(DATA_DIR, 'modules');
const LEARNING_PATHS_FILE = path.join(DATA_DIR, 'learningPaths.js');

// Ensure modules dir exists
if (!fs.existsSync(MODULES_DIR)) {
    fs.mkdirSync(MODULES_DIR, { recursive: true });
}

// 1. Read and Parse Learning Paths (Simple Regex Parse to avoid ESM issues)
const content = fs.readFileSync(LEARNING_PATHS_FILE, 'utf8');

// Regex to find modules: { id: 'b-3', title: "Threat Modeling", ... }
const moduleRegex = /{\s*id:\s*'([^']+)',\s*title:\s*"([^"]+)",\s*type:\s*"([^"]+)"/g;
let match;
const modules = [];

while ((match = moduleRegex.exec(content)) !== null) {
    modules.push({
        id: match[1],
        title: match[2],
        type: match[3]
    });
}

console.log(`Found ${modules.length} module definitions in learningPaths.js`);

// 2. Generate Missing Files
let createdCount = 0;

modules.forEach(mod => {
    const filePath = path.join(MODULES_DIR, `${mod.id}.md`);

    if (!fs.existsSync(filePath)) {
        console.log(`Generating missing module: ${mod.id} - ${mod.title}`);

        const content = generateModuleContent(mod);
        fs.writeFileSync(filePath, content);
        createdCount++;
    }
});

console.log(`\nOperation Complete. Created ${createdCount} new module files.`);

// --- Helper: Content Template Generator ---
function generateModuleContent(mod) {
    const isLab = mod.type === 'lab' || mod.type === 'ctf';

    return `# ${mod.title}

## 1. Orientation

### What this module covers
This module covers **${mod.title}**, a critical concept in the **${mod.id.startsWith('b') ? 'Builder (Security Engineering)' : 'Sentinel (Threat Intelligence)'}** path. You will explore the theoretical foundations and practical applications of this topic.

### Learning Objectives
By the end of this module, you will:
*   Understand the core principles of ${mod.title}
*   Analyze real-world scenarios where this concept is applied
*   ${isLab ? 'Perform practical exercises to reinforce learning' : 'Evaluate design trade-offs and strategies'}
*   Connect this concept to the broader security ecosystem

---

## 2. Core Content

### Introduction to ${mod.title}
*Detailed theoretical content will be expanded here.*

**Key Concepts:**
1.  **Concept A:** Definition and importance.
2.  **Concept B:** Implementation details and common pitfalls.
3.  **Concept C:** Security implications.

### Deep Dive
*(Placeholder for technical deep dive)*
*   Architecture diagrams
*   Code examples
*   Configuration snippets

### Industry Relevance
Why does this matter?
*   **For Engineers:** How to build secure systems using this pattern.
*   **For Analysts:** How to detect anomalies related to this.

---

## 3. ${isLab ? 'Guided Lab Exercise' : 'Case Study & Analysis'}

### ${isLab ? 'Lab Scenario' : 'Scenario Analysis'}
**Objective:** Apply your knowledge of ${mod.title} to a realistic problem.

**Setup:**
*   Step 1: Initialize your environment
*   Step 2: Configure the necessary components

**Action:**
*   **Task 1:** Identify the security requirement
*   **Task 2:** Implement the solution or analyze the data
*   **Task 3:** Verify the outcome

---

## 4. Reflection Check

### Knowledge Check
1.  What is the primary security benefit of implementing ${mod.title}?
2.  What are the common failure modes or risks associated with this?
3.  How does this integrate with other security components?

---

## 5. Completion Criteria

This module is complete when you can:
1.  **Define** ${mod.title} and its importance.
2.  **Demonstrate** a working understanding of the core concepts.
3.  **Apply** the principles to a new scenario or system design.

---

## 6. Further Depth (Optional)

*   **Research:** Look up official documentation for related tools.
*   **Practice:** Set up a local test environment to experiment further.
`;
}
