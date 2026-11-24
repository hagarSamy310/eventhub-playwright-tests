export const data = {
	validCredentials: {
		email: process.env.EVENTHUB_EMAIL,
		password: process.env.EVENTHUB_PASSWORD,
	},

	invalidCredentials: {
		unknownEmail: "nobody@example.com",
		wrongPassword: "wrong-password",
		malformedEmail: "wrong@email",
		shortPassword: "12345",
	},
};
