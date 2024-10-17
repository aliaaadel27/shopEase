// Fetch products from FakeStoreAPI
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'product-card');
            productCard.innerHTML = `
                <div class="card h-100 d-flex flex-column">
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description.slice(0, 50)}...</p>
                        <p class="card-text fw-bold mt-auto">$${product.price}</p> <!-- Align price near the button -->
                        <button 
                            class="btn btn-dark w-100 mt-2 add-to-cart" 
                            data-id="${product.id}" 
                            data-title="${product.title}" 
                            data-price="${product.price}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;

            productList.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const productTitle = e.target.getAttribute('data-title');
                const productPrice = parseFloat(e.target.getAttribute('data-price'));

                const product = {
                    id: productId,
                    title: productTitle,
                    price: productPrice,
                    quantity: 1
                };
                addToCart(product);
            });
        });

        updateCartCount();
    })
    .catch(error => console.error('Error fetching products:', error));

// Add product to cart
function addToCart(product) {
    let currentUser = localStorage.getItem('userName');
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }
    let cart = JSON.parse(localStorage.getItem(currentUser + '_cart')) || [];
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    localStorage.setItem(currentUser + '_cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.title} added to cart!`);
}

// Update cart count
function updateCartCount() {
    let currentUser = localStorage.getItem('userName');
    const cart = JSON.parse(localStorage.getItem(currentUser + '_cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}
