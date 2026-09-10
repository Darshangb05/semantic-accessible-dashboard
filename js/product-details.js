import { fetchProduct } from "./api.js";
import {
    getCart,
    saveCart
} from "./storage.js";

const container =
    document.querySelector(
        "#product-details"
    );

const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    params.get("id");

async function loadProduct() {

    if (!id) {

        showError(
            "Product ID was not provided."
        );

        return;
    }

    try {

        const product =
            await fetchProduct(id);

        container.innerHTML = `

            <div class="product-detail">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >

                <div>

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h1>
                        ${product.title}
                    </h1>

                    <p class="product-price">
                        $${product.price.toFixed(2)}
                    </p>

                    <p>
                        ${product.description}
                    </p>

                    <p>
                        ⭐ ${product.rating.rate}
                        (${product.rating.count} reviews)
                    </p>

                    <button
                        id="add-button"
                        class="primary-button"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        document
            .querySelector("#add-button")
            .addEventListener(
                "click",
                () => addToCart(product)
            );

    } catch (error) {

        showError(
            "Unable to load this product."
        );
    }
}

function addToCart(product) {

    const cart = getCart();

    const existing =
        cart.find(
            item => item.id === product.id
        );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);

    alert("Product added to cart.");
}

function showError(message) {

    container.innerHTML = `
        <div class="error-banner">
            ${message}
        </div>
    `;
}

loadProduct();