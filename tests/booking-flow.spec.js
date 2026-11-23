import { test, expect } from "@playwright/test";

// Test data
const EVENT = { title: "World Tech Summit", total: "$1,500" };
const CUSTOMER = {
	name: "Hagar",
	email: "hagar@gmail.com",
	phone: "0123456789",
};

test.describe("Booking flow", () => {
	test.beforeEach("clear My Bookings list", async ({ page }) => {
		await page.goto("/bookings");
		page.once("dialog", (dialog) => dialog.accept());
		await page.getByRole("button", { name: "Clear all bookings" }).click();
		await expect(
			page.getByRole("heading", { name: "No bookings yet" }),
		).toBeVisible();
	});

	test("user can book an event and see it in My Bookings", async ({ page }) => {
		await page.goto("/events");
		await page
			.getByRole("article")
			.filter({ hasText: EVENT.title })
			.getByRole("link", { name: "Book Now" })
			.click();

		// Fill in and submit the booking form
		await page.getByRole("textbox", { name: "Full Name*" }).fill(CUSTOMER.name);
		await page.getByRole("textbox", { name: "Email*" }).fill(CUSTOMER.email);
		await page
			.getByRole("textbox", { name: "Phone Number*" })
			.fill(CUSTOMER.phone);
		await page.getByRole("button", { name: "Confirm Booking" }).click();

		// The confirmation shows what was entered
		await expect(
			page.getByRole("heading", { name: /Booking Confirmed/ }),
		).toBeVisible();
		await expect(page.getByText(`Customer${CUSTOMER.name}`)).toBeVisible();
		await expect(page.getByText("Tickets1")).toBeVisible();
		await expect(page.getByText("Total$")).toHaveText(`Total${EVENT.total}`);

		// Read the generated booking ref
		const ref = (
			await page.getByText(/^[A-Z]-[A-Z0-9]{6}$/).textContent()
		).trim();

		// The saved booking appears in My Bookings with the same ref
		await page.getByRole("button", { name: "View My Bookings" }).click();
		const bookedEvent = page
			.getByTestId("booking-card")
			.filter({ hasText: ref });
		await expect(bookedEvent).toContainText(EVENT.title);
	});
});
