/* ─────────────────────────────────────────────────────────────
   TechZone — User Authentication, Registration & State Engine
   Practical Milestone 3: Route Protection & Secure Logout
   ───────────────────────────────────────────────────────────── */

// ── Protected Routes Array ──
const PROTECTED_ROUTES = ['checkout.html', 'profile.html', 'account.html'];

// ── Email & Password Regex Validation Helpers ──
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password || '');
}

function showAuthAlert(alertId, message, type = 'error') {
    const el = document.getElementById(alertId);
    if (!el) return;
    el.style.display = 'block';
    el.className = `auth-alert ${type}`;
    el.textContent = message;
}

function clearAuthAlert(alertId) {
    const el = document.getElementById(alertId);
    if (el) {
        el.style.display = 'none';
        el.textContent = '';
    }
}

// ── Milestone 3: Active Route Protection Guard ──
async function protectRoute() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1).toLowerCase();

    if (!PROTECTED_ROUTES.includes(currentFile)) {
        return; // Page is public
    }

    let isAuthenticated = false;

    try {
        const response = await fetch('api/me.php');
        if (response.ok) {
            const data = await response.json();
            if (data.authenticated && data.user) {
                isAuthenticated = true;
                localStorage.setItem('techzoneUser', JSON.stringify(data.user));
            }
        }
    } catch (e) {
        // Fallback check
    }

    if (!isAuthenticated) {
        const returnUrl = encodeURIComponent(currentFile);
        window.location.href = `login.html?returnUrl=${returnUrl}`;
    }
}

// ── Wireframe 8: Registration Submission Handler ──
async function handleRegisterSubmit(event) {
    event.preventDefault();
    clearAuthAlert('registerAlert');

    const fullName        = document.getElementById('regFullName')?.value.trim() || '';
    const email           = document.getElementById('regEmail')?.value.trim() || '';
    const password        = document.getElementById('regPassword')?.value || '';
    const confirmPassword = document.getElementById('regConfirmPassword')?.value || '';

    if (!fullName) {
        showAuthAlert('registerAlert', 'Please enter your full name.');
        return;
    }

    if (!isValidEmail(email)) {
        showAuthAlert('registerAlert', 'Please enter a valid email address (e.g. user@domain.com).');
        return;
    }

    if (!isValidPassword(password)) {
        showAuthAlert('registerAlert', 'Password needs 8+ characters with uppercase, lowercase, number, and special character.');
        return;
    }

    if (password !== confirmPassword) {
        showAuthAlert('registerAlert', 'Passwords do not match. Please re-enter your confirm password.');
        return;
    }

    const submitBtn = document.getElementById('regSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
    }

    try {
        const response = await fetch('api/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                password: password,
                confirm_password: confirmPassword
            })
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            showAuthAlert('registerAlert', data.message || 'Account created successfully! Redirecting to login...', 'success');
            setTimeout(() => {
                const params = new URLSearchParams(window.location.search);
                const returnUrl = params.get('returnUrl');
                const redirectTarget = returnUrl ? `login.html?registered=true&returnUrl=${encodeURIComponent(returnUrl)}` : 'login.html?registered=true';
                window.location.href = redirectTarget;
            }, 1200);
        } else {
            showAuthAlert('registerAlert', data.message || 'Registration failed.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Account';
            }
        }
    } catch (err) {
        showAuthAlert('registerAlert', 'Connection error. Unable to reach registration server.');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    }
}

