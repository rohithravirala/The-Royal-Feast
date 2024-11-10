let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price, image) {
    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, image: image });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById("cart-count").textContent = `(${itemCount})`;
}

function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceDiv = document.getElementById("total-price");
    cartItemsDiv.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsDiv.innerHTML += `
            <div class="cart-item" id="item-${index}">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
                <span>${item.name} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalPriceDiv.innerHTML = `Total Price: ₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount();
}

function checkout() {
    alert("Checkout successful!");
}
if (document.getElementById("cart-items")) {
    updateCart();
}
updateCartCount();