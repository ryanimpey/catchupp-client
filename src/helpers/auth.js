import Axios from "axios";

import { USER_PROFILE, USER_REFRESH } from "./api";
import { updateUser } from "../actions/user";
// import { errorMessage } from "./index";
import { makeGetRequest } from "./requests";
import { readCookie, readLocalStorage } from "./storage";
import { store } from "../store";

// Returns an updated user with new tokens, automatically updates user object
// Useful for when user permissions change, or access token expires
export const updateUserFromNewToken = async (data = {}) => {
    try {
        const originalUser = readLocalStorage("user");
        const { data: tokens } = await Axios.post(
            USER_REFRESH,
            {
                email: data.email || originalUser.email,
                userId: data.userId || originalUser._id,
            },
            {
                headers: {
                    Authorization: "Bearer " + (data.refreshToken || readCookie("refresh_token")),
                },
            },
        );

        const { data: user } = await Axios.get(USER_PROFILE, {
            headers: { Authorization: "Bearer " + tokens.access_token },
        });
        store.dispatch(
            updateUser({
                user,
                token: tokens.access_token,
                refreshToken: tokens.refresh_token,
            }),
        );
        return {
            user,
            token: tokens.access_token,
            refreshToken: tokens.refresh_token,
        };
    } catch (error) {
        throw error;
    }
};

// Returns a user from given tokens
// Useful for when a user logs in
export const getUserFromToken = async (data = {}) => {
    console.log("Data from getUserFromToken:", data);
    try {
        const account = store.getState().account;
        let token = data.access_token || account.token;
        let refreshToken = data.refresh_token || account.refresh_token;

        const { data: user } = await makeGetRequest(USER_PROFILE, {
            headers: { Authorization: "Bearer " + token },
        });

        return {
            user,
            token,
            refreshToken,
        };
    } catch (error) {
        // errorMessage(`${error.response.status}: ${error.response.data}`);
        throw error;
    }
};
