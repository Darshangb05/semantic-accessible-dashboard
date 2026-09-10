import {
    saveUser,
    getUser,
    logoutUser
} from "./storage.js";

export function loginUser(email, password) {

    if (!email || !password) {
        return {
            success: false,
            message: "Please enter email and password."
        };
    }

    if (password.length < 4) {
        return {
            success: false,
            message: "Password must contain at least 4 characters."
        };
    }

    const user = {
        name: email.split("@")[0],
        email: email,
        loggedIn: true,
        loginTime: new Date().toISOString()
    };

    saveUser(user);

    return {
        success: true,
        user
    };
}

export function getCurrentUser() {
    return getUser();
}

export function logout() {
    logoutUser();
}

export function requireLogin() {

    const user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return false;
    }

    return true;
}