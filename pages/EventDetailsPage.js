export class EventDetailsPage {
	constructor(page) {
		this.page = page;
		this.fullName = page.getByRole("textbox", { name: "Full Name*" });
		this.email = page.getByRole("textbox", { name: "Email*" });
		this.phoneNumber = page.getByRole("textbox", { name: "Phone Number*" });
		this.confirmBtn = page.getByRole("button", { name: "Confirm Booking" });
		this.confirmationMessage = page.getByRole("heading", {
			name: /Booking Confirmed/,
		});
		this.total = page.getByText("Total$");
		this.viewBookingsBtn = page.getByRole("button", {
			name: "View My Bookings",
		});
	}

	async submitBooking(customer) {
		await this.fullName.fill(customer.name);
		await this.email.fill(customer.email);
		await this.phoneNumber.fill(customer.phone);
		await this.confirmBtn.click();
	}

	customerName(name) {
		return this.page.getByText(`Customer${name}`);
	}

	async getBookingRef() {
		const ref = await this.page.getByText(/^[A-Z]-[A-Z0-9]{6}$/).textContent();
		return ref.trim();
	}

	async goToMyBookings() {
		await this.viewBookingsBtn.click();
	}
}
