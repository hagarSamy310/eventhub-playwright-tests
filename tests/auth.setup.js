import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { Navbar } from "../components/Navbar.js";
import { data } from "../utils/testData.js";

const authFile = data.authFilePath;

setup("authentication", async ({ page }) => {
	const { urls, validCredentials } = data;
	const loginPage = new LoginPage(page);
	await page.goto(urls.login);
	await loginPage.login(validCredentials.email, validCredentials.password);
	await expect(new Navbar(page).logoutBtn).toBeVisible();
	await page.context().storageState({ path: authFile });
});
