import AxiosLibrary from "axios";
import moment from "moment";

import { readCookie } from "./storage";
import { store } from "../store";
import { logoutUser, updateUser } from "../actions/user";
import { USER_REFRESH } from "./api";
import { handleError } from "./index";

export const Axios = AxiosLibrary.create();
const AxiosErrorInstance = AxiosLibrary.create();

export async function makeGetRequest(url, config = {}) {
    const account = store.getState().account;
    const token = account && account.token;
    const authorization = token ? { Authorization: "Bearer " + token } : {};

    return new Promise((resolve, reject) => {
        Axios.get(url, { headers: authorization, timeout: 15000, ...config })
            .then(response => {
                //console.log("REQUESTED", { url, response });
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function makePostRequest(url, data, headers = {}) {
    const account = store.getState().account;
    const token = account && account.token;
    const authorization = token ? { Authorization: "Bearer " + token } : {};
    // Set this just to keep all data passed through immutable incase wanted;
    //const _data = data;
    // Create a promise that creates a POST request to the api
    return new Promise((resolve, reject) => {
        Axios.post(url, data, {
            headers: { ...authorization, ...headers },
            timeout: 15000,
        })
            .then(response => {
                // If all is good we can resolve this promise and continue
                return resolve(response);
            })
            .catch(error => {
                return reject(error);
            });
    });
}

export function makePutRequest(url, data, headers = {}) {
    const account = store.getState().account;
    const token = account && account.token;
    const authorization = token ? { Authorization: "Bearer " + token } : {};
    return new Promise((resolve, reject) => {
        Axios.put(url, data, {
            headers: { ...authorization, ...headers },
            timeout: 15000,
        })
            .then(response => {
                // If all is good we can resolve this promise and continue
                return resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function makeDeleteRequest(url, data = null, headers = {}) {
    const account = store.getState().account;
    const token = account && account.token;
    const authorization = token ? { Authorization: "Bearer " + token } : {};
    return new Promise((resolve, reject) => {
        Axios.delete(url, { data, headers: { ...authorization, ...headers } })
            .then(response => {
                // If all is good we can resolve this promise and continue
                return resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/* AXIOS REQUESTS */

Axios.interceptors.request.use(config => {
    const account = store.getState().account;

    // prevent a user that no longer has a token from requesting any data (the token expired)
    if (account && account.expiry && moment(account.expiry).isBefore(moment(new Date()))) {
        store.dispatch(logoutUser());

        return {
            ...config,
            cancelToken: new AxiosLibrary.CancelToken(cancel => cancel()),
        };
    }

    return config;
});

// Add a response interceptor
Axios.interceptors.response.use(
    response => response,
    error => {
        return new Promise(async function(resolve, reject) {
            try {
                if (!error.response) {
                    //console.log("NO ERROR RESPONSE", { error });
                    return resolve(error);
                }

                console.info("Encountered an error in the Axios request. Info below");
                console.log(error.response);

                if (error.response.status === 401 && error.response.data && error.response.data.errorName === "FailedToAuthenticateToken") {
                    //console.log("401 FAILED TO AUTHENTICATE TOKEN!");
                    const account = store.getState().account;
                    const refreshToken = account.refreshToken;
                    //console.log("Account ID:", account && account._id);
                    //console.log("Refresh token", account.refreshToken);

                    const { data: userData } = await AxiosErrorInstance.post(
                        USER_REFRESH,
                        {
                            email: account && account.email,
                            userId: account && account._id,
                        },
                        {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        },
                    );
                    //console.log({ userData });
                    const newUser = { user: { ...account }, token: userData.access_token };
                    await store.dispatch(updateUser(newUser));
                    error.config.headers.Authorization = `Bearer ${userData.access_token}`;
                    AxiosErrorInstance(error.config).then(resolve, reject);
                } else {
                    reject(error);
                }
            } catch (error) {
                handleError(error);
                reject(error);
            }
        });
    },
);
