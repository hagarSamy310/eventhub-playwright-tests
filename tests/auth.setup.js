import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authentication", async ({ page }) => {
	await page.goto("/login");
	await page
		.getByRole("textbox", { name: "Email" })
		.fill(process.env.EVENTHUB_EMAIL);
	await page
		.getByRole("textbox", { name: "Password" })
		.fill(process.env.EVENTHUB_PASSWORD);
	await page.getByRole("button", { name: "Sign In" }).click();
	await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
	await page.context().storageState({ path: authFile });
});
