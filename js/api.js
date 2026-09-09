const API_BASE_URL =
    "https://fakestoreapi.com";

/**
 * Fetch all products from Fake Store API
 */
export async function fetchProducts() {

    const response = await fetch(
        `${API_BASE_URL}/products`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load products."
        );

    }

    return await response.json();
}

/**
 * Fetch all product categories
 */
export async function fetchCategories() {

    const response = await fetch(
        `${API_BASE_URL}/products/categories`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load categories."
        );

    }

    return await response.json();
}