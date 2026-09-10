import {
    fetchProducts
} from "./api.js";

import {
    getStoredProducts,
    saveProducts
} from "./storage.js";

const form =
    document.querySelector("#product-form");

const productId =
    document.querySelector("#product-id");

const title =
    document.querySelector("#product-title");

const price =
    document.querySelector("#product-price");

const category =
    document.querySelector("#product-category");

const image =
    document.querySelector("#product-image");

const description =
    document.querySelector("#product-description");

const productList =
    document.querySelector("#admin-products");

const cancelButton =
    document.querySelector("#cancel-button");

let products = [];

async function initialize() {

    try {

        const stored =
            getStoredProducts();

        if (stored) {

            products = stored;

        } else {

            products =
                await fetchProducts();

            saveProducts(products);
        }

        renderProducts();

    } catch (error) {

        productList.innerHTML =
            `<p class="error-banner">
                Unable to load products.
            </p>`;
    }
}

function renderProducts() {

    productList.innerHTML = "";

    products.forEach(product => {

        const item =
            document.createElement("article");

        item.className =
            "admin-product";

        item.innerHTML = `

            <div>

                <h3>
                    ${product.title}
                </h3>

                <p>
                    $${Number(product.price).toFixed(2)}
                </p>

                <p>
                    ${product.category}
                </p>

            </div>

            <div class="product-actions">

                <button
                    class="secondary-button"
                    data-edit="${product.id}"
                >
                    Edit
                </button>

                <button
                    class="danger-button"
                    data-delete="${product.id}"
                >
                    Delete
                </button>

            </div>
        `;

        productList.appendChild(item);

    });

    document
        .querySelectorAll("[data-edit]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => editProduct(
                    Number(button.dataset.edit)
                )
            );

        });

    document
        .querySelectorAll("[data-delete]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => deleteProduct(
                    Number(button.dataset.delete)
                )
            );

        });
}

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const id =
            productId.value;

        const productData = {

            title: title.value.trim(),

            price:
                Number(price.value),

            category:
                category.value.trim(),

            image:
                image.value.trim(),

            description:
                description.value.trim(),

            rating: {
                rate: 5,
                count: 0
            }
        };

        if (id) {

            const index =
                products.findIndex(
                    product =>
                        product.id === Number(id)
                );

            if (index !== -1) {

                products[index] = {
                    ...products[index],
                    ...productData
                };
            }

        } else {

            const newProduct = {

                id:
                    Date.now(),

                ...productData
            };

            products.unshift(
                newProduct
            );
        }

        saveProducts(products);

        resetForm();

        renderProducts();

        alert(
            "Product saved successfully."
        );
    }
);

function editProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;

    productId.value =
        product.id;

    title.value =
        product.title;

    price.value =
        product.price;

    category.value =
        product.category;

    image.value =
        product.image;

    description.value =
        product.description;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteProduct(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );

    if (!confirmed) return;

    products =
        products.filter(
            product =>
                product.id !== id
        );

    saveProducts(products);

    renderProducts();
}

function resetForm() {

    form.reset();

    productId.value = "";
}

cancelButton.addEventListener(
    "click",
    resetForm
);

initialize();