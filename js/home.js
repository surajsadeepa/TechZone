/* ─────────────────────────────────────────────────────────────
   TechZone — Home Page Dedicated JavaScript Engine
   Product catalog, interactive cart management & store logic
   ───────────────────────────────────────────────────────────── */

// ── Expanded Hardware Catalog with Brand-Accurate Photos ──
const PRODUCTS = [
    {
        id: 1,
        name: "NVIDIA GeForce RTX 5090 32GB Founders Edition",
        category: "GPU",
        tag: "FLAGSHIP RTX 50",
        price: 895000,
        rating: 5.0,
        reviews: 94,
        specs: "32GB GDDR7 · 512-bit · DLSS 4.0 · Blackwell Architecture",
        iconType: "gpu",
        image: "images/hero_rtx5090.png",
        color: "#06b6d4"
    },
    {
        id: 2,
        name: "MSI GeForce RTX 5080 16GB Gaming X Trio",
        category: "GPU",
        tag: "NEXT-GEN GPU",
        price: 540000,
        rating: 4.9,
        reviews: 62,
        specs: "16GB GDDR7 · TRI FROZR 3S · ARGB Backplate",
        iconType: "gpu",
        image: "images/gpu.png",
        color: "#06b6d4"
    },
    {
        id: 3,
        name: "Intel Core Ultra 9 285K Processor",
        category: "CPU",
        tag: "ARROW LAKE",
        price: 235000,
        rating: 4.9,
        reviews: 38,
        specs: "24 Cores (8P+16E) · 24 Threads · Up to 5.7GHz",
        iconType: "cpu",
        image: "images/cpu.png",
        color: "#7c3aed"
    },
    {
        id: 4,
        name: "AMD Ryzen 9 9950X Processor",
        category: "CPU",
        tag: "ZEN 5 KING",
        price: 245000,
        rating: 5.0,
        reviews: 51,
        specs: "16 Cores · 32 Threads · 5.7GHz Boost · 80MB Cache",
        iconType: "cpu",
        image: "images/cpu.png",
        color: "#7c3aed"
    },
    {
        id: 5,
        name: "MSI MEG Z890 GODLIKE Gaming Motherboard",
        category: "Motherboard",
        tag: "MSI FLAGSHIP",
        price: 360000,
        rating: 5.0,
        reviews: 19,
        specs: "LGA1851 · M-Vision Dashboard · Thunderbolt 5 · WiFi 7",
        iconType: "mobo",
        image: "images/mobo.png",
        color: "#7c3aed"
    },
    {
        id: 6,
        name: "ASUS ROG Maximus Z890 Hero MOBO",
        category: "Motherboard",
        tag: "ROG STRIX",
        price: 275000,
        rating: 4.9,
        reviews: 27,
        specs: "LGA1851 · PCIe 5.0 · 22+1+2 Power Stages · WiFi 7",
        iconType: "mobo",
        image: "images/mobo.png",
        color: "#7c3aed"
    },
    {
        id: 7,
        name: "Corsair Dominator Titanium 64GB (2x32GB) DDR5",
        category: "RAM",
        tag: "7200MHz RAM",
        price: 115000,
        rating: 4.9,
        reviews: 44,
        specs: "7200MHz · CL34 · DHX Cooling · Intel XMP 3.0",
        iconType: "ram",
        image: "images/ram.png",
        color: "#a78bfa"
    },
    {
        id: 8,
        name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD",
        category: "Storage",
        tag: "GEN4 SPEED",
        price: 68000,
        rating: 4.9,
        reviews: 78,
        specs: "7450 MB/s Read · Custom Heatsink · Pascal Controller",
        iconType: "ssd",
        image: "images/ssd.png",
        color: "#06b6d4"
    },
    {
        id: 9,
        name: "Samsung 990 EVO 4TB PCIe 5.0 NVMe SSD",
        category: "Storage",
        tag: "4TB NVME",
        price: 135000,
        rating: 4.8,
        reviews: 32,
        specs: "5000 MB/s Read · Hybrid PCIe 4.0/5.0 x2",
        iconType: "ssd",
        image: "images/ssd.png",
        color: "#06b6d4"
    },
    {
        id: 10,
        name: "NZXT Kraken Elite 360 RGB LCD Liquid Cooler",
        category: "Cooling",
        tag: "NZXT AIO",
        price: 105000,
        rating: 4.9,
        reviews: 56,
        specs: "2.36\" Wide-Angle LCD · Asetek Gen7 Pump · F120 RGB Core Fans",
        iconType: "cooler",
        image: "images/cooler.png",
        color: "#06b6d4"
    },
    {
        id: 11,
        name: "MSI RTX 4070 Ti Super 16GB Gaming X",
        category: "GPU",
        tag: "BESTSELLER",
        price: 345000,
        rating: 4.8,
        reviews: 38,
        specs: "16GB GDDR6X · DLSS 3.5 · TRI FROZR 3",
        iconType: "gpu",
        image: "images/gpu.png",
        color: "#06b6d4"
    },
    {
        id: 12,
        name: "ASUS ROG Thor 1200W Platinum II PSU",
        category: "Power",
        tag: "OLED POWER",
        price: 145000,
        rating: 4.9,
        reviews: 21,
        specs: "1200W · 80+ Platinum · Live OLED Display · PCIe 5.0 Cable",
        iconType: "psu",
        image: "images/psu.png",
        color: "#f59e0b"
    },
    {
        id: 13,
        name: "Razer DeathAdder V3 Pro Wireless Mouse",
        category: "Peripherals",
        tag: "RAZER GEAR",
        price: 49500,
        rating: 4.9,
        reviews: 89,
        specs: "Focus Pro 30K Sensor · 63g Lightweight · 90h Battery",
        iconType: "mouse",
        image: "images/mouse.png",
        color: "#a78bfa"
    },
    {
        id: 14,
        name: "Intel Core i9-14900K Processor",
        category: "CPU",
        tag: "6.0GHz CPU",
        price: 198500,
        rating: 4.9,
        reviews: 42,
        specs: "24 Cores · 32 Threads · Thermal Velocity Boost 6.0GHz",
        iconType: "cpu",
        image: "images/cpu.png",
        color: "#7c3aed"
    },
    {
        id: 15,
        name: "AMD Ryzen 7 7800X3D Processor",
        category: "CPU",
        tag: "3D V-CACHE",
        price: 168000,
        rating: 5.0,
        reviews: 112,
        specs: "8 Cores · 16 Threads · 96MB L3 V-Cache King",
        iconType: "cpu",
        image: "images/amd_cpu.png",
        color: "#7c3aed"
    },
    {
        id: 16,
        name: "ASUS ROG Swift OLED PG32UCDM 32\" 4K 240Hz Monitor",
        category: "Monitors",
        tag: "4K 240Hz OLED",
        price: 420000,
        rating: 5.0,
        reviews: 67,
        specs: "32\" QD-OLED · 0.03ms Response · Dolby Vision · G-SYNC",
        iconType: "monitor",
        image: "images/monitor.png",
        color: "#06b6d4"
    },
    {
        id: 17,
        name: "Alienware 34\" QD-OLED Curved Ultrawide Gaming Monitor",
        category: "Monitors",
        tag: "CURVED OLED",
        price: 385000,
        rating: 4.9,
        reviews: 83,
        specs: "34\" WQHD (3440x1440) · 175Hz · Quantum Dot OLED",
        iconType: "monitor",
        image: "images/monitor.png",
        color: "#06b6d4"
    },
    {
        id: 18,
        name: "Lian Li O11 Vision Chrome Dual-Chamber PC Case",
        category: "Cases",
        tag: "PANORAMIC GLASS",
        price: 43000,
        rating: 5.0,
        reviews: 49,
        specs: "3-Sided Column-Free Glass · Mirror Coating · E-ATX Support",
        iconType: "case",
        image: "images/case.png",
        color: "#a78bfa"
    },
    {
        id: 19,
        name: "NZXT H9 Elite Panoramic Glass Gaming PC Case",
        category: "Cases",
        tag: "NZXT ELITE",
        price: 68000,
        rating: 4.9,
        reviews: 58,
        specs: "Dual-Chamber Mid-Tower · Glass Top & Front · RGB Fan Controller",
        iconType: "case",
        image: "images/case.png",
        color: "#a78bfa"
    },
    {
        id: 20,
        name: "Wooting 60HE+ Rapid Trigger Analog Magnetic Keyboard",
        category: "Peripherals",
        tag: "RAPID TRIGGER",
        price: 68000,
        rating: 5.0,
        reviews: 124,
        specs: "Lekker Hall Effect Switches · 0.1mm Adjustable Actuation",
        iconType: "keyboard",
        image: "images/keyboard.png",
        color: "#06b6d4"
    },
    {
        id: 21,
        name: "Logitech G PRO X SUPERLIGHT 2 Wireless Mouse",
        category: "Peripherals",
        tag: "60G LIGHTWEIGHT",
        price: 54000,
        rating: 4.9,
        reviews: 95,
        specs: "HERO 2 Sensor · LIGHTFORCE Hybrid Switches · 95h Battery",
        iconType: "mouse",
        image: "images/razer_mouse.png",
        color: "#06b6d4"
    }
];

