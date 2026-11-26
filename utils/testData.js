export const data = {
	urls: {
		login: "/login",
		home: "/",
		events: "/events",
		eventDetails: /\/events\/\d+$/,
		bookings: "/bookings",
	},
	authFilePath: "playwright/.auth/user.json",

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

	events: [
		{
			title: "Dilli Diwali Mela",
			price: "$300",
		},
		{
			title: "Hollywood Monsoon Night — Los Angeles",
			price: "$2,500",
		},
		{
			title: "World Tech Summit",
			price: "$1,500",
		},
	],

	customers: [
		{
			name: "user1",
			email: "user1@gmail.com",
			phone: "0123456789",
		},
		{
			name: "user2",
			email: "user2@gmail.com",
			phone: "0123987654",
		},
	],
};
