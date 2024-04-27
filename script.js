
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productList.appendChild(productItem);
    });
}


function filterProductsByCategory(products, category) {
    if (category === 'all') {
        return products;
    } else {
        return products.filter(product => product.category === category);
    }
}


function searchProducts(products, searchText) {
    return products.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
    );
}


function sortProductsByPrice(products, sortOrder) {
    return products.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}


async function init() {
    const products = await fetchProducts();
    displayProducts(products);

  
    document.getElementById('category-filter').addEventListener('change', function() {
        const selectedCategory = this.value;
        const filteredProducts = filterProductsByCategory(products, selectedCategory);
        displayProducts(filteredProducts);
    });
    
    document.getElementById('search-input').addEventListener('input', function() {
        const searchText = this.value;
        const searchedProducts = searchProducts(products, searchText);
        displayProducts(searchedProducts);
    });
    
    document.getElementById('sort-order').addEventListener('change', function() {
        const sortOrder = this.value;
        const sortedProducts = sortProductsByPrice(products, sortOrder);
        displayProducts(sortedProducts);
    });
    
}

init();
