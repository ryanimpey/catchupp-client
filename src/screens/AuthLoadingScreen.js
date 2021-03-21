import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getToken, handleError } from "../helpers";
import Loader from "../components/Loader";

const AuthLoadingScreen = ({ navigation, setToken }) => {
    const [account, device] = useSelector(state => [state.account, state.device]);
    console.log("AuthLoadingScreen:", account, device);

    useEffect(() => {
        (async () => {
            try {
                navigation.navigate(account ? "App" : "Auth");
            } catch (error) {
                handleError(error);
            }
        })();
    }, []);

    // TODO: Add a spinner!
    return <Loader />;
};

export default AuthLoadingScreen;
