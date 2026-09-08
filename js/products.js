/* ─────────────────────────────────────────────────────────────
   TechZone — Product Listing & Detail JavaScript Engine
   Category Filtering, Sorting, Product Detail Modal & Cart Sync
   ───────────────────────────────────────────────────────────── */

// ── Complete Hardware Catalog with Detailed Spec Sheets ──
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
        image: "images/hero_rtx5090.png",
        specSheet: {
            "Architecture": "NVIDIA Blackwell (4nm TSMC)",
            "CUDA Cores": "21,760 Cores",
            "Memory Size": "32GB GDDR7",
            "Memory Interface": "512-bit",
            "Memory Bandwidth": "1,792 GB/s",
            "Boost Clock": "2,550 MHz",
            "Ray Tracing": "4th Gen RT Cores",
            "Tensor Cores": "5th Gen Tensor Cores (DLSS 4.0)",
            "TDP / Power": "600W (Native 16-Pin 12V-2x6)",
            "Recommended PSU": "1000W Platinum or higher",
            "Outputs": "3x DisplayPort 2.1a, 1x HDMI 2.1b",
            "Warranty": "3 Years Official Manufacturer Warranty"
        }
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
        image: "images/msi_gpu.png",
        specSheet: {
            "Architecture": "NVIDIA Blackwell",
            "CUDA Cores": "10,752 Cores",
            "Memory Size": "16GB GDDR7",
            "Memory Bus": "256-bit",
            "Boost Clock": "2,670 MHz (Extreme Mode)",
            "Cooling Solution": "TRI FROZR 3S Triple Fan",
            "Power Connectors": "1x 16-Pin PCIe 5.0",
            "TDP": "400W",
            "Recommended PSU": "850W Gold",
            "Warranty": "3 Years MSI Official Warranty"
        }
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
        image: "images/intel_cpu.png",
        specSheet: {
            "Total Cores": "24 Cores (8 Performance + 16 Efficient)",
            "Total Threads": "24 Threads",
            "Max Turbo Frequency": "Up to 5.7 GHz",
            "P-Core Base Clock": "3.7 GHz",
            "E-Core Base Clock": "3.2 GHz",
            "Socket": "LGA1851 (Intel 800 Series)",
            "L3 Cache": "36MB",
            "L2 Cache": "40MB",
            "Processor Base Power": "125W",
            "Maximum Turbo Power": "250W",
            "Memory Support": "DDR5-6400 (Up to 192GB)",
            "Integrated NPU": "Intel AI Boost (13 TOPS)",
            "Warranty": "3 Years Official Intel Warranty"
        }
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
        image: "images/amd_cpu.png",
        specSheet: {
            "Total Cores": "16 Cores",
            "Total Threads": "32 Threads",
            "Max Boost Clock": "Up to 5.7 GHz",
            "Base Clock": "4.3 GHz",
            "L3 Cache": "64MB",
            "L2 Cache": "16MB",
            "Socket": "AM5 (PCIe 5.0 Ready)",
            "Default TDP": "170W",
            "Architecture": "Zen 5 (4nm TSMC FinFET)",
            "Memory Support": "DDR5 Dual-Channel",
            "Unlocked for Overclocking": "Yes (Precision Boost Overdrive)",
            "Warranty": "3 Years Official AMD Warranty"
        }
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
        image: "images/mobo.png",
        specSheet: {
            "Form Factor": "E-ATX",
            "CPU Socket": "LGA1851 (Supports Intel Core Ultra 200 Series)",
            "Chipset": "Intel Z890",
            "Memory Slots": "4x DDR5 (Max 256GB, 9200+ MHz OC)",
            "PCIe Slots": "2x PCIe 5.0 x16 Slots",
            "M.2 Slots": "6x M.2 (2x PCIe 5.0 x4, 4x PCIe 4.0 x4)",
            "Networking": "10G LAN + 5G LAN + Wi-Fi 7",
            "Display Output": "2x Thunderbolt 5 (80Gbps)",
            "Onboard Feature": "M-Vision 4.0 Full Color Touch LCD Display",
            "Warranty": "3 Years Official Warranty"
        }
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
        image: "images/mobo.png",
        specSheet: {
            "Form Factor": "ATX",
            "CPU Socket": "LGA1851",
            "Chipset": "Intel Z890",
            "Power Delivery": "22+1+2 Power Stages (110A)",
            "Memory Support": "4x DDR5 Slots up to 8800+ MHz (OC)",
            "Expansion": "1x PCIe 5.0 x16 with Q-Release Slim",
            "Storage": "5x M.2 Slots (1x PCIe 5.0)",
            "Audio": "ROG SupremeFX ALC4082 with ESS SABRE DAC",
            "Wireless": "Wi-Fi 7 + Bluetooth 5.4",
            "Warranty": "3 Years Official ASUS Warranty"
        }
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
        image: "images/corsair_ram.png",
        specSheet: {
            "Capacity": "64GB (2 x 32GB Modules)",
            "Memory Type": "DDR5 SDRAM",
            "Tested Speed": "7200 MHz",
            "Tested Latency": "CL34-44-44-96",
            "Tested Voltage": "1.45V",
            "Profile": "Intel XMP 3.0 & AMD EXPO",
            "Heat Spreader": "Patented DHX Anodized Aluminum with Top Bar",
            "RGB Lighting": "11x Addressable RGB LEDs per module",
            "Warranty": "Lifetime Limited Warranty"
        }
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
        image: "images/samsung_ssd.png",
        specSheet: {
            "Capacity": "2TB",
            "Form Factor": "M.2 2280",
            "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
            "Sequential Read": "Up to 7,450 MB/s",
            "Sequential Write": "Up to 6,900 MB/s",
            "Random Read": "Up to 1,400,000 IOPS",
            "Controller": "Samsung In-House Pascal Controller",
            "NAND Flash": "Samsung V-NAND 3-bit MLC (TLC)",
            "TBW Rating": "1,200 TBW",
            "Warranty": "5 Years Official Samsung Warranty"
        }
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
        image: "images/samsung_ssd.png",
        specSheet: {
            "Capacity": "4TB",
            "Interface": "PCIe Gen 4.0 x4 / PCIe Gen 5.0 x2",
            "Sequential Read": "Up to 5,000 MB/s",
            "Sequential Write": "Up to 4,200 MB/s",
            "DRAM-Less Design": "Host Memory Buffer (HMB) Technology",
            "Power Efficiency": "70% More Energy Efficient than 970 EVO Plus",
            "Warranty": "5 Years Official Samsung Warranty"
        }
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
        image: "images/nzxt_cooler.png",
        specSheet: {
            "Radiator Dimensions": "394 x 121 x 27 mm (360mm)",
            "Display": "2.36\" TFT-LCD (640x640 Resolution, 60Hz, 690 cd/m²)",
            "Pump Speed": "800 – 2,800 ± 300 RPM (Asetek Gen7)",
            "Fan Included": "3x F120 RGB Core Fans (500 - 1,800 RPM)",
            "Airflow": "78.86 CFM per fan",
            "Noise Level": "15.8 - 33.88 dBA",
            "Socket Compatibility": "Intel LGA 1851/1700, AMD AM5/AM4",
            "Warranty": "6 Years Official NZXT Warranty"
        }
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
        image: "images/gpu.png",
        specSheet: {
            "GPU Engine": "NVIDIA GeForce RTX 4070 Ti SUPER",
            "CUDA Cores": "8,448 Cores",
            "Memory": "16GB GDDR6X",
            "Memory Bus": "256-bit",
            "Boost Clock": "2,670 MHz",
            "Power Requirement": "285W (700W Recommended PSU)",
            "Outputs": "3x DisplayPort 1.4a, 1x HDMI 2.1a",
            "Warranty": "3 Years Official Warranty"
        }
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
        image: "images/psu.png",
        specSheet: {
            "Total Wattage": "1200 Watts",
            "Efficiency Rating": "80 PLUS Platinum & Cybenetics Lambda A++",
            "OLED Display": "Real-time System Power Draw Monitoring",
            "Cables": "Fully Modular Sleeved Cables",
            "PCIe 5.0 Support": "Includes 16-Pin 12VHPWR Cable",
            "Fan Type": "135mm Axial-tech Fan with 0dB Technology",
            "Warranty": "10 Years Official ASUS Warranty"
        }
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
        image: "images/razer_mouse.png",
        specSheet: {
            "Sensor": "Focus Pro 30K Optical Sensor",
            "Weight": "63g Ultra-lightweight Ergonomic Design",
            "Max DPI": "30,000 DPI",
            "Max Acceleration": "70G",
            "Switches": "Gen-3 Optical Mouse Switches (90M Click Lifecycle)",
            "Connectivity": "Razer HyperSpeed Wireless + USB-C Cable",
            "Battery Life": "Up to 90 hours",
            "Warranty": "2 Years Official Razer Warranty"
        }
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
        image: "images/cpu.png",
        specSheet: {
            "Total Cores": "24 Cores (8 Performance + 16 Efficient)",
            "Total Threads": "32 Threads",
            "Max Turbo Frequency": "6.0 GHz (Thermal Velocity Boost)",
            "L3 Cache": "36MB",
            "Socket": "LGA1700",
            "Base / Turbo TDP": "125W / 253W",
            "Warranty": "3 Years Official Intel Warranty"
        }
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
        image: "images/amd_cpu.png",
        specSheet: {
            "Total Cores": "8 Cores",
            "Total Threads": "16 Threads",
            "Boost Clock": "Up to 5.0 GHz",
            "L3 Cache": "96MB 3D V-Cache",
            "Socket": "AM5",
            "Default TDP": "120W",
            "Gaming Rank": "#1 Rated Gaming Processor Worldwide",
            "Warranty": "3 Years Official AMD Warranty"
        }
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
        image: "images/monitor.png",
        specSheet: {
            "Panel Size": "31.5-inch 3840x2160 (4K UHD)",
            "Panel Type": "Quantum Dot OLED (QD-OLED)",
            "Refresh Rate": "240 Hz",
            "Response Time": "0.03 ms (GTG)",
            "HDR Support": "Dolby Vision & HDR10",
            "Color Gamut": "99% DCI-P3",
            "Ports": "DisplayPort 1.4 (DSC), HDMI 2.1, USB-C (90W PD)",
            "Warranty": "3 Years OLED Burn-in Covered Warranty"
        }
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
        image: "images/monitor.png",
        specSheet: {
            "Screen Size": "34.18-inch Curved 1800R",
            "Resolution": "3440 x 1440 WQHD",
            "Refresh Rate": "175 Hz (Native)",
            "Response Time": "0.1 ms GTG",
            "NVIDIA G-SYNC": "G-SYNC Ultimate Certified",
            "Warranty": "3 Years Premium Exchange Warranty"
        }
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
        image: "images/case.png",
        specSheet: {
            "Case Type": "Dual-Chamber Mid-Tower",
            "Panels": "3-Sided Seamless Tempered Glass with Chrome Coating",
            "Motherboard Support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
            "Radiator Support": "Side 360mm, Bottom 360mm, Rear 240mm",
            "GPU Clearance": "Up to 455mm",
            "Warranty": "1 Year Official Lian Li Warranty"
        }
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
        image: "images/case.png",
        specSheet: {
            "Case Type": "Dual-Chamber Mid-Tower",
            "Glass": "Tempered Glass Top, Side and Front Panels",
            "Included Fans": "3x F120 RGB Duo Fans + 1x Quiet Airflow Fan",
            "Fan Controller": "NZXT RGB & Fan Controller V2 Included",
            "Warranty": "2 Years NZXT Warranty"
        }
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
        image: "images/keyboard.png",
        specSheet: {
            "Form Factor": "60% Compact Layout",
            "Switch Type": "Lekker Hall Effect Magnetic Analog Switches",
            "Actuation Point": "0.1mm to 4.0mm Fully Adjustable",
            "Rapid Trigger": "0.1mm Dynamic Reset Sensitivity",
            "Keycaps": "Double-shot PBT Keycaps",
            "Software": "Wootility Web-based Zero-Install Configurator",
            "Warranty": "2 Years Official Warranty"
        }
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
        image: "images/razer_mouse.png",
        specSheet: {
            "Weight": "60 grams Ultra Lightweight",
            "Sensor": "HERO 2 Sensor (500+ IPS, 32,000 DPI)",
            "Polling Rate": "4,000 Hz Wireless Polling",
            "Switches": "LIGHTFORCE Hybrid Optical-Mechanical Switches",
            "Battery Life": "Up to 95 Hours continuous motion",
            "Warranty": "2 Years Logitech Official Warranty"
        }
    }
];

