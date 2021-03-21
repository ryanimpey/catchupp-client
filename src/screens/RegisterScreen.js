import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, Alert, View, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";
import { registerSchema } from "../schemas";
import RegisterAccountForm from "../components/formik/RegisterAccountForm";
import { handleError, makeUserObject } from "../helpers";
import { LIST_COUNTRIES, USER_REGISTER, USER_PROFILE, USER_LOGIN } from "../helpers/api";
import LoadingView from "../components/LoadingView";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/user";
import TitleLarge from "../components/TitleLarge";
import { makeGetRequest, makePostRequest } from "../helpers/requests";
import Axios from "axios";

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [countries, setCountries] = useState([]);

    const onModalChange = () => setModalVisible(!isModalVisible);

    useEffect(() => {
        makeGetRequest(LIST_COUNTRIES)
            .then(response => {
                let countries = response.data.filter(value => value.code !== "US" && value.code !== "GB");
                setLoading(false) && setCountries(countries);
            })
            .catch(error => {
                Alert.alert("Error loading page", "Encountered an error loading all needed data. Please try again");
                navigation.goBack();
                handleError(error);
            });
    }, []);

    function onSubmit(values, actions) {
        // Make user data into an object the server can process
        const formData = makeUserObject(values);

        // Initialise User Object to store JSON response
        let user = {};

        makePostRequest(USER_REGISTER, formData)
            .then(({ data }) => {
                // Data is an object of JSON Token information
                console.log("Data Example", data.expires_in);

                // Store the tokens provided in data in the user object
                user = { ...data };

                // Make a chained request to get User information
                const authorization = `Bearer ${data.access_token}`;
                console.log("Auth Token:", authorization);
                return Axios.get(USER_PROFILE, { headers: { Authorization: authorization } });
            })
            .then(({ data }) => {
                // Update user to include the new user response data
                user = { ...user, ...data };
                // Update Redux store with user info
                dispatch(loginUser(user));
                // Navigate user to the homepage after 500ms so we don't encounter a race condition with the store
                setTimeout(() => {
                    Alert.alert("Account Created", "Your account has been created successfully. Welcome to Catchupp!");
                    navigation.navigate("Home");
                }, 500);
            })
            .catch(error => {
                console.log("Error Creating User:", error);
                handleError(error);
                actions.setSubmitting(false);
                Alert.alert("Failed to create account", "We encountered an error creating your account. Please try again.");
            });
    }

    if (isLoading) {
        return <LoadingView />;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TitleLarge title="Create an account" subtitle="Let's get started!" />
                <View>
                    <Formik
                        initialValues={{ countryName: "Select a country" }}
                        validationSchema={registerSchema}
                        render={props => <RegisterAccountForm {...props} isModalVisible={isModalVisible} toggleModal={onModalChange} countries={countries} />}
                        onSubmit={onSubmit}
                    />

                    <Text style={{ padding: 20 }}>
                        By signing up with CatchUpp you agree to our&nbsp;
                        <Text style={styles.link} onPress={() => Linking.openURL("https://catchupp.co/privacy-policy.html")}>
                            terms of service
                        </Text>
                        &nbsp;and&nbsp;
                        <Text style={styles.link} onPress={() => Linking.openURL("https://catchupp.co/privacy-policy.html")}>
                            privacy policy
                        </Text>
                        .
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    link: {
        color: "#02315D",
    },
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
});

export default RegisterScreen;
