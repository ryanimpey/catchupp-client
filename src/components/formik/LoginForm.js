import React from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { login } from "../../styles/login";
import { Button } from "react-native-elements";

const LoginForm = ({ handleSubmit, handleChange, handleBlur, values, errors, touched, setTouched, setFieldValue, isSubmitting, ...props }) => (
    <KeyboardAvoidingView>
        <View style={login.inputContainer}>
            <Text style={login.textLabel}>Email address</Text>
            <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                onFocus={() => setTouched({ ...touched, email: true })}
                onChangeText={text => setFieldValue("email", text)}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                underlineColorAndroid="transparent"
                placeholder="Email address"
                style={login.textInput}
            />

            <View style={login.errorMessageContainer}>{touched.email && errors.email && <Text style={login.errorMessage}>{errors.email}</Text>}</View>
        </View>
        <View style={login.inputContainer}>
            <Text style={login.textLabel}>Password</Text>
            <TextInput
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                secureTextEntry
                autoCapitalize="none"
                style={login.textInput}
                placeholder="Password"
                autoCompleteType="password"
                underlineColorAndroid="transparent"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={text => setFieldValue("password", text)}
                onFocus={() => setTouched({ ...touched, password: true })}
            />

            <View style={login.errorMessageContainer}>{touched.password && errors.password && <Text style={login.errorMessage}>{errors.password}</Text>}</View>
        </View>
        <View style={{ ...login.inputContainer, marginBottom: 0 }}>
            <Button
                raised
                loading={isSubmitting}
                title="Sign in"
                onPress={handleSubmit}
                buttonStyle={login.buttonLocal}
            />
        </View>
    </KeyboardAvoidingView>
);

export default LoginForm;