// ── State Management ──
let cart = JSON.parse(localStorage.getItem('techzoneCart')) || [];
let activeCategory = 'ALL';

// ── Model-Specific Brand Photo Resolver ──
function getProductVisualHTML(item) {
    switch (item.id) {
        case 1: // NVIDIA RTX 5090
            return `
                <div class="model-visual-card">
                    <img src="images/hero_rtx5090.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge">RTX 5090 32GB</div>
                </div>
            `;
        case 2: // MSI RTX 5080
            return `
                <div class="model-visual-card">
                    <img src="images/msi_gpu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge msi-badge">MSI TRI FROZR 3S</div>
                </div>
            `;
        case 3: // Intel Core Ultra 9 285K
            return `
                <div class="model-visual-card">
                    <img src="images/intel_cpu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge intel-badge">INTEL ULTRA 9 285K</div>
                </div>
            `;
        case 4: // AMD Ryzen 9 9950X
            return `
                <div class="model-visual-card">
                    <img src="images/amd_cpu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge amd-badge">AMD RYZEN 9 9950X</div>
                </div>
            `;
        case 5: // MSI MEG Z890 GODLIKE
            return `
                <div class="model-visual-card">
                    <img src="images/mobo.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge msi-badge">MSI Z890 GODLIKE</div>
                </div>
            `;
        case 6: // ASUS ROG Z890 Hero
            return `
                <div class="model-visual-card">
                    <img src="images/mobo.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge rog-badge">ASUS ROG Z890 HERO</div>
                </div>
            `;
        case 7: // Corsair Dominator Titanium DDR5
            return `
                <div class="model-visual-card">
                    <img src="images/corsair_ram.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge corsair-badge">CORSAIR 7200MHz</div>
                </div>
            `;
        case 8: // Samsung 990 PRO 2TB
            return `
                <div class="model-visual-card">
                    <img src="images/samsung_ssd.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge samsung-badge">SAMSUNG 990 PRO</div>
                </div>
            `;
        case 9: // Samsung 990 EVO 4TB
            return `
                <div class="model-visual-card">
                    <img src="images/samsung_ssd.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge samsung-badge">SAMSUNG 990 EVO 4TB</div>
                </div>
            `;
        case 10: // NZXT Kraken Elite 360
            return `
                <div class="model-visual-card">
                    <img src="images/nzxt_cooler.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge nzxt-badge">NZXT KRAKEN 360</div>
                </div>
            `;
        case 11: // MSI RTX 4070 Ti Super
            return `
                <div class="model-visual-card">
                    <img src="images/msi_gpu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge msi-badge">MSI RTX 4070 Ti SUPER</div>
                </div>
            `;
        case 12: // ASUS ROG Thor 1200W
            return `
                <div class="model-visual-card">
                    <img src="images/psu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge rog-badge">ASUS ROG THOR 1200W</div>
                </div>
            `;
        case 13: // Razer DeathAdder V3 Pro
            return `
                <div class="model-visual-card">
                    <img src="images/razer_mouse.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge razer-badge">RAZER 30K DPI</div>
                </div>
            `;
        case 14: // Intel Core i9-14900K
            return `
                <div class="model-visual-card">
                    <img src="images/intel_cpu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge intel-badge">INTEL i9-14900K</div>
                </div>
            `;
        case 15: // AMD Ryzen 7 7800X3D
            return `
                <div class="model-visual-card">
                    <img src="images/amd_cpu.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge amd-badge">AMD RYZEN 7800X3D</div>
                </div>
            `;
        case 16: // ASUS ROG Swift OLED Monitor
            return `
                <div class="model-visual-card">
                    <img src="images/monitor.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge rog-badge">ROG 4K 240Hz OLED</div>
                </div>
            `;
        case 17: // Alienware 34" QD-OLED Monitor
            return `
                <div class="model-visual-card">
                    <img src="images/monitor.png" alt="${item.name}" class="product-photo" style="filter: hue-rotate(190deg);" />
                    <div class="model-overlay-badge samsung-badge">ALIENWARE QD-OLED</div>
                </div>
            `;
        case 18: // Lian Li O11 Vision PC Case
            return `
                <div class="model-visual-card">
                    <img src="images/case.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge corsair-badge">LIAN LI CHROME GLASS</div>
                </div>
            `;
        case 19: // NZXT H9 Elite PC Case
            return `
                <div class="model-visual-card">
                    <img src="images/case.png" alt="${item.name}" class="product-photo" style="filter: hue-rotate(240deg);" />
                    <div class="model-overlay-badge nzxt-badge">NZXT H9 PANORAMIC</div>
                </div>
            `;
        case 20: // Wooting 60HE+ Keyboard
            return `
                <div class="model-visual-card">
                    <img src="images/keyboard.png" alt="${item.name}" class="product-photo" />
                    <div class="model-overlay-badge corsair-badge">WOOTING RAPID TRIGGER</div>
                </div>
            `;
        case 21: // Logitech G PRO X SUPERLIGHT 2 Mouse
            return `
                <div class="model-visual-card">
                    <img src="images/razer_mouse.png" alt="${item.name}" class="product-photo" style="filter: hue-rotate(200deg);" />
                    <div class="model-overlay-badge intel-badge">LOGITECH 60G PRO</div>
                </div>
            `;
        default:
            return `<img src="${item.image || 'images/gpu.png'}" alt="${item.name}" class="product-photo" />`;
    }
}

