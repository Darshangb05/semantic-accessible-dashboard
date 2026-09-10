import {
    fetchProducts,
    fetchCategories
} from "./api.js";

import {
    savePreferences,
    getPreferences
} from "./storage.js";

let products = [];
let filteredProducts = [];

const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const categoryTabs = document.querySelector("#category-tabs");
const productContainer = document.querySelector("#product-container");
const loadingSkeleton = document.querySelector("#loading-skeleton");
const errorMessage = document.querySelector("#error-message");

async function initializeApp() {
    showLoading();

    try {
        products = await fetchProducts();

        const categories = await fetchCategories();

        renderCategoryTabs(categories);

        restorePreferences();
        applyFilters();

    } catch (error) {
        console.error(error);

        showError(
            "Unable to load products. Please check your connection and try again."
        );
    } finally {
        hideLoading();
    }
}

/* =========================
   CATEGORY TABS
========================= */

function renderCategoryTabs(categories) {
    categoryTabs.innerHTML = "";

    const allButton = createCategoryButton("all", "All");
    categoryTabs.appendChild(allButton);

    categories.forEach(category => {

        const label = category
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

        categoryTabs.appendChild(
            createCategoryButton(category, label)
        );
    });

    setActiveCategory("all");
}

function createCategoryButton(value, label) {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "category-tab";
    button.dataset.category = value;
    button.textContent = label;

    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {

        setActiveCategory(value);
        applyFilters();

    });

    return button;
}

function setActiveCategory(category) {

    categoryTabs
        .querySelectorAll(".category-tab")
        .forEach(button => {

            const active =
                button.dataset.category === category;

            button.classList.toggle("active", active);

            button.setAttribute(
                "aria-pressed",
                String(active)
            );

        });
}

/* =========================
   FILTER + SEARCH
========================= */

function applyFilters() {

    const searchTerm =
        searchInput.value.trim().toLowerCase();

    const activeButton =
        categoryTabs.querySelector(".category-tab.active");

    const selectedCategory =
        activeButton?.dataset.category || "all";

    const selectedSort =
        sortSelect.value;

    filteredProducts = products.filter(product => {

        const matchesSearch =
            product.title
                .toLowerCase()
                .includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    sortProducts(selectedSort);

    renderProducts();

    savePreferences({
        search: searchTerm,
        category: selectedCategory,
        sort: selectedSort
    });
}

/* =========================
   SORTING
========================= */

function sortProducts(sortType) {

    if (sortType === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sortType === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    if (sortType === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );

    }
}

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {

        productContainer.innerHTML = `
            <p class="no-results">
                No products found.
            </p>
        `;

        return;
    }

    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";

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

                <h3>${product.title}</h3>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

                <p class="product-rating">
                    ⭐ ${product.rating.rate}
                </p>

            </div>
        `;

        productContainer.appendChild(card);

    });
}

/* =========================
   LOCAL STORAGE
========================= */

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

/* =========================
   LOADING SKELETON
========================= */

function showLoading() {

    loadingSkeleton.hidden = false;
    productContainer.hidden = true;

}

function hideLoading() {

    loadingSkeleton.hidden = true;
    productContainer.hidden = false;

}

/* =========================
   ERROR MESSAGE
========================= */

function showError(message) {

    errorMessage.textContent = message;
    errorMessage.hidden = false;

}

/* =========================
   EVENTS
========================= */

searchInput.addEventListener(
    "input",
    applyFilters
);

sortSelect.addEventListener(
    "change",
    applyFilters
);

/* =========================
   START APPLICATION
========================= */

initializeApp();