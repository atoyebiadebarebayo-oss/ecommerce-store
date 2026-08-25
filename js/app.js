// Global event handlers accessible from dynamic inline HTML onclick attributes
window.handleAddToCart = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        addToCart(product);
        toggleCartDrawer(true);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch initial product data and populate main grid
    const products = await fetchProducts();
    renderProducts(products);
    updateUI();

    // 2. Setup Category Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.getAttribute('data-category');
            const filtered = filterProductsByCategory(category);
            renderProducts(filtered);
        });
    });

    // 3. Setup Search Bar Input
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const handleSearch = () => {
        const query = searchInput.value;
        const results = searchProductsByQuery(query);
        renderProducts(results);
    };

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // 4. Setup Cart Drawer Open / Close Events
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');

    if (openCartBtn) openCartBtn.addEventListener('click', () => toggleCartDrawer(true));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCartDrawer(false));

    // 5. Setup Checkout Simulation Button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert(`Thank you for your order! Total paid: $${getCartTotalPrice().toFixed(2)}`);
            clearCart();
            toggleCartDrawer(false);
        });
    }
});