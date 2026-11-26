export class MyBookingsPage {
	constructor(page) {
		this.page = page;
		this.clearAllBtn = page.getByRole("button", { name: "Clear all bookings" });
		this.noBookingsHeading = page.getByRole("heading", {
			name: "No bookings yet",
		});
	}

	async clearAllBookings() {
		await this.clearAllBtn.click();
	}

	bookedEvent(ref) {
		return this.page.getByTestId("booking-card").filter({ hasText: ref });
	}
}
