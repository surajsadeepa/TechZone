# TechZone — Week 05 & Week 06 Practical Checklist

## Week 05 — Shopping Cart
- Add to Cart captures ProductID, title, price and image.
- Existing products increase quantity instead of creating duplicates.
- Cart badge updates dynamically.
- Cart page supports remove, + and - quantity controls.
- Quantity reaching 0 removes the item.
- Subtotal and total are recalculated live.
- Guest cart persists with `localStorage`.
- Authenticated carts are loaded from the database.

## Week 06 — Authentication & Profile
- Registration validates email, password complexity and confirmation.
- Passwords are stored using PHP `password_hash(..., PASSWORD_BCRYPT)`.
- Login uses a server-side PHP session with an HTTP-only session cookie.
- Login failure uses a generic message.
- `/profile` and `/checkout` use a server-authentication guard.
- Logout destroys the server session and clears local display state.
- Navbar changes to user name/avatar/profile/logout after authentication.
- Profile supports full name, phone, shipping address and billing address.
- Profile displays account status/role and registration date.
- Guest cart items are merged after login.
- Password change re-verifies the current password before hashing the new password.

## Main API endpoints
- POST `/api/register.php`
- POST `/api/login.php`
- GET `/api/me.php`
- POST `/api/logout.php`
- GET/POST `/api/profile.php`
- POST `/api/change_password.php`
- POST `/api/add_to_cart.php`
- POST `/api/update_cart.php`
- POST `/api/remove_from_cart.php`
- GET `/api/get_cart.php`
- POST `/api/merge_cart.php`
- POST `/api/place_order.php`

## Run
1. Start Apache and MySQL in XAMPP.
2. Import `database/setup.sql` into phpMyAdmin.
3. Put the TechZone folder inside `htdocs`.
4. Open `http://localhost/TechZone/index.html`.
