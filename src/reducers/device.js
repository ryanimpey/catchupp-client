const initialState = { token: null, ip: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOKEN": {
            return { ...state, token: action.payload };
        }
        case "USER_LOGOUT": {
            return { ...state, token: null };
        }
        case "REMOVE_TOKEN": {
            return { ...state, token: null };
        }
    }

    return state;
};
