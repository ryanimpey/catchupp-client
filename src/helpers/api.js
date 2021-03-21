import Constants from "expo-constants";
const { manifest } = Constants;

const ENV = {
    dev: {
        apiUrl: "https://catchupp-server.herokuapp.com",
    },
    staging: {
        apiUrl: "https://api.catchupp.co",
    },
    prod: {
        apiUrl: "https://api.catchupp.co",
    },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.dev;
    } else if (env === "staging") {
        return ENV.staging;
    } else if (env === "prod") {
        return ENV.prod;
    } else {
        return ENV.prod;
    }
};

export const API_ROUTE = getEnvVars().apiUrl;

export const USER_LOGIN = `${API_ROUTE}/auth/login`;
export const USER_LOGOUT = `${API_ROUTE}/auth/logout`;
export const USER_PROFILE = `${API_ROUTE}/account`;
export const USER_OTHER_PROFILE = id => `${API_ROUTE}/account/${id}`;
export const USER_REFRESH = `${API_ROUTE}/auth/refresh`;
export const USER_REGISTER = `${API_ROUTE}/auth/register`;
export const USER_UPLOAD_AVATAR = `${API_ROUTE}/upload/avatar`;
export const LIST_COUNTRIES = `${API_ROUTE}/lists/countries`;

export const RELATIONSHIPS_FOLLOWERS = `${API_ROUTE}/relationships/followers`;
export const RELATIONSHIPS_FOLLOWERS_USER = id => `${API_ROUTE}/relationships/followers/${id}`;
export const RELATIONSHIPS_FOLLOWING = `${API_ROUTE}/relationships/following`;
export const RELATIONSHIPS_FOLLOWING_USER = id => `${API_ROUTE}/relationships/following/${id}`;
export const RELATIONSHIPS_FOLLOW = id => `${API_ROUTE}/relationships/follow/${id}`;

export const NOTIFICATIONS = `${API_ROUTE}/notification`;
export const NOTIFICATIONS_CREATE = id => `${API_ROUTE}/notification/${id}`;
export const NOTIFICATIONS_DELETE = id => `${API_ROUTE}/notification/${id}`;

export const REPORT_POST = id => `${API_ROUTE}/report/post/${id}`;

export const POSTS = `${API_ROUTE}/post`;
export const POSTS_USER = id => `${API_ROUTE}/post/user/${id}`;
export const POST = id => `${API_ROUTE}/post/${id}`;
export const POST_LIKE = id => `${API_ROUTE}/post/likes/${id}`;
export const POSTS_RECENT = `${API_ROUTE}/post/latest`;

export const COMMENT = id => `${API_ROUTE}/comment/${id}`;

export const LIKES = id => `${API_ROUTE}/likes/${id}`;
export const GOOGLE_AUTH_ENDPOINT = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://api.skippermyboat.com/auth/callback/google&scope=profile%20email&client_id=604745585227-4qp2klvcbrvh1qchgdjd39pm7ebgd1fo.apps.googleusercontent.com&response_type=code`;

export default getEnvVars;
