const serviceList =
    document.querySelector("#service-list");

const statusMessage =
    document.querySelector("#status-message");

const searchForm =
    document.querySelector("#search-form");

const searchInput =
    document.querySelector("#service-search");

const clearButton =
    document.querySelector("#clear-search");

let services = [];

async function loadServices() {
    setStatus("Loading services…");

    try {
        const response =
            await fetch("/api/services");

        if (!response.ok) {
            throw new Error("Unable to load services.");
        }

        const payload =
            await response.json();

        services =
            Array.isArray(payload.data)
                ? payload.data
                : [];

        renderServices(services);

    } catch (error) {
        console.error(error);

        serviceList.innerHTML = "";

        setStatus(
            "Services could not be loaded. Please try again later."
        );
    }
}

function renderServices(items) {
    serviceList.innerHTML = "";

    if (items.length === 0) {
        const empty =
            document.createElement("p");

        empty.textContent =
            "No services match your search.";

        serviceList.appendChild(empty);

        setStatus(
            "No services found."
        );

        return;
    }

    const fragment =
        document.createDocumentFragment();

    items.forEach(service => {
        const article =
            document.createElement("article");

        article.className =
            "service-card";

        const heading =
            document.createElement("h3");

        heading.textContent =
            service.name;

        const department =
            document.createElement("p");

        department.textContent =
            service.department;

        const description =
            document.createElement("p");

        description.textContent =
            service.description;

        article.append(
            heading,
            department,
            description
        );

        fragment.appendChild(article);
    });

    serviceList.appendChild(fragment);

    setStatus(
        `${items.length} service${items.length === 1 ? "" : "s"} available.`
    );
}

function setStatus(message) {
    statusMessage.textContent = message;
}

function filterServices(query) {
    const normalized =
        query.trim().toLowerCase();

    if (!normalized) {
        return services;
    }

    return services.filter(service =>
        [
            service.name,
            service.department,
            service.description
        ]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
    );
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    renderServices(
        filterServices(searchInput.value)
    );
});

searchInput.addEventListener("input", () => {
    renderServices(
        filterServices(searchInput.value)
    );
});

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderServices(services);
    searchInput.focus();
});

loadServices();
