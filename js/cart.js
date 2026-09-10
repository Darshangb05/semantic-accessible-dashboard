import {
    getCart,
    saveCart
} from "./storage.js";

const container =
    document.querySelector(
        "#cart-container"
    );

let cart = getCart();

function renderCart() {

    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products to continue.
                </p>

                <a
                    href="products.html"
                    class="primary-button"
                >
                    Browse Products
                </a>

            </div>
        `;

        return;
    }

    container.innerHTML = "";

    const list =
        document.createElement("div");

    list.className =
        "cart-list";

    let total = 0;

    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        const article =
            document.createElement("article");

        article.className =
            "cart-item";

        article.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.title}"
            >

            <div class="cart-item-info">

                <h2>
                    ${item.title}
                </h2>

                <p>
                    $${item.price.toFixed(2)}
                </p>

                <div class="quantity-controls">

                    <button
                        data-action="decrease"
                        data-id="${item.id}"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="increase"
                        data-id="${item.id}"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>

                <button
                    class="danger-button"
                    data-action="remove"
                    data-id="${item.id}"
                >
                    Remove
                </button>

            </div>
        `;

        list.appendChild(article);
    });

    container.appendChild(list);

    const summary =
        document.createElement("div");

    summary.className =
        "cart-summary";

    summary.innerHTML = `

        <h2>
            Total: $${total.toFixed(2)}
        </h2>

        <button
            id="checkout-button"
            class="primary-button"
        >
            Simulate Checkout
        </button>
    `;

    container.appendChild(summary);

    document
        .querySelectorAll(
            "[data-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => handleAction(
                    button.dataset.action,
                    Number(button.dataset.id)
                )
            );

        });

    document
        .querySelector("#checkout-button")
        .addEventListener(
            "click",
            checkout
        );
}

function handleAction(
    action,
    id
) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;

    if (action === "increase") {

        item.quantity += 1;

    }

    if (action === "decrease") {

        item.quantity -= 1;

        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    product =>
                        product.id !== id
                );
        }
    }

    if (action === "remove") {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );
    }

    saveCart(cart);

    renderCart();
}

function checkout() {

    alert(
        "Checkout simulation successful!"
    );

    cart = [];

    saveCart(cart);

    renderCart();
}

renderCart();