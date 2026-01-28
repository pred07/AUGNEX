import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/test/e2e',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    // Run tests in files in parallel
    fullyParallel: true,
    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,
    // Retry on CI only
    retries: process.env.CI ? 2 : 0,
    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,
    // Reporter to use. See https://playwright.dev/docs/test-reporters
    reporter: 'list',
    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://localhost:5173',

        // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
        trace: 'on-first-retry',

        // Launch options for headed mode debugging
        launchOptions: {
            // slowMo: 50, // slow down operations by 50ms
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
