export class LoginPage {
	constructor(page) {
		this.page = page;
		this.emailInput = page.getByRole("textbox", { name: "Email" });
		this.passwordInput = page.getByRole("textbox", { name: "Password" });
		this.loginBtn = page.getByRole("button", { name: "Sign In" });
		this.invalidCredentialsMessage = page.getByText(
			"Invalid email or password",
		);
		this.invalidEmailMessage = page.getByText("Enter a valid email");
		this.invalidPasswordMessage = page.getByText("Password must be at least 6");
	}

	async login(email, password) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginBtn.click();
	}
}
