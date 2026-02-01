# Project Paths and Modules Documentation

This document provides an overview of the application's routing structure (Paths) and the data modules used within the application.

## 1. Application Routes (Paths)

The specific paths defined in the application (`src/App.jsx`) are as follows:

| Path | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/login` | `Login` | Public | User authentication page. |
| `/` | `Dashboard` | Protected | Main dashboard for authenticated users. |
| `/paths` | `LearningPaths` | Protected | Displays available learning paths. |
| `/modules` | `ModulesLibrary` | Protected | Library of all available learning modules. |
| `/modules/:moduleId` | `ModuleDetail` | Protected | Detailed view of a specific module. |
| `/profile` | `Profile` | Protected | User profile management. |
| `/service-record` | `ServiceRecord` | Protected | User's service record/history. |
| `/u/:publicId` | `PublicProfile` | Public | Publicly accessible profile view. |
| `/admin` | `AdminDashboard` | Protected | Dashboard for administrators. |
| `/subscription` | `Pricing` | Protected | Subscription and pricing page. |
| `*` | `Navigate to /` | Public | Fallback route redirecting to the dashboard. |

*Note: Protected routes require the user to be logged in.*

## 2. Learning Modules

The application's content is structured around "Learning Modules" stored as Markdown files in `src/data/modules`. These modules cover various topics and seem to be categorized by prefixes (e.g., `arc`, `c`, `d`, `e`, `f`).

### Module Categories (Inferred by Prefix)

Based on the file naming convention in `src/data/modules`:
*   **`f-`**: **FORGE** - Foundation / Preparation (32 modules)
*   **`b-`**: **BUILDER** - Security Engineering (40 modules)
*   **`e-`**: **ATTACK MODE** - Offensive Security (65 modules)
*   **`s-`**: **SENTINEL** - Threat Intelligence (40 modules)
*   **`d-`**: **DEFENSE MODE** - Defensive Security (49 modules)
*   **`c-`**: **CONVERGENCE** - Purple Team / Engineer (42 modules)
*   **`arc-`**: **ARCHITECT** - Advanced / System Design (42 modules)

### Module Structure
Each module (Markdown file) typically contains:
1.  **Orientation**: Covers content summary, fit in the learning path, and learning objectives.
2.  **Core Content**: The main educational material.
3.  **Guided Practice**: Case studies or technical labs.
4.  **Reflection Check**: Questions to verify understanding.
5.  **Completion Criteria**: Checklist for finishing the module.

### File Inventory
(Listing the expanded curriculum structure)
*   `f-1.md` to `f-32.md` (Forge)
*   `b-1.md` to `b-40.md` (Builder - NEW)
*   `e-1.md` to `e-65.md` (Attack Mode)
*   `s-1.md` to `s-40.md` (Sentinel - NEW)
*   `d-1.md` to `d-49.md` (Defense Mode)
*   `c-1.md` to `c-42.md` (Convergence)
*   `arc-1.md` to `arc-42.md` (Architect)

## 3. Findings & Observations

### Current App Health
*   **Linting**: The application currently has **11 errors and 45 warnings** reported by ESLint. These should be addressed to ensure code quality and prevent build issues.
*   **Browser Environment**: Automatic browser testing is currently unavailable in this environment, but the development server starts successfully at `http://localhost:5173/`.