// ── State Management ──
let cart = JSON.parse(localStorage.getItem('techzoneCart')) || [];
let currentCategory = 'ALL';
let currentSort = 'featured';
let currentSearch = '';
let activeDetailProduct = null;
let activeDetailQty = 1;

// ── Category List Definition for Sidebar ──
const CATEGORIES_LIST = [
    { id: 'ALL', label: 'All parts', count: PRODUCTS.length },
    { id: 'CPU', label: 'CPU', count: PRODUCTS.filter(p => p.category === 'CPU').length },
    { id: 'GPU', label: 'GPU', count: PRODUCTS.filter(p => p.category === 'GPU').length },
    { id: 'RAM', label: 'RAM', count: PRODUCTS.filter(p => p.category === 'RAM').length },
    { id: 'Storage', label: 'Storage', count: PRODUCTS.filter(p => p.category === 'Storage').length },
    { id: 'Motherboard', label: 'Motherboards', count: PRODUCTS.filter(p => p.category === 'Motherboard').length },
    { id: 'Cooling', label: 'Cooling', count: PRODUCTS.filter(p => p.category === 'Cooling').length },
    { id: 'Power', label: 'Power', count: PRODUCTS.filter(p => p.category === 'Power').length },
    { id: 'Monitors', label: 'Monitors', count: PRODUCTS.filter(p => p.category === 'Monitors').length },
    { id: 'Cases', label: 'Cases', count: PRODUCTS.filter(p => p.category === 'Cases').length },
    { id: 'Peripherals', label: 'Peripherals', count: PRODUCTS.filter(p => p.category === 'Peripherals').length }
];

