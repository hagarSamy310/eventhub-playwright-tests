// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { data } from "./utils/testData.js";
import dotenv from "dotenv";

dotenv.config();
// Fail early with a clear message if required env variables are missing
const required = ["BASE_URL", "EVENTHUB_EMAIL", "EVENTHUB_PASSWORD"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
	throw new Error(
		`Missing environment variables: ${missing.join(", ")}. Copy .env.example to .env and fill in the values.`,
	);
}

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: "html",
	use: {
		baseURL: process.env.BASE_URL,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},

	projects: [
		{ name: "setup", testMatch: /.*\.setup\.js/ },
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				storageState: data.authFilePath,
			},
			dependencies: ["setup"],
		},

		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				storageState: data.authFilePath,
			},
			dependencies: ["setup"],
		},

		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
				storageState: data.authFilePath,
			},
			dependencies: ["setup"],
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://localhost:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