// ── Currency Formatter ──
function formatPrice(amount) {
    return 'Rs. ' + amount.toLocaleString('en-US');
}

// ── Render Products ──
function renderProducts(categoryFilter = 'ALL') {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let filtered = PRODUCTS;
    if (categoryFilter !== 'ALL') {
        filtered = PRODUCTS.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    grid.innerHTML = filtered.map(item => `
        <div class="product-card" data-category="${item.category}">
            <span class="product-tag">${item.tag}</span>
            <div class="product-image">
                ${getProductVisualHTML(item)}
            </div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <p>${item.specs}</p>
                <div class="product-rating">
                    ★ ${item.rating} <span>(${item.reviews} reviews)</span>
                </div>
            </div>
            <div class="product-bottom">
                <div class="price">${formatPrice(item.price)}</div>
                <button class="add-btn" onclick="addToCart(${item.id})" title="Add to Cart">+</button>
            </div>
        </div>
    `).join('');
}

// ── Filter Pills Setup ──
function filterByCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderProducts(cat);
}

// ── Cart Functions ──
function updateCartCount() {
    const countSpan = document.getElementById('cartCount');
    if (countSpan) {
        const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
        countSpan.textContent = totalItems;
    }
    localStorage.setItem('techzoneCart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartCount();
    showToast(`Added ${product.name} to cart!`);
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    updateCartCount();
    renderCartModal();
}

function renderCartModal() {
    const list = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    if (!list || !totalEl) return;

    if (cart.length === 0) {
        list.innerHTML = `<div style="text-align: center; color: var(--muted); padding: 30px;">Your cart is empty</div>`;
        totalEl.textContent = 'Rs. 0';
        return;
    }

    let grandTotal = 0;
    list.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <p>${formatPrice(item.price)} × ${item.qty}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span style="font-weight: 700; font-size: 13px;">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.textContent = formatPrice(grandTotal);
}

// ── Toast Notification ──
function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ── Search Handler ──
// ── Smart Search Matcher (Word-prefix safe) ──
function isProductSearchMatch(p, query) {
    const q = query.trim().toLowerCase();
    if (!q) return false;

    const regex = new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    
    return regex.test(p.name) || 
           regex.test(p.category) || 
           regex.test(p.tag || '') || 
           regex.test(p.specs);
}

function handleLiveSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    if (!query.trim()) {
        resultsContainer.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">Type to search PC parts...</p>`;
        return;
    }

    const matched = PRODUCTS.filter(p => isProductSearchMatch(p, query));

    if (matched.length === 0) {
        resultsContainer.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">No hardware components found.</p>`;
        return;
    }

    resultsContainer.innerHTML = matched.map(p => `
        <div class="search-item">
            <div>
                <strong>${p.name}</strong>
                <div style="font-size: 11px; color: var(--muted);">${p.specs}</div>
            </div>
            <button class="primary-btn" style="padding: 6px 12px; font-size: 11px;" onclick="addToCart(${p.id})">Add</button>
        </div>
    `).join('');
}

// ── Modal Triggers ──
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

// ── Countdown Timer Widget ──
function startCountdown() {
    let hours = 14, minutes = 32, seconds = 45;
    setInterval(() => {
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 24; }

        const hEl = document.getElementById('countHours');
        const mEl = document.getElementById('countMins');
        const sEl = document.getElementById('countSecs');

        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
        if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ── Initialization ──
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    startCountdown();

    // Event listeners for category cards in Shop By Category
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // Highlight filter pill as well
            const targetPill = Array.from(document.querySelectorAll('.filter-pill'))
                .find(b => b.getAttribute('onclick')?.includes(cat));
            filterByCategory(cat, targetPill);

            // Scroll smoothly to products grid
            document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mobile nav toggle
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
        });
    }

    // Modal buttons
    document.getElementById('searchBtn')?.addEventListener('click', () => toggleModal('searchModal', true));
    document.getElementById('cartBtn')?.addEventListener('click', () => toggleModal('cartModal', true));
    document.getElementById('loginBtn')?.addEventListener('click', () => toggleModal('loginModal', true));
});
