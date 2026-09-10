const PRODUCTS_KEY = "capstone_products";
const CART_KEY = "capstone_cart";
const USER_KEY = "capstone_user";
const PREFERENCES_KEY = "product_preferences";

export function saveProducts(products) {
    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );
}

export function getStoredProducts() {
    try {
        const products = localStorage.getItem(PRODUCTS_KEY);

        return products
            ? JSON.parse(products)
            : null;

    } catch (error) {
        console.error("Unable to read products:", error);
        return null;
    }
}

export function saveCart(cart) {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}

export function getCart() {
    try {
        const cart = localStorage.getItem(CART_KEY);

        return cart
            ? JSON.parse(cart)
            : [];

    } catch (error) {
        console.error("Unable to read cart:", error);
        return [];
    }
}

export function saveUser(user) {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );
}

export function getUser() {
    try {
        const user = localStorage.getItem(USER_KEY);

        return user
            ? JSON.parse(user)
            : null;

    } catch (error) {
        return null;
    }
}

export function logoutUser() {
    localStorage.removeItem(USER_KEY);
}

export function savePreferences(preferences) {
    localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify(preferences)
    );
}

export function getPreferences() {
    try {
        const saved =
            localStorage.getItem(PREFERENCES_KEY);

        return saved
            ? JSON.parse(saved)
            : {
                search: "",
                category: "all",
                sort: "default"
            };

    } catch (error) {
        return {
            search: "",
            category: "all",
            sort: "default"
        };
    }
}