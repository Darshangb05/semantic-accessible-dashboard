```javascript
"use strict";

/*
 * Accessible Enterprise Dashboard
 *
 * Features:
 * - Mobile navigation
 * - Accessible modal dialogs
 * - Form validation
 * - User search
 * - Keyboard-friendly interactions
 */

/* =========================================
   MOBILE SIDEBAR
========================================= */

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

if (menuButton && sidebar) {
    menuButton.addEventListener("click", function () {

        const isOpen = sidebar.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });
}

/* =========================================
   ACTIVITY MODAL
========================================= */

const activityModal = document.getElementById("activityModal");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const cancelModalButton = document.getElementById("cancelModalButton");
const activityForm = document.getElementById("activityForm");

function closeDialog(dialog) {
    if (dialog && dialog.open) {
        dialog.close();
    }
}

if (openModalButton && activityModal) {

    openModalButton.addEventListener("click", function () {

        activityModal.showModal();

        const activityName =
            document.getElementById("activityName");

        if (activityName) {
            activityName.focus();
        }

    });
}

if (closeModalButton) {

    closeModalButton.addEventListener("click", function () {
        closeDialog(activityModal);
    });

}

if (cancelModalButton) {

    cancelModalButton.addEventListener("click", function () {
        closeDialog(activityModal);
    });

}

if (activityForm) {

    activityForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!activityForm.checkValidity()) {

            activityForm.reportValidity();

            return;
        }

        alert("Activity created successfully.");

        activityForm.reset();

        closeDialog(activityModal);

    });

}

/* =========================================
   USER MODAL
========================================= */

const userModal = document.getElementById("userModal");
const openUserModal = document.getElementById("openUserModal");
const closeUserModal = document.getElementById("closeUserModal");
const cancelUserModal = document.getElementById("cancelUserModal");
const userForm = document.getElementById("userForm");
const quickAddUser = document.getElementById("quickAddUser");

function openUserDialog() {

    if (!userModal) {
        return;
    }

    userModal.showModal();

    const fullName =
        document.getElementById("fullName");

    if (fullName) {
        fullName.focus();
    }
}

if (openUserModal) {

    openUserModal.addEventListener(
        "click",
        openUserDialog
    );

}

if (quickAddUser) {

    quickAddUser.addEventListener(
        "click",
        openUserDialog
    );

}

if (closeUserModal) {

    closeUserModal.addEventListener(
        "click",
        function () {
            closeDialog(userModal);
        }
    );

}

if (cancelUserModal) {

    cancelUserModal.addEventListener(
        "click",
        function () {
            closeDialog(userModal);
        }
    );

}

if (userForm) {

    userForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!userForm.checkValidity()) {

                userForm.reportValidity();

                return;
            }

            alert("User created successfully.");

            userForm.reset();

            closeDialog(userModal);

        }
    );

}

/* =========================================
   USER SEARCH
========================================= */

const userSearch = document.getElementById("userSearch");
const usersTable = document.getElementById("usersTable");

if (userSearch && usersTable) {

    userSearch.addEventListener(
        "input",
        function () {

            const searchTerm =
                userSearch.value
                    .toLowerCase()
                    .trim();

            const rows =
                usersTable.querySelectorAll(
                    "tbody tr"
                );

            rows.forEach(function (row) {

                const rowText =
                    row.textContent
                        .toLowerCase();

                const matches =
                    rowText.includes(searchTerm);

                row.hidden = !matches;

            });

        }
    );

}

/* =========================================
   REPORT FORM
========================================= */

const reportForm =
    document.getElementById("reportForm");

if (reportForm) {

    reportForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!reportForm.checkValidity()) {

                reportForm.reportValidity();

                return;
            }

            alert(
                "Your report has been queued successfully."
            );

            reportForm.reset();

        }
    );

}

/* =========================================
   PROFILE FORM
========================================= */

const profileForm =
    document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!profileForm.checkValidity()) {

                profileForm.reportValidity();

                return;
            }

            alert(
                "Your profile settings have been saved."
            );

        }
    );

}

/* =========================================
   ESCAPE KEY SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }

        if (
            activityModal &&
            activityModal.open
        ) {
            activityModal.close();
        }

        if (
            userModal &&
            userModal.open
        ) {
            userModal.close();
        }

    }
);
```
