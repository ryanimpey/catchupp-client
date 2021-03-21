import React from "react";
import { Text, SafeAreaView, Image, View, Alert } from "react-native";
import { AuthSession } from "expo";
import { Text as RNText, Divider } from "react-native-elements";
import { Formik } from "formik";
import { login } from "../styles/login";
import { loginSchema } from "../schemas";
import LoginForm from "../components/formik/LoginForm";
import { USER_LOGIN, GOOGLE_AUTH_ENDPOINT } from "../helpers/api";
import { getToken } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/user";
import { Axios } from "../helpers/requests";

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const device = useSelector(state => state.device);

    // Sign the user in via Google OAuth
    async function attemptGoogleSignIn() {
        await AuthSession.startAsync({
            authUrl: GOOGLE_AUTH_ENDPOINT,
        });
    }

    // Sign the user in using a local authentication method
    async function attemptLocalSignIn(values, actions) {
        try {
            // Get a token if our device doesn't have one
            let token = device.token ?? (await getToken());

            // Retrieve data from our login attempt
            const { data } = await Axios.post(USER_LOGIN, {
                ...values,
                email: String(values.email).toLowerCase(),
                exponentPushToken: token?.data ?? null,
            });

            // If no data was returned from our request throw an error
            if (!data) {
                throw "Failed to retrieve authentication credentials";
            }

            // Authenticate the user and redirect the user to the homepage
            await dispatch(loginUser(data));
            navigation.navigate("Home");
        } catch (error) {
            console.log("LOGIN_SCREEN:", error);
            actions.setSubmitting(false);
            Alert.alert("Failed to sign in", "Please check your details and try again");
        }
    }

    return (
        <SafeAreaView style={login.container}>
            <Image style={login.logo} source={require("../static/icon-alt.png")} />
            <RNText h4 style={login.heading1}>
                Welcome back
            </RNText>
            <Formik validationSchema={loginSchema} component={LoginForm} onSubmit={attemptLocalSignIn} />
            <Divider style={{ marginVertical: 10 }} />
            <View style={login.inputContainer}>
                <View style={{ marginBottom: 15 }}>
                    <Text style={login.textSmall}>
                        Need help logging in?
                        <Text style={login.textLink}>&nbsp;Forgot password.</Text>
                    </Text>
                </View>
                <View>
                    <Text style={login.textSmall}>
                        Don't have an account?
                        <Text onPress={() => navigation.navigate("Register")} style={login.textLink}>
                            &nbsp;Sign Up
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
