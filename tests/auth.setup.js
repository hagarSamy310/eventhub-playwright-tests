import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { Navbar } from "../pages/Navbar.js";
import { data } from "../utilities/testData.js";

const authFile = "playwright/.auth/user.json";

setup("authentication", async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.navigateTo("/login");
	const user = data.validCredentials;
	await loginPage.login(user.email, user.password);
	await expect(new Navbar(page).logoutBtn).toBeVisible();
	await page.context().storageState({ path: authFile });
});
