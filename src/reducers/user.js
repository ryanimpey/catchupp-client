// import { AsyncStorage } from "react-native";
import moment from "moment";

export default function(state = null, action) {
  // Retrieve user from stored cookie
  // state = await AsyncStorage.getItem("user");
  let user, userExpiry, data, expiry;

  // Check to see what type of action is being fired
  switch (action.type) {
    case "USER_LOGIN":
      user = action.payload.user;
      userExpiry = moment()
        .add(1, "month")
        .toISOString();

      data = {
        ...user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        expiry: userExpiry
      };

      // await AsyncStorage.setItem("user", data);

      return data;
    case "USER_LOGOUT":
      //console.log("USER_LOGOUT");
      // await AsyncStorage.removeItem("user");
      return null;
    // occurs when a user is logged in in a separate tab, and a request is made back in the old tab (the user still
    // appears as the old one, but the requests go throuh as a new one, this instead forces an update with the new
    // logged in user).
    case "USER_UPDATE_FROM_TOKEN":
      expiry = state && state.expiry;
      // await AsyncStorage.setItem("user", { ...action.payload, expiry });
      return { ...action.payload, expiry };
    case "USER_UPDATE":
      userExpiry = moment()
        .add(1, "month")
        .toISOString();

      const token = action.payload.token || (state && state.token);
      const refreshToken =
        action.payload.refreshToken || (state && state.refreshToken);
      expiry =
        action.payload.token || action.payload.refreshToken
          ? moment()
              .add(1, "month")
              .toISOString()
          : state && state.expiry;

      data = {
        ...(action.payload.user || action.payload),
        token,
        refreshToken,
        expiry
      };

      //console.log("USER_UPDATE", data);

      // await AsyncStorage.setItem("user", data);
      return data;
    default:
      // Return state by default if nothing else is met
      return state;
  }
}
