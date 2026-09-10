const API_BASE_URL =
    "https://fakestoreapi.com";

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

export async function fetchProduct(id) {

    const response = await fetch(
        `${API_BASE_URL}/products/${id}`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load product."
        );
    }

    return await response.json();
}