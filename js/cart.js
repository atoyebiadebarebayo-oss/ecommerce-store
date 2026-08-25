// Initialize cart state from LocalStorage or empty array
let cart = JSON.parse(localStorage.getItem('bayo_store_cart')) || [];

/**
 * Saves current cart state to LocalStorage
 */
function saveCartToStorage() {
    localStorage.setItem('bayo_store_cart', JSON.stringify(cart));
}

/**
 * Adds a product to cart or increments quantity if already present
 * @param {Object} product 
 */
function addToCart(product) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateUI();
}

/**
 * Updates quantity of a specific product in cart
 * @param {number} productId 
 * @param {number} change (+1 or -1)
 */
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToStorage();
        updateUI();
    }
}

/**
 * Removes an item completely from cart
 * @param {number} productId 
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateUI();
}

/**
 * Calculates total item count in cart
 * @returns {number}
 */
function getCartTotalCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculates total monetary value of cart items
 * @returns {number}
 */
function getCartTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Clears cart state completely (used on checkout)
 */
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateUI();
}