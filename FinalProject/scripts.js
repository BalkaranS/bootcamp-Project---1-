// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "0.00";
            return;
        }

        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Function to add items to cart
    function addToCart(product) {
        let existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(${product.name} has been added to your cart.);
    }

    // Function to remove items from cart
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    // If we are on the cart page, update the cart display
    if (document.getElementById("cart-items")) {
        updateCartDisplay();
    }

    // Checkout button event
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert("Proceeding to checkout...");
            localStorage.removeItem("cart");
            cart = [];
            updateCartDisplay();
        });
    }

    // Attach add to cart event to product buttons in shop page
    const productGrid = document.querySelector(".product-grid");
    if (productGrid) {
        document.querySelectorAll(".product-item button").forEach((button, index) => {
            button.addEventListener("click", () => {
                const productName = document.querySelectorAll(".product-item h3")[index].textContent;
                const productPrice = parseFloat(document.querySelectorAll(".product-item p")[index].textContent.replace("$", ""));
                addToCart({ id: index + 1, name: productName, price: productPrice });
            });
        });
    }
});