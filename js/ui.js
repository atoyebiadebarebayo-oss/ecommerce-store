/**
 * Renders product cards into the main product grid
 * @param {Array} products 
 */
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `<p class="no-products">No products found matching your search.</p>`;
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div>
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.title}</h3>
            </div>
            <div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Updates all cart-related UI components (drawer items, badge count, total price)
 */
function updateUI() {
    renderCartItems();
    updateCartBadge();
    updateCartTotal();
}

/**
 * Renders list items inside the slide-out cart drawer
 */
function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="qty-btn" style="color: red; margin-left: auto;" onclick="removeFromCart(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Updates badge count on top-right navbar cart button
 */
function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = getCartTotalCount();
    }
}

/**
 * Updates total price text inside cart drawer
 */
function updateCartTotal() {
    const totalElement = document.getElementById('cart-total-price');
    if (totalElement) {
        totalElement.textContent = `$${getCartTotalPrice().toFixed(2)}`;
    }
}

/**
 * Opens or closes slide-out cart drawer
 * @param {boolean} open 
 */
function toggleCartDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    if (open) {
        drawer.classList.add('open');
        overlay.classList.add('active');
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
    }
}