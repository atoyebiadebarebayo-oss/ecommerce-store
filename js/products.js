// Global array to hold fetched store products
let allProducts = [];

/**
 * Fetches products from the FakeStore API
 * @returns {Promise<Array>} List of product objects
 */
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
        return allProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

/**
 * Filters products by category
 * @param {string} category 
 * @returns {Array} Filtered product list
 */
function filterProductsByCategory(category) {
    if (category === 'all') {
        return allProducts;
    }
    return allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

/**
 * Searches products by title query
 * @param {string} query 
 * @returns {Array} Search results
 */
function searchProductsByQuery(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return allProducts;
    
    return allProducts.filter(product => 
        product.title.toLowerCase().includes(cleanQuery) ||
        product.category.toLowerCase().includes(cleanQuery)
    );
}