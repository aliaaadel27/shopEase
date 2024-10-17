document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    loadCart();
});

// Ensure user is logged in before accessing the cart
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const warning = document.getElementById('login-warning'); 
    
    if (!isLoggedIn) {
        warning.textContent = 'Please log in to access the cart!';
        warning.style.display = 'block'; // Make the warning visible
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000); // Redirect after 3 seconds
    } else {
        warning.style.display = 'none'; // Hide the warning if logged in
    }
}


// Retrieve the cart of the logged-in user
function getCart() {
    const currentUser = localStorage.getItem('userName');
    if (!currentUser) {
        alert('No user is logged in.');
        return [];
    }

    return JSON.parse(localStorage.getItem(currentUser + '_cart')) || [];
}

// Load cart items for the current user
function loadCart() {
    const cart = getCart(); 
    const cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>';
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    cart.forEach((product, index) => {
        const subtotal = product.price * product.quantity;
        totalPrice += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title || 'Unnamed Product'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}



// Remove a product from the cart
function removeFromCart(index) {
    const user = JSON.parse(localStorage.getItem('isLoggedIn')); 
    if (!user) {
        alert('No user is logged in!');
        return;
    }
    const currentUser = localStorage.getItem('userName');
    const cart = getCart(); 
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; 
        alert('Product quantity decreased by 1!');
    } else {
        cart.splice(index, 1); 
        alert('Product removed from cart!');
    }
    localStorage.setItem(currentUser + '_cart', JSON.stringify(cart));
    loadCart(); 

}


// Clear the entire cart
function clearCart() {
    const user = JSON.parse(localStorage.getItem('isLoggedIn')); 
    if (!user) {
        alert('No user is logged in!');
        return;
    }

    if (confirm('Are you sure you want to clear the cart?')) {
        const currentUser = localStorage.getItem('userName');
        localStorage.removeItem(currentUser + '_cart'); 
        loadCart(); // Reload the cart
        alert('Cart cleared!');
    }
}