// ── Price Formatter ──
function formatPrice(amount) {
    return 'Rs. ' + amount.toLocaleString('en-US');
}

// ── Model Visual Image Resolver ──
function getProductVisualHTML(item) {
    let overlayBadge = '';
    if (item.category === 'CPU') {
        overlayBadge = item.name.includes('Intel') ? 'intel-badge' : 'amd-badge';
    } else if (item.category === 'GPU') {
        overlayBadge = item.name.includes('MSI') ? 'msi-badge' : (item.name.includes('ASUS') ? 'rog-badge' : 'intel-badge');
    } else if (item.category === 'RAM') {
        overlayBadge = 'corsair-badge';
    } else if (item.category === 'Storage') {
        overlayBadge = 'samsung-badge';
    } else if (item.category === 'Cooling') {
        overlayBadge = 'nzxt-badge';
    } else if (item.category === 'Peripherals') {
        overlayBadge = item.name.includes('Razer') ? 'razer-badge' : 'corsair-badge';
    }

    return `
        <div class="model-visual-card">
            <img src="${item.image}" alt="${item.name}" class="product-photo" />
            <div class="model-overlay-badge ${overlayBadge}">${item.tag}</div>
        </div>
    `;
}

// ── Sidebar Category Filter Render ──
function renderSidebarCategories() {
    const container = document.getElementById('sidebarCategories');
    if (!container) return;

    container.innerHTML = CATEGORIES_LIST.map(cat => `
        <button 
            class="sidebar-cat-btn ${currentCategory.toLowerCase() === cat.id.toLowerCase() ? 'active' : ''}" 
            onclick="setCategoryFilter('${cat.id}')">
            <span>${cat.label}</span>
            <span class="cat-count">${cat.count}</span>
        </button>
    `).join('');
}