// ── Milestone 3: Login Submission Handler with Strict MySQL Database Verification ──
async function handleLoginSubmit(event) {
    event.preventDefault();
    clearAuthAlert('loginAlert');

    const email    = document.getElementById('loginEmail')?.value.trim() || '';
    const password = document.getElementById('loginPassword')?.value || '';

    if (!email || !password) {
        showAuthAlert('loginAlert', 'Please enter both your email address and password.');
        return;
    }

    if (!isValidEmail(email)) {
        showAuthAlert('loginAlert', 'Please enter a valid email address.');
        return;
    }

    if (!isValidPassword(password)) {
        showAuthAlert('loginAlert', 'Password needs 8+ characters with uppercase, lowercase, number, and special character.');
        return;
    }

    const submitBtn = document.getElementById('loginSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging In...';
    }

    const params = new URLSearchParams(window.location.search);
    const returnUrl = params.get('returnUrl');
    const targetDestination = returnUrl ? decodeURIComponent(returnUrl) : 'index.html';

    try {
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            localStorage.setItem('techzoneUser', JSON.stringify(data.user));

            // Milestone 4: Cart Association - Merge guest shopping items upon user authentication
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            if (localCart.length > 0) {
                try {
                    const mergeRes = await fetch('api/merge_cart.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ guest_cart: localCart })
                    });
                    const mergeData = await mergeRes.json();
                    if (mergeData.mergedCount > 0) {
                        showAuthAlert('loginAlert', `Logged in! ${mergeData.mergedCount} guest cart items merged into your account.`, 'success');
                    } else {
                        showAuthAlert('loginAlert', 'Logged in successfully! Redirecting...', 'success');
                    }
                } catch (e) {
                    showAuthAlert('loginAlert', 'Logged in successfully! Redirecting...', 'success');
                }
            } else {
                showAuthAlert('loginAlert', 'Logged in successfully! Redirecting...', 'success');
            }

            setTimeout(() => {
                window.location.href = targetDestination;
            }, 1000);
        } else {
            // Security Imperative: Generic Error Message
            showAuthAlert('loginAlert', data.message || 'Invalid email or password.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Log In';
            }
        }
    } catch (err) {
        showAuthAlert('loginAlert', 'Connection error. Unable to reach authentication server.');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
        }
    }
}

// ── Milestone 2 & 3: Practical User Navbar & Auth Sync ──
async function syncHeaderAuth() {
    let user = null;
    try {
        const response = await fetch('api/me.php', { cache: 'no-store' });
        const data = await response.json();
        if (response.ok && data.authenticated && data.user) {
            user = data.user;
            localStorage.setItem('techzoneUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('techzoneUser');
        }
    } catch (e) {
        // Keep the public Login button if the authentication server cannot be reached.
        localStorage.removeItem('techzoneUser');
    }

    const loginBtns = document.querySelectorAll('.login-btn, #loginBtn');
    if (user && user.name) {
        const firstName = user.name.split(' ')[0];
        const avatarSrc = user.avatar || 'images/avatar.svg';
        loginBtns.forEach(btn => {
            const parent = btn.parentNode;
            if (!parent) return;
            const widget = document.createElement('div');
            widget.className = 'user-nav-widget';
            widget.innerHTML = `
                <img src="${avatarSrc}" class="user-avatar-img" alt="User avatar" />
                <span class="user-nav-name">${firstName}</span>
                <span style="font-size:9px;color:var(--muted);margin-left:2px;">▼</span>
                <div class="user-profile-menu">
                    <a href="profile.html">My Profile</a>
                    <a href="cart.html">My Cart</a>
                    <button type="button" class="logout-item" onclick="handleLogoutClick(event)">Logout</button>
                </div>`;
            widget.addEventListener('click', e => {
                e.stopPropagation();
                widget.querySelector('.user-profile-menu')?.classList.toggle('active');
            });
            btn.replaceWith(widget);
        });
        document.addEventListener('click', () => document.querySelectorAll('.user-profile-menu').forEach(m => m.classList.remove('active')), { once: true });
    } else {
        loginBtns.forEach(btn => {
            btn.textContent = 'Login';
            btn.onclick = () => window.location.href = 'login.html';
        });
    }

    // Keep the navbar cart badge in sync with the authenticated cart.
    try {
        const cartResponse = await fetch('api/get_cart.php', { cache: 'no-store' });
        const cartData = await cartResponse.json();
        const count = document.getElementById('cartCount');
        if (count && cartData.status === 'success') count.textContent = cartData.cartCount ?? 0;
    } catch (e) {}
}

// ── Milestone 3: Secure Logout Sequence Redirecting to Public Homepage ──
async function handleLogoutClick(event) {
    if (event) event.stopPropagation();

    try {
        await fetch('api/logout.php', { method: 'POST' });
    } catch (e) {}

    // Clear local authentication state
    localStorage.removeItem('techzoneUser');

    // Redirect session to public homepage
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    protectRoute();
    syncHeaderAuth();

    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') === 'true') {
        showAuthAlert('loginAlert', 'Account created successfully! Please sign in with your email and password.', 'success');
    } else if (params.get('returnUrl')) {
        const dest = params.get('returnUrl');
        showAuthAlert('loginAlert', `Please sign in to access your ${dest.replace('.html', '')}.`, 'error');
    }
});
