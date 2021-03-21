import md5 from "md5";
import axios from "axios";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from 'expo-notifications'
import { store } from "../store";
import { setToken } from "../actions/device";

export const defaultGravatar = `https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=256&d=identicon&r=PG`;
export const cdnAvatarDest = `https://cdn.skippermyboat.com/avatar`;
export const gravatarDest = `https://www.gravatar.com/avatar`;
export const gravatarIdenticon = `?s=256&d=identicon&r=PG`;
export const mapboxPlacesUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
export const BOOKING_FEE = 0.133; // Booking fee to add on top of boat cost

export const getUserAvatar = user => `https://www.gravatar.com/avatar/${user?.gravatar ?? null}?s=256&d=identicon&r=PG`;

export const handleError = error => {
    console.log({ "Error!": error });
};

export const getToken = async () => {
    try {
        const currentToken = store.getState().device.token;
        if (currentToken) return currentToken;
        // ask for push notifications permission, if not already granted
        if (Constants.isDevice && !currentToken) {
            let pushNotificationsGranted = false;

            const { status: getAsyncStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

            pushNotificationsGranted = getAsyncStatus;

            // pushNotifications not initially granted, ask for permission
            if (pushNotificationsGranted !== "granted") {
                const { status: askAsyncStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                pushNotificationsGranted = askAsyncStatus;
            }

            // user granted permission
            if (pushNotificationsGranted === "granted") {
                // has permission, set redux state with device token and permission state
                let token = await Notifications.getExpoPushTokenAsync();
                await store.dispatch(setToken(token));
                return token;
            }
        }
    } catch (error) {
        handleError(error);
    }
};

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return new Promise(function(resolve, reject) {
            if (!error.response) {
                return resolve(error);
            }

            if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
                let account = store.getState().account;
                let obj = {
                    email: account.email,
                    userId: account._id,
                };
                fetch(USER_REFRESH, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + account.refresh_token,
                    },
                    body: JSON.stringify(obj),
                })
                    .then(response => response.json())
                    .then(response => {
                        let user = { ...account, access_token: response.access_token };
                        store.dispatch(accountUpdate(user));
                        error.config.headers.Authorization = "Bearer " + response.access_token;
                        axios(error.config).then(resolve, reject);
                    })
                    .catch(postError => reject(postError));
            } else {
                resolve(error);
            }
        });
    },
);

export function makeUserObject(values) {
    return {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        displayName: `${values.firstName} ${values.lastName}`,
        username: String(values.username).toLowerCase(),
        email: String(values.email).toLowerCase(),
        locale: {
            countryCode: values.countryCode,
        },
    };
}