# Next Steps: Project Completion & Deployment

You have successfully stabilized the platform, implemented the "Expert" content engine, and optimized the deployment configuration. Here is your checklist for the next session.

## 1. Resume Operations
When you return, restart the development server:
```bash
npm run dev
```
Access the app at: `http://localhost:5173`

## 2. Content Upgrade Workflow (The "Batch" System)
We have upgraded **Batch 1 (OSINT)** and **Foundation Modules**. There are 9 Batches remaining to reach 100% Expert Depth.

**Your Workflow:**
1.  **Select a Batch:** Check `AUDIT_AND_PLAN.md` to see which batch is next (e.g., Batch 2: Advanced Engineering).
2.  **Generate JSON:** Ask the AI (or write manually) to create `scripts/batches/batch_2.json` with the content.
    *   *Prompt for AI:* "Create batch_2.json for modules b-10 to b-15 strictly following the JSON format used in batch_1.json. Use Expert/CISSP level depth."
3.  **Run the Upgrade:**
    ```bash
    node scripts/upgrade_content.cjs --batch=2
    ```
4.  **Verify:** Check the module in the app (Library -> Builder -> [Module Name]).

## 3. Deployment to Production
Your `vercel.json` and `vite.config.js` are optimized for security and performance.

**To Deploy:**
1.  **Build locally (Optional test):**
    ```bash
    npm run build
    ```
    (Check `dist/` folder for optimized chunks).
2.  **Deploy to Vercel:**
    ```bash
    npx vercel --prod
    ```

## 4. Key Files created this session
*   `AUDIT_AND_PLAN.md`: The master roadmap of which modules are "Done" vs "Scaffold".
*   `scripts/upgrade_content.cjs`: The master script to inject content.
*   `scripts/batches/`: Directory to store your content batches.
*   `src/data/modules/`: Where the markdown files live.

## 5. Immediate Todo for Next Session
*   [x] All Batches Deployed!
*   [x] Patch Batch 11 (Sentinel Gap s-9 to s-13) Deployed.
*   [x] **GLOBAL CONTENT UPGRADE COMPLETE.** (Stats: 100% Expert across all paths).
*   [ ] User Verification & Platform Launch (In Progress - See `VERIFICATION_LOG.md`).

**System Status:** 🟢 Stable / 🟡 Content (Partial Expert) / 🟢 Deployment Ready
