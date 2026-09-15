/* ─────────────────────────────────────────────────────────────
   TechZone — Cart & Checkout Dedicated Page Controller
   Wireframes 4, 5, 6 Dynamic Handling & PHP Order Processing
   ───────────────────────────────────────────────────────────── */

let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('techzoneCart')) || [];
const SHIPPING_FEE = 1500;

function formatPrice(amount) {
    return 'Rs. ' + Number(amount).toLocaleString('en-US');
}

function updateCartCount() {
    const countSpan = document.getElementById('cartCount');
    if (countSpan) {
        const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
        countSpan.textContent = totalItems;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('techzoneCart', JSON.stringify(cart));
}

// ── Render Wireframe 4: Cart Page Layout ──
function renderCartPage() {
    const listContainer = document.getElementById('cartPageList');
    const subtotalEl = document.getElementById('summarySubtotal');
    const grandTotalEl = document.getElementById('summaryGrandTotal');

    if (!listContainer) return;

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--muted);">
                <div style="font-size: 48px; margin-bottom: 12px;">🛒</div>
                <h3>Your Cart is Currently Empty</h3>
                <p style="margin-bottom: 24px;">Explore our flagship PC hardware components to build your dream PC.</p>
                <a href="products.html" class="primary-btn" style="display: inline-block; text-decoration: none;">Browse Catalog <span>→</span></a>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = 'Rs. 0';
        if (grandTotalEl) grandTotalEl.textContent = 'Rs. 0';
        return;
    }

    let subtotal = 0;
    listContainer.innerHTML = cart.map(item => {
        const itemName = item.name || item.title;
        const itemImg  = item.image || 'images/gpu.png';
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;

        return `
            <div class="cart-table-row">
                <img src="${itemImg}" alt="${itemName}" class="cart-thumb" />
                <div class="cart-item-details">
                    <h4>${itemName}</h4>
                    <span class="price-tag">${formatPrice(item.price)}</span>
                </div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span style="font-weight: 700; font-size: 14px; color: #fff;">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-subtotal">
                    ${formatPrice(lineTotal)}
                </div>
                <div>
                    <button class="remove-item-btn" onclick="removeItem(${item.id})" title="Remove Item">🗑️</button>
                </div>
            </div>
        `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(subtotal + SHIPPING_FEE);
}

// ── Render Wireframe 5: Checkout Order Summary ──
function renderCheckoutSummary() {
    const itemsContainer = document.getElementById('checkoutSummaryItems');
    const subtotalEl = document.getElementById('summarySubtotal');
    const grandTotalEl = document.getElementById('summaryGrandTotal');

    if (!itemsContainer) return;

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    let subtotal = 0;
    itemsContainer.innerHTML = cart.map(item => {
        const itemName = item.name || item.title;
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;

        return `
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--muted); margin-bottom: 8px;">
                <span style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff;">${itemName} × ${item.qty}</span>
                <span>${formatPrice(lineTotal)}</span>
            </div>
        `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(subtotal + SHIPPING_FEE);
}

// ── Cart Modification Handlers ──
function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    updateCartCount();
    renderCartPage();

    // Sync backend
    fetch('api/update_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, delta: delta })
    }).catch(() => {});
}

function removeItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartCount();
    renderCartPage();

    // Sync backend
    fetch('api/remove_from_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
    }).catch(() => {});
}

// ── Wireframe 5: Checkout Order Submission to PHP API ──
function handlePlaceOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to checkout.');
        return;
    }

    const payload = {
        customer_name: document.getElementById('fullName')?.value || 'Valued Customer',
        address: document.getElementById('address')?.value || '',
        city: document.getElementById('city')?.value || '',
        postal_code: document.getElementById('postalCode')?.value || '',
        card_number: document.getElementById('cardNumber')?.value || '',
        items: cart
    };

    // Post order to PHP SQL Backend endpoint api/place_order.php
    fetch('api/place_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        const orderData = data.order || {
            order_number: 'TZ-' + Math.floor(100000 + Math.random() * 900000),
            customer_name: payload.customer_name,
            total_amount: cart.reduce((sum, i) => sum + i.price * i.qty, 0) + SHIPPING_FEE,
            delivery_estimate: '2 - 3 Business Days',
            status: 'Confirmed'
        };

        // Save order for Wireframe 6 Confirmation Page
        localStorage.setItem('techzoneLastOrder', JSON.stringify(orderData));

        // Clear local cart
        cart = [];
        updateCartCount();

        // Redirect to Wireframe 6 Order Confirmation Page
        window.location.href = 'confirmation.html';
    })
    .catch(err => {
        // Fallback for purely static frontend execution
        const orderData = {
            order_number: 'TZ-' + Math.floor(100000 + Math.random() * 900000),
            customer_name: payload.customer_name,
            total_amount: cart.reduce((sum, i) => sum + i.price * i.qty, 0) + SHIPPING_FEE,
            delivery_estimate: '2 - 3 Business Days',
            status: 'Confirmed'
        };
        localStorage.setItem('techzoneLastOrder', JSON.stringify(orderData));
        cart = [];
        updateCartCount();
        window.location.href = 'confirmation.html';
    });
}

