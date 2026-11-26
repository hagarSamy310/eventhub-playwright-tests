export class EventsPage {
	constructor(page) {
		this.page = page;
	}

	async bookEvent(eventTitle) {
		await this.page
			.getByRole("article")
			.filter({ hasText: eventTitle })
			.getByRole("link", { name: "Book Now" })
			.click();
	}
}
