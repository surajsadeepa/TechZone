# TechZone — Week 07 Payment Gateway Checklist

Based on ICT2142 E-Business Systems Practical 06 / Week 07.

## Implemented
- Checkout form collects customer name, email, phone, address, city, postal code and country.
- Order summary displays cart items, subtotal, shipping and total in LKR.
- PayHere Sandbox Checkout API form submission.
- Server-side MD5 hash generation using Merchant ID, Order ID, amount, currency and Merchant Secret.
- Return URL and cancel URL handling.
- Payment notification endpoint with md5sig verification.
- Payment status stored in the `orders` table.
- Card number/CVV are not collected by TechZone; PayHere handles them.

## Before testing
1. Create a PayHere Sandbox account.
2. Add `localhost` as a Domain in the PayHere Sandbox Integrations section.
3. Copy the Sandbox Merchant ID and Merchant Secret.
4. Put them in `config/payhere.php`.
5. Import `database/payment_gateway_migration.sql` if you already created the Week 05/06 database.
6. Run the site through XAMPP, not `file:///...`.

## Sandbox test cards from the practical sheet
- VISA approved: 4916 2175 0161 1292
- MASTERCARD approved: 5307 7321 2553 1191
- Expiry: any future date
- CVV: any 3 digits

## Important localhost limitation
PayHere's `notify_url` must be publicly reachable for the server-to-server payment notification. A plain `http://localhost/...` URL is not publicly reachable from PayHere's servers. The browser return/cancel flow can still be tested locally. For full notification verification during a local demo, use a public HTTPS tunnel and put its URL in `PAYHERE_NOTIFY_URL`.
