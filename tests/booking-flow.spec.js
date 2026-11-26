import { test, expect } from "@playwright/test";
import { data } from "../utils/testData.js";
import { MyBookingsPage } from "../pages/MyBookingsPage.js";
import { EventsPage } from "../pages/EventsPage.js";
import { EventDetailsPage } from "../pages/EventDetailsPage.js";

const { urls, events, customers } = data;
let myBookingsPage;

test.describe("Booking flow", () => {
	test.beforeEach("clear My Bookings list", async ({ page }) => {
		myBookingsPage = new MyBookingsPage(page);
		await page.goto(urls.bookings);

		page.once("dialog", (dialog) => dialog.accept());

		await myBookingsPage.clearAllBookings();
		await expect(myBookingsPage.noBookingsHeading).toBeVisible();
	});

	test("user can book an event and see it in My Bookings", async ({ page }) => {
		const eventsPage = new EventsPage(page);
		const eventDetailsPage = new EventDetailsPage(page);

		await page.goto(urls.events);
		await eventsPage.bookEvent(events[1].title);
		await expect(page).toHaveURL(urls.eventDetails);

		// Fill in and submit the booking form
		await eventDetailsPage.submitBooking(customers[0]);
		// The confirmation shows what was entered
		await expect(eventDetailsPage.confirmationMessage).toBeVisible();
		await expect(
			eventDetailsPage.customerName(customers[0].name),
		).toBeVisible();
		await expect(eventDetailsPage.total).toHaveText(`Total${events[1].price}`);

		// The saved booking appears in My Bookings with the same ref
		const ref = await eventDetailsPage.getBookingRef();
		await eventDetailsPage.goToMyBookings();

		await expect(myBookingsPage.bookedEvent(ref)).toContainText(
			events[1].title,
		);
	});
});
