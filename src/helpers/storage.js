import { isValidJSON, isValidStringify } from "./index";

// prefixes value onto storage keys to ensure third parties don't override our storage
const format = name => {
    const prefix = `skipper_my_boat`;

    if (process.env.REACT_APP_API_LOCAL === "true") {
        return `${prefix}_local_${name}`;
    }

    if (process.env.REACT_APP_API_STAGING === "true") {
        return `${prefix}_staging_${name}`;
    }

    return `${prefix}-${name}`;
};

// remove old storage for hardcoded domains (no longer supported) - can remove this from 12th January 2019
const removeOldCookies = name => {
    if (name === "token") {
        document.cookie = "token=; path=/; domain=skippermyboat.com; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    }

    if (name === "refresh_token") {
        document.cookie = "refresh_token=; path=/; domain=skippermyboat.com; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    }
};

const removeOldLocalStorage = name => {
    if (name === "user") {
        localStorage.removeItem("user");
    }
};

export function bakeSessionStorage(name, value) {
    sessionStorage.setItem(format(name), value);
}

export function readSessionStorage(name) {
    return sessionStorage.getItem(format(name));
}

export function deleteSessionStorage(name) {
    sessionStorage.removeItem(format(name));
}

export function bakeLocalStorage(name, value) {
    removeOldLocalStorage(name);

    localStorage.setItem(format(name), isValidStringify ? JSON.stringify(value) : value);
}

export const readLocalStorage = name => {
    let value = localStorage.getItem(format(name));
    return typeof value === "string" && isValidJSON(value) ? JSON.parse(value) : value;
}

export function deleteLocalStorage(name) {
    return localStorage.removeItem(format(name));
}

export function bakeCookie(name, value, date) {
    const expiry = date instanceof Date ? `expires=${date};` : "";
    document.cookie = `${format(name)}=${JSON.stringify(value)};${expiry}path=/`;
}

export function readCookie(name) {
    let value = "; " + document.cookie;
    const parts = value.split("; " + format(name) + "=");

    removeOldCookies(name);

    value =
        parts.length === 2
            ? parts
                  .pop()
                  .split(";")
                  .shift()
            : null;

    return value ? (isValidJSON(value) ? JSON.parse(value) : value) : null;
}

export function deleteCookie(name) {
    document.cookie = `${format(name)}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/`;
}
