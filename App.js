import React, { useEffect } from "react";
import { persistor, store } from "./src/store.js";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Navigator from "./src/Navigator";
import { usePrevious } from "./src/helpers/hooks";
import { navigate } from "./src/helpers/navigator";
import Loader from "./src/components/Loader";
import { getToken } from "./src/helpers";


const App = ({ account }) => {
    useEffect(() => {
        (async () => {
            // sets the device token / asks for permissions
            await getToken();
        })();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loader />}>
                <AppWithRedux />
            </PersistGate>
        </Provider>
    );
};

const AppWithRedux = connect(({ account }) => ({ account }))(({ account }) => {
    const prevAccount = usePrevious(account);

    useEffect(() => {
        // no longer an account, user was logged out (intentionally or token expired)
        if (prevAccount && !account) {
            navigate("Login");
        }
    }, [account]);

    return <Navigator />;
});

export default App;
