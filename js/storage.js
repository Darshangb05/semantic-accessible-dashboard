const STORAGE_KEY =
    "product_preferences";

/**
 * Save user preferences
 */
export function savePreferences(preferences) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences)
    );

}

/**
 * Get saved user preferences
 */
export function getPreferences() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );

        return saved
            ? JSON.parse(saved)
            : {
                search: "",
                category: "all",
                sort: "default"
            };

    } catch (error) {

        console.error(
            "Unable to read saved preferences:",
            error
        );

        return {
            search: "",
            category: "all",
            sort: "default"
        };

    }
}