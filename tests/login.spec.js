import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => await page.goto("/login"));

test("valid user can log in", async ({ page }) => {
	await page
		.getByRole("textbox", { name: "Email" })
		.fill(process.env.EVENTHUB_EMAIL);
	await page
		.getByRole("textbox", { name: "Password" })
		.fill(process.env.EVENTHUB_PASSWORD);
	await page.getByRole("button", { name: "Sign In" }).click();
	await expect(page).toHaveURL("/");
	await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test.describe("invalid login attempts", () => {
	test("wrong password shows an error", async ({ page }) => {
		await page
			.getByRole("textbox", { name: "Email" })
			.fill(process.env.EVENTHUB_EMAIL);
		await page
			.getByRole("textbox", { name: "Password" })
			.fill("wrong-password");
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page).toHaveURL("/login");
		await expect(page.getByText("Invalid email or password")).toBeVisible();
	});

	test("wrong email shows an error", async ({ page }) => {
		await page
			.getByRole("textbox", { name: "Email" })
			.fill("nobody@example.com");
		await page
			.getByRole("textbox", { name: "Password" })
			.fill(process.env.EVENTHUB_PASSWORD);
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page).toHaveURL("/login");
		await expect(page.getByText("Invalid email or password")).toBeVisible();
	});
});

test.describe("form validation", () => {
	test("empty fields show validation errors", async ({ page }) => {
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page).toHaveURL("/login");
		await expect(page.getByText("Enter a valid email")).toBeVisible();
		await expect(page.getByText("Password must be at least 6")).toBeVisible();
	});

	test("invalid email format shows an error", async ({ page }) => {
		await page.getByRole("textbox", { name: "Email" }).fill("wrong@email");
		await page
			.getByRole("textbox", { name: "Password" })
			.fill(process.env.EVENTHUB_PASSWORD);
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Enter a valid email")).toBeVisible();
		await expect(page.getByText("Password must be at least 6")).toBeHidden();
	});

	test("short password shows an error", async ({ page }) => {
		await page
			.getByRole("textbox", { name: "Email" })
			.fill(process.env.EVENTHUB_EMAIL);
		await page.getByRole("textbox", { name: "Password" }).fill("12345");
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Password must be at least 6")).toBeVisible();
		await expect(page.getByText("Enter a valid email")).toBeHidden();
	});
});