// ── Header & Modals Support Engine ──
const SEARCH_PRODUCTS = [
    { id: 1, name: "NVIDIA GeForce RTX 5090 32GB Founders Edition", specs: "32GB GDDR7 · 512-bit · DLSS 4.0", price: 895000 },
    { id: 2, name: "MSI GeForce RTX 5080 16GB Gaming X Trio", specs: "16GB GDDR7 · TRI FROZR 3S", price: 540000 },
    { id: 3, name: "Intel Core Ultra 9 285K Processor", specs: "24 Cores · Up to 5.7GHz", price: 235000 },
    { id: 4, name: "AMD Ryzen 9 9950X Processor", specs: "16 Cores · 32 Threads · 5.7GHz", price: 245000 },
    { id: 5, name: "MSI MEG Z890 GODLIKE Gaming Motherboard", specs: "LGA1851 · Thunderbolt 5", price: 360000 },
    { id: 6, name: "ASUS ROG Maximus Z890 Hero MOBO", specs: "LGA1851 · PCIe 5.0", price: 275000 },
    { id: 7, name: "Corsair Dominator Titanium 64GB (2x32GB) DDR5", specs: "7200MHz · CL34", price: 115000 },
    { id: 8, name: "Samsung 990 PRO 4TB NVMe M.2 SSD", specs: "7450 MB/s Read · PCIe 4.0", price: 145000 }
];

function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (show) {
        modal.classList.add('active');
        if (modalId === 'cartModal') renderCartModal();
        if (modalId === 'searchModal') {
            setTimeout(() => {
                const searchInp = modal.querySelector('input[type="text"]');
                if (searchInp) {
                    searchInp.focus();
                    searchInp.select();
                }
            }, 50);
        }
    } else {
        modal.classList.remove('active');
    }
}

function handleLiveSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    if (!query.trim()) {
        resultsContainer.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">Type to search hardware catalog...</p>`;
        return;
    }

    const q = query.toLowerCase();
    const matched = SEARCH_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q));

    if (matched.length === 0) {
        resultsContainer.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">No hardware components found.</p>`;
        return;
    }

    resultsContainer.innerHTML = matched.map(p => `
        <div class="search-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid var(--line);">
            <div>
                <strong style="color: #fff; font-size: 13px;">${p.name}</strong>
                <div style="font-size: 11px; color: var(--muted);">${p.specs}</div>
            </div>
            <a href="products.html?id=${p.id}" class="primary-btn" style="padding: 6px 12px; font-size: 11px; text-decoration: none;">View</a>
        </div>
    `).join('');
}

function renderCartModal() {
    const list = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">Your cart is empty.</p>`;
        if (totalEl) totalEl.textContent = 'Rs. 0';
        return;
    }

    let total = 0;
    list.innerHTML = cart.map(item => {
        const lineTotal = item.price * item.qty;
        total += lineTotal;
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 13px;">
                <span>${item.name || item.title} (x${item.qty})</span>
                <strong>${formatPrice(lineTotal)}</strong>
            </div>
        `;
    }).join('');

    if (totalEl) totalEl.textContent = formatPrice(total);
}

function showToast(message) {
    alert(message);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartPage();
    renderCheckoutSummary();

    // Mobile nav toggle
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
        });
    }

    // Header modal triggers
    document.getElementById('searchBtn')?.addEventListener('click', () => toggleModal('searchModal', true));
    document.getElementById('cartBtn')?.addEventListener('click', () => toggleModal('cartModal', true));
    document.getElementById('loginBtn')?.addEventListener('click', () => toggleModal('loginModal', true));
});
