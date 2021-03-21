/**
 * Takes in a stringified token data which is then extracted into real user data and passed through to redux to be stored as local storage and token cookies
 * @param {*} user
 */

import { Alert } from "react-native";
import { getUserFromToken } from "../helpers/auth";
import { removeToken } from "./device";
import { makeGetRequest } from "../helpers/requests";
import { USER_LOGOUT } from "../helpers/api";

// Sends a login request to the API to retrieve user data from a value JSON token
export function loginUser(data) {
    // Return function with dispatch passed in from redux-thunk
    return async dispatch => {
        try {
            // Retrieve user data from the API using our JSON token
            const payload = await getUserFromToken(data);

            // Dispatch a Login event providing our redux store with user info in the payload
            return dispatch({
                type: "USER_LOGIN",
                payload,
            });
        } catch (error) {
            console.log(error);
            // Report an error to the user if we fail to retrieve user details from the API
            Alert.alert("Login Error", "Encountered an error logging you in");
        }
    };
}

// Sends a logout request to the API before disconnecting to remove any saved device links
export function logoutUser() {
    // Return function with dispatch passed in from redux-thunk
    return async dispatch => {
        try {
            // Make a GET request to the logout endpoint
            await makeGetRequest(USER_LOGOUT);

            // Logout a user and delete any cookies related to sign in
            return dispatch({
                type: "USER_LOGOUT",
            });
        } catch (error) {
            // We could catch this event with sentry if we had it installed
        }
    };
}

// Update the user credentials in our store dependent on whether a user object already exists
export function updateUser(user) {
    // If no user exists, attempt to retrieve data from our API using a valid JSON token
    if (!user) {
        // Return function with dispatch passed in from redux-thunk
        return async dispatch => {
            try {
                // Retrieve a user object from our API request
                const { user: payload } = await getUserFromToken();

                // Update the user in our redux store using the retrieved user object
                return dispatch({
                    type: "USER_UPDATE_FROM_TOKEN",
                    payload,
                });
            } catch (error) {
                // Report an error to the user if we fail to retrieve user details from the API
                Alert.alert("Update Error", "Encountered an error updating your user");
            }
        };
    }

    // If we already have a valid user object we can just pass it through to the store without another request
    return {
        type: "USER_UPDATE",
        payload: user,
    };
}
