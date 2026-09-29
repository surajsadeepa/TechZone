document.addEventListener('DOMContentLoaded', () => {
    const id = Number(new URLSearchParams(location.search).get('id'));
    const product = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []).find(p => p.id === id);
    if (!product) { location.href = 'products.html'; return; }
    const $ = id => document.getElementById(id);
    $('detailCategory').textContent = product.category || 'Product';
    $('detailTag').textContent = product.tag || product.category || 'PRODUCT';
    $('detailName').textContent = product.name;
    $('detailRating').textContent = `★ ${product.rating} (${product.reviews} reviews)`;
    $('detailPrice').textContent = `Rs. ${Number(product.price).toLocaleString('en-US')}`;
    $('detailImage').src = product.image || 'images/gpu.png';
    $('detailImage').alt = product.name;
    $('specTable').innerHTML = Object.entries(product.specSheet || {Description: product.specs}).map(([k,v]) => `<div class="spec-row"><span>${k}</span><strong>${v}</strong></div>`).join('');
    $('minusBtn').onclick = () => $('detailQty').value = Math.max(1, Number($('detailQty').value)-1);
    $('plusBtn').onclick = () => $('detailQty').value = Number($('detailQty').value)+1;
    $('addDetailBtn').onclick = () => {
        const qty = Math.max(1, Number($('detailQty').value)||1);
        window.addToCart(product.id, qty);
        $('detailMessage').textContent = `${qty} × ${product.name} added to cart.`;
        $('detailMessage').classList.add('show');
    };
});
