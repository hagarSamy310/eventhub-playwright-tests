# EventHub Playwright Tests

End-to-end tests for [EventHub](https://eventhub.rahulshettyacademy.com), a practice event-booking site by Rahul Shetty Academy. Built with Playwright to practice automation structure: Page Object Model, shared authentication, and cross-browser runs.

## What's covered

**Login**

- Valid user can log in and sees the Logout button
- Wrong password shows an error
- Unknown email shows an error
- Empty form shows validation errors for both fields
- Malformed email shows only the email error
- Short password shows only the password error

**Booking flow**

- A logged-in user opens an event, submits the booking form, and sees the confirmation (heading, customer name, total price)
- The booking reference from the confirmation appears on the My Bookings page with the correct event title

## Tech

- [Playwright](https://playwright.dev) (JavaScript, ES modules)
- Page Object Model
- dotenv for credentials and base URL
- Runs on Chromium, Firefox and WebKit

## Project structure

```
components/   Reusable page parts shared across pages (Navbar)
pages/        Page objects: LoginPage, EventsPage, EventDetailsPage, MyBookingsPage
tests/        Specs (login, booking flow) and the auth setup that logs in once
utils/        Test data: URLs, credentials, events, customers
```

## Setup

1. Install dependencies and browsers:
   ```bash
   npm install
   npx playwright install
   ```
2. Create an account on [EventHub](https://eventhub.rahulshettyacademy.com).
3. Copy `.env.example` to `.env` and fill in your values:

   ```
   BASE_URL=https://eventhub.rahulshettyacademy.com
   EVENTHUB_EMAIL=your-email
   EVENTHUB_PASSWORD=your-password
   ```

> [!IMPORTANT]
> If any of these variables is missing, the run stops immediately and names the missing ones.

## Running the tests

| Command                 | What it does                                    |
| ----------------------- | ----------------------------------------------- |
| `npm test`              | Runs all tests on all browsers                  |
| `npm run test:headed`   | Same, with visible browser windows              |
| `npm run test:ui`       | Opens Playwright UI mode                        |
| `npm run test:debug`    | Opens the inspector and steps through tests     |
| `npm run test:chromium` | Runs on Chromium only (faster while developing) |
| `npm run report`        | Opens the HTML report of the last run           |

Run a single file by passing its path after `--`:

```bash
npm test -- tests/login.spec.js
```

## Design decisions

- **Login once, reuse the session.** A setup project logs in and saves the session to `playwright/.auth/user.json`. Every browser project starts from that saved state, so tests don't repeat the login steps. The login spec clears the saved state because it needs to start logged out.
- **Page Objects hold locators and user actions; specs hold assertions.** Page objects describe how to interact with a page (`login()`, `bookEvent()`, `submitBooking()`). The spec decides what the test expects, so a reader can see each test's purpose without opening the page object.
- **Locators.** The site is only partially accessible. Where it provides roles (headings, buttons, links, textboxes), the tests use `getByRole`. The booking details block (reference, customer, total) is plain text, so those locators use `getByText`, and the booking cards in My Bookings use a test id.
- **Fail fast on missing configuration.** `playwright.config.js` checks the required environment variables before anything runs and tells you what to fix, instead of failing later with a confusing "invalid URL" error.
- **One event in the booking flow.** The flow test books a single event. All events share the same screens and form, so repeating the flow for each adds run time without adding much coverage.
- **One worker.** Tests run serially because the booking tests share one account and clear its bookings before each run.
- **Test data in one place.** URLs, events, customers and the auth file path live in `utils/testData.js`.

## Notes

> [!WARNING]
> The booking tests **clear all bookings** on the account before each test. Use a dedicated test account, not one you care about.

- `.env` and the saved session are git-ignored. Never commit them.
- Traces and screenshots are kept on failure. Run `npm run report` to see them.
