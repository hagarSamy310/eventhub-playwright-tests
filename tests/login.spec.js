import { test, expect } from "@playwright/test";
import { data } from "../utilities/testData.js";
import { LoginPage } from "../pages/LoginPage.js";
import { Navbar } from "../pages/Navbar.js";

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage;
const { validCredentials, invalidCredentials } = data;

test.beforeEach(async ({ page }) => {
	loginPage = new LoginPage(page);
	await loginPage.navigateTo("/login");
});

test("valid user can log in", async ({ page }) => {
	await loginPage.login(validCredentials.email, validCredentials.password);
	await expect(page).toHaveURL("/");
	const nav = new Navbar(page);
	await expect(nav.logoutBtn).toBeVisible();
});

test.describe("invalid login attempts", () => {
	test("wrong password shows an error", async ({ page }) => {
		await loginPage.login(
			validCredentials.email,
			invalidCredentials.wrongPassword,
		);
		await expect(page).toHaveURL("/login");
		await expect(loginPage.invalidCredentialsMessage).toBeVisible();
	});

	test("wrong email shows an error", async ({ page }) => {
		await loginPage.login(
			invalidCredentials.unknownEmail,
			validCredentials.password,
		);
		await expect(page).toHaveURL("/login");
		await expect(loginPage.invalidCredentialsMessage).toBeVisible();
	});
});

test.describe("form validation", () => {
	test("empty fields show validation errors", async ({ page }) => {
		await loginPage.loginBtn.click();
		await expect(page).toHaveURL("/login");
		await expect(loginPage.invalidEmailMessage).toBeVisible();
		await expect(loginPage.invalidPasswordMessage).toBeVisible();
	});

	test("invalid email format shows an error", async () => {
		await loginPage.login(
			invalidCredentials.malformedEmail,
			validCredentials.password,
		);
		await expect(loginPage.invalidEmailMessage).toBeVisible();
		await expect(loginPage.invalidPasswordMessage).toBeHidden();
	});

	test("short password shows an error", async () => {
		await loginPage.login(
			validCredentials.email,
			invalidCredentials.shortPassword,
		);
		await expect(loginPage.invalidEmailMessage).toBeHidden();
		await expect(loginPage.invalidPasswordMessage).toBeVisible();
	});
});
