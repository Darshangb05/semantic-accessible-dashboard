import {
    fetchProducts,
    fetchCategories
} from "./api.js";

import {
    saveCart,
    getCart,
    savePreferences,
    getPreferences,
    saveProducts,
    getStoredProducts
} from "./storage.js";

let products = [];
let filteredProducts = [];

const searchInput =
    document.querySelector("#search-input");

const sortSelect =
    document.querySelector("#sort-select");

const categoryTabs =
    document.querySelector("#category-tabs");

const productContainer =
    document.querySelector("#product-container");

const loadingSkeleton =
    document.querySelector("#loading-skeleton");

const errorMessage =
    document.querySelector("#error-message");

async function initialize() {

    showLoading();

    try {

        const storedProducts =
            getStoredProducts();

        if (storedProducts) {

            products = storedProducts;

        } else {

            products =
                await fetchProducts();

            saveProducts(products);

        }

        const categories =
            await fetchCategories();

        renderCategoryTabs(categories);

        restorePreferences();

        applyFilters();

    } catch (error) {

        console.error(error);

        showError(
            "Unable to load products. Please try again."
        );

    } finally {

        hideLoading();

    }
}

function renderCategoryTabs(categories) {

    categoryTabs.innerHTML = "";

    categoryTabs.appendChild(
        createCategoryButton("all", "All")
    );

    categories.forEach(category => {

        const label = category
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ");

        categoryTabs.appendChild(
            createCategoryButton(
                category,
                label
            )
        );

    });

    setActiveCategory("all");
}

function createCategoryButton(
    value,
    label
) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "category-tab";

    button.dataset.category =
        value;

    button.textContent =
        label;

    button.setAttribute(
        "aria-pressed",
        "false"
    );

    button.addEventListener(
        "click",
        () => {

            setActiveCategory(value);
            applyFilters();

        }
    );

    return button;
}

function setActiveCategory(category) {

    categoryTabs
        .querySelectorAll(".category-tab")
        .forEach(button => {

            const active =
                button.dataset.category === category;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                String(active)
            );

        });
}

function applyFilters() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const activeButton =
        categoryTabs.querySelector(
            ".category-tab.active"
        );

    const category =
        activeButton?.dataset.category ||
        "all";

    filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );

        });

    sortProducts(
        sortSelect.value
    );

    renderProducts();

    savePreferences({
        search: searchTerm,
        category,
        sort: sortSelect.value
    });
}

function sortProducts(sortType) {

    if (sortType === "price-low") {

        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (
        sortType === "price-high"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    } else if (
        sortType === "name"
    ) {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(
                    b.title
                )
        );
    }
}

function renderProducts() {

    productContainer.innerHTML = "";

    if (!filteredProducts.length) {

        productContainer.innerHTML =
            `<p class="no-results">
                No products found.
            </p>`;

        return;
    }

    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.title}"
                loading="lazy"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.title}
                </h3>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

                <p>
                    ⭐ ${product.rating.rate}
                </p>

                <div class="product-actions">

                    <a
                        class="secondary-button"
                        href="product-details.html?id=${product.id}"
                    >
                        View
                    </a>

                    <button
                        class="primary-button add-cart-button"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productContainer.appendChild(card);

    });

    document
        .querySelectorAll(".add-cart-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => addToCart(
                    Number(button.dataset.id)
                )
            );

        });
}

function addToCart(productId) {

    const cart = getCart();

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        existing.quantity += 1;

    } else {

        const product =
            products.find(
                item => item.id === productId
            );

        if (!product) return;

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

function restorePreferences() {

    const preferences =
        getPreferences();

    searchInput.value =
        preferences.search || "";

    sortSelect.value =
        preferences.sort || "default";

    setActiveCategory(
        preferences.category || "all"
    );
}

function showLoading() {

    loadingSkeleton.hidden =
        false;

    productContainer.hidden =
        true;
}

function hideLoading() {

    loadingSkeleton.hidden =
        true;

    productContainer.hidden =
        false;
}

function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.hidden =
        false;
}

searchInput.addEventListener(
    "input",
    applyFilters
);

sortSelect.addEventListener(
    "change",
    applyFilters
);

initialize();