export class Navbar {
	constructor(page) {
		this.page = page;
		this.logoutBtn = page.getByRole("button", { name: "Logout" });
	}
}