// ── Smart Search Matcher (Word-prefix safe) ──
function isProductSearchMatch(p, query) {
    const q = query.trim().toLowerCase();
    if (!q) return false;

    // Use word-prefix boundary \bquery to match any word starting with the query
    // e.g. "mon" -> "Monitor" (MATCH), "ram" -> "RAM" (MATCH), but NOT "PanoRAMic"
    const regex = new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    
    return regex.test(p.name) || 
           regex.test(p.category) || 
           regex.test(p.tag || '') || 
           regex.test(p.specs);
}

// ── Filter and Sort Handler ──
function getFilteredAndSortedProducts() {
    let list = [...PRODUCTS];

    // Filter by Search Query (searches full catalog if query exists)
    if (currentSearch.trim()) {
        list = list.filter(p => isProductSearchMatch(p, currentSearch));
    } else if (currentCategory !== 'ALL') {
        // Filter by Category when no search query is typed
        list = list.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Sort Products
    switch (currentSort) {
        case 'price-low':
            list.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            list.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
            break;
        case 'name':
            list.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default: // featured
            list.sort((a, b) => a.id - b.id);
            break;
    }

    return list;
}

// ── Render Products Grid ──
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const resultCount = document.getElementById('resultCount');
    const activeFilterTag = document.getElementById('activeFilterTag');

    if (!grid) return;

    const list = getFilteredAndSortedProducts();

    if (resultCount) {
        resultCount.textContent = `${list.length} hardware product${list.length === 1 ? '' : 's'} found`;
    }

    if (activeFilterTag) {
        const catObj = CATEGORIES_LIST.find(c => c.id.toLowerCase() === currentCategory.toLowerCase());
        activeFilterTag.textContent = catObj ? catObj.label : 'All Parts';
    }

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="no-products-box">
                <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
                <h3>No matching components found</h3>
                <p style="color: var(--muted); font-size: 13px; margin-top: 6px;">Try adjusting your search keyword or selected category filter.</p>
                <button class="primary-btn" style="margin-top: 18px;" onclick="resetFilters()">Reset All Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(item => `
        <div class="product-card" onclick="openProductDetail(${item.id})">
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
                <div class="card-action-btns">
                    <button class="view-detail-btn" onclick="event.stopPropagation(); openProductDetail(${item.id});">
                        Details ↗
                    </button>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(${item.id}, 1);" title="Add to Cart">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ── Categories & Keyword Suggestion Dictionary ──
const SUGGESTIONS_DICT = [
    { keywords: ['ra', 'ram', 'mem', 'memory', 'ddr4', 'ddr5'], label: 'RAM / Memory', type: 'category', catId: 'RAM', icon: '⚡' },
    { keywords: ['mo', 'mon', 'monitor', 'display', 'screen', 'oled', '4k', '240hz'], label: 'Monitors & Displays', type: 'category', catId: 'Monitors', icon: '🖥️' },
    { keywords: ['mobo', 'motherboard', 'board', 'z890', 'am5', 'lga'], label: 'Motherboards', type: 'category', catId: 'Motherboard', icon: '🔌' },
    { keywords: ['cp', 'cpu', 'proc', 'processor', 'intel', 'amd', 'ryzen', 'core'], label: 'Processors (CPUs)', type: 'category', catId: 'CPU', icon: '💻' },
    { keywords: ['gp', 'gpu', 'graphics', 'card', 'nvidia', 'rtx', 'geforce'], label: 'Graphics Cards (GPUs)', type: 'category', catId: 'GPU', icon: '🎮' },
    { keywords: ['st', 'sto', 'ssd', 'nvme', 'storage', 'hard', 'drive', 'samsung'], label: 'SSDs & Storage', type: 'category', catId: 'Storage', icon: '💾' },
    { keywords: ['co', 'cool', 'liquid', 'aio', 'fan', 'nzxt', 'cooler'], label: 'AIO Liquid Coolers', type: 'category', catId: 'Cooling', icon: '❄️' },
    { keywords: ['po', 'psu', 'power', 'supply', 'thor', 'watt'], label: 'Power Supplies', type: 'category', catId: 'Power', icon: '⚡' },
    { keywords: ['ca', 'case', 'casing', 'chassis', 'lian li', 'nzxt'], label: 'PC Gaming Cases', type: 'category', catId: 'Cases', icon: '📦' },
    { keywords: ['pe', 'per', 'mouse', 'keyboard', 'gear', 'razer', 'logitech', 'wooting'], label: 'Gaming Peripherals', type: 'category', catId: 'Peripherals', icon: '⌨️' }
];

function updateAutoSuggest(query) {
    const dropdown = document.getElementById('searchAutocomplete');
    if (!dropdown) return;

    const q = query.trim().toLowerCase();
    if (q.length < 1) {
        dropdown.classList.remove('active');
        dropdown.innerHTML = '';
        return;
    }

    // 1. Find Matching Categories
    const matchedCategories = SUGGESTIONS_DICT.filter(item => 
        item.keywords.some(kw => kw.startsWith(q) || q.startsWith(kw) || item.label.toLowerCase().includes(q))
    );

    // 2. Find Matching Products (Max 4 items)
    const matchedProducts = PRODUCTS.filter(p => isProductSearchMatch(p, q)).slice(0, 4);

    if (matchedCategories.length === 0 && matchedProducts.length === 0) {
        dropdown.classList.remove('active');
        dropdown.innerHTML = '';
        return;
    }

    let html = '';

    // Render Category Suggestions Section
    if (matchedCategories.length > 0) {
        html += `<div class="suggest-header">SUGGESTED CATEGORIES</div>`;
        html += matchedCategories.map(cat => `
            <div class="suggest-item" onclick="selectSuggestCategory('${cat.catId}', '${cat.label}')">
                <div class="suggest-item-left">
                    <div class="suggest-icon">${cat.icon}</div>
                    <div>
                        <div class="suggest-title">${cat.label}</div>
                        <div class="suggest-sub">Filter catalog by ${cat.label}</div>
                    </div>
                </div>
                <span class="suggest-badge">Category ↗</span>
            </div>
        `).join('');
    }

    // Render Product Suggestions Section
    if (matchedProducts.length > 0) {
        html += `<div class="suggest-header">MATCHING PRODUCTS</div>`;
        html += matchedProducts.map(p => `
            <div class="suggest-item" onclick="selectSuggestProduct(${p.id})">
                <div class="suggest-item-left">
                    <img src="${p.image}" alt="${p.name}" style="width: 28px; height: 28px; object-fit: contain; background: #181824; border-radius: 4px; padding: 2px;" />
                    <div>
                        <div class="suggest-title" style="font-size: 12px;">${p.name}</div>
                        <div class="suggest-sub" style="font-size: 10px; color: var(--accent-light); font-weight: 700;">${formatPrice(p.price)}</div>
                    </div>
                </div>
                <span class="suggest-badge" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border-color: rgba(6, 182, 212, 0.3);">${p.category}</span>
            </div>
        `).join('');
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
}

function selectSuggestCategory(catId, label) {
    const searchInp = document.getElementById('shopSearchInput');
    if (searchInp) searchInp.value = '';
    currentSearch = '';
    const dropdown = document.getElementById('searchAutocomplete');
    if (dropdown) dropdown.classList.remove('active');

    setCategoryFilter(catId);
}

function selectSuggestProduct(productId) {
    const dropdown = document.getElementById('searchAutocomplete');
    if (dropdown) dropdown.classList.remove('active');

    openProductDetail(productId);
}

// ── Filter Setters ──
function setCategoryFilter(catId) {
    currentCategory = catId;
    renderSidebarCategories();
    renderProducts();
}

function handleSortChange(sortVal) {
    currentSort = sortVal;
    renderProducts();
}

function handleSearchInput(val) {
    currentSearch = val;
    renderProducts();
    updateAutoSuggest(val);
}

function resetFilters() {
    currentCategory = 'ALL';
    currentSort = 'featured';
    currentSearch = '';
    const searchInp = document.getElementById('shopSearchInput');
    const sortSelect = document.getElementById('sortSelect');
    if (searchInp) searchInp.value = '';
    if (sortSelect) sortSelect.value = 'featured';

    const dropdown = document.getElementById('searchAutocomplete');
    if (dropdown) dropdown.classList.remove('active');

    renderSidebarCategories();
    renderProducts();
}

// ── Frame 3: Product Detail Modal Engine ──
function openProductDetail(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    activeDetailProduct = product;
    activeDetailQty = 1;

    const modal = document.getElementById('productDetailModal');
    if (!modal) return;

    // Populate Top Details
    document.getElementById('detailCategoryTag').textContent = product.tag;
    document.getElementById('detailProductName').textContent = product.name;
    document.getElementById('detailProductPrice').textContent = formatPrice(product.price);
    document.getElementById('detailProductImage').src = product.image;
    document.getElementById('detailProductImage').alt = product.name;
    document.getElementById('detailQtyInput').value = activeDetailQty;
    document.getElementById('detailRating').textContent = `★ ${product.rating} (${product.reviews} customer reviews)`;

    // Render Spec Sheet Rows (Key : Value)
    const specContainer = document.getElementById('detailSpecSheet');
    if (specContainer && product.specSheet) {
        specContainer.innerHTML = Object.entries(product.specSheet).map(([key, value]) => `
            <div class="spec-row">
                <span class="spec-key">${key}</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    const modal = document.getElementById('productDetailModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function changeDetailQty(delta) {
    activeDetailQty += delta;
    if (activeDetailQty < 1) activeDetailQty = 1;
    const inp = document.getElementById('detailQtyInput');
    if (inp) inp.value = activeDetailQty;
}

function addActiveDetailToCart() {
    if (!activeDetailProduct) return;
    addToCart(activeDetailProduct.id, activeDetailQty);
    closeProductDetail();
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

function addToCart(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty: qty });
    }

    updateCartCount();
    showToast(`Added ${qty}x ${product.name} to cart!`);
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
        list.innerHTML = `<div style="text-align: center; color: var(--muted); padding: 35px 20px;">Your shopping cart is currently empty.</div>`;
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

// ── Toast Notification System ──
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

// ── Live Search for Header Search Modal ──
function handleLiveSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    const q = query.trim();
    if (!q) {
        resultsContainer.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">Type to search hardware catalog (e.g. mon, ram, cpu, rtx)...</p>`;
        return;
    }

    const matched = PRODUCTS.filter(p => isProductSearchMatch(p, q));

    // Also find matching category suggestions
    const matchedCategories = typeof SUGGESTIONS_DICT !== 'undefined' ? SUGGESTIONS_DICT.filter(item => 
        item.keywords.some(kw => kw.startsWith(q.toLowerCase()) || q.toLowerCase().startsWith(kw) || item.label.toLowerCase().includes(q.toLowerCase()))
    ) : [];

    if (matched.length === 0 && matchedCategories.length === 0) {
        resultsContainer.innerHTML = `<p style="color: var(--muted); font-size: 12px; text-align: center;">No hardware components found for "${query}".</p>`;
        return;
    }

    let html = '';

    if (matchedCategories.length > 0) {
        html += `<div style="margin-bottom: 12px; display: flex; gap: 8px; flex-wrap: wrap;">`;
        html += matchedCategories.map(cat => `
            <button class="active-tag-badge" style="cursor: pointer; border: 1px solid var(--accent-light); padding: 6px 12px; font-size: 11px;" onclick="toggleModal('searchModal', false); setCategoryFilter('${cat.catId}');">
                ${cat.icon} ${cat.label} ↗
            </button>
        `).join('');
        html += `</div>`;
    }

    html += matched.map(p => `
        <div class="search-item" onclick="toggleModal('searchModal', false); openProductDetail(${p.id});">
            <div>
                <strong style="color: #fff; font-size: 13px;">${p.name}</strong>
                <div style="font-size: 11px; color: var(--muted);">${p.specs}</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; margin-left: 12px;">
                <span style="font-weight: 700; color: var(--accent-light); font-size: 12px; white-space: nowrap;">${formatPrice(p.price)}</span>
                <button class="primary-btn" style="padding: 5px 10px; font-size: 11px;" onclick="event.stopPropagation(); addToCart(${p.id})">Add</button>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = html;
}

// ── Modals Trigger ──
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

// ── Check URL parameters for direct detail linking ──
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        currentCategory = categoryParam.toUpperCase();
    }

    if (productId) {
        openProductDetail(productId);
    }
}

// ── DOM Initialization ──
document.addEventListener('DOMContentLoaded', () => {
    renderSidebarCategories();
    renderProducts();
    updateCartCount();
    checkUrlParams();

    // Mobile nav toggle
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
        });
    }

    // Header Modal Triggers
    document.getElementById('searchBtn')?.addEventListener('click', () => toggleModal('searchModal', true));
    document.getElementById('cartBtn')?.addEventListener('click', () => toggleModal('cartModal', true));
    document.getElementById('loginBtn')?.addEventListener('click', () => toggleModal('loginModal', true));

    // Close auto-suggest on click outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('searchAutocomplete');
        const searchBox = document.querySelector('.shop-search-box');
        if (dropdown && searchBox && !searchBox.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});
