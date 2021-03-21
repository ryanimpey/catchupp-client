import React, { PureComponent } from "react";
import { Text, SafeAreaView, Image, View, Alert } from "react-native";
import { AuthSession } from "expo";
import { Text as RNText, Divider } from "react-native-elements";
import { Formik } from "formik";
import { login } from "../styles/login";
import { accountSchema } from "../schemas";
import LoginForm from "../components/formik/LoginForm";
import { USER_LOGIN, USER_PROFILE } from "../helpers/api";
import { getToken } from "../helpers";
import { bindActionCreators } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/user";
import { Axios, makePostRequest } from "../helpers/requests";
import config from "../styles/config";
import EditAccountForm from "../components/formik/EditAccountForm";

const EditScreen = ({ navigation }) => {
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();

    function updateAccount({ username, displayName, description }, actions) {
        makePostRequest(USER_PROFILE, { displayName, description, username })
            .then(({ data }) => dispatch(loginUser(data)))
            .catch(err => console.log(err))
            .finally(() => {
                actions.setSubmitting(false);
                return Alert.alert("Sucess!", "Account updating was successful.")
            });
    }

    return (
        <SafeAreaView style={[login.container, { marginVertical: config.spacing.half }]}>
            <Formik validationSchema={accountSchema} component={EditAccountForm} initialValues={account} onSubmit={updateAccount} />
            <Divider style={{ marginVertical: 10 }} />
            <View style={login.inputContainer}></View>
        </SafeAreaView>
    );
};

EditScreen.navigationOptions = {
    title: "Edit Account",
};

export default EditScreen
