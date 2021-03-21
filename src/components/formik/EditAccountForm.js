import React from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { login } from "../../styles/login";
import { Button } from "react-native-elements";

const EditAccountForm = ({ handleSubmit, handleChange, handleBlur, values, errors, touched, setTouched, setFieldValue, isSubmitting, ...props }) => {
    console.log('Errors', errors);
    
    return (
        <KeyboardAvoidingView>
            <View style={login.inputContainer}>
                <Text style={login.textLabel}>Display Name</Text>
                <TextInput
                    autoCapitalize="characters"
                    autoCompleteType="name"
                    onFocus={() => setTouched({ ...touched, displayName: true })}
                    onChangeText={text => setFieldValue("displayName", text)}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    underlineColorAndroid="transparent"
                    placeholder="Display Name"
                    style={login.textInput}
                    value={values.displayName}
                />
                <View style={login.errorMessageContainer}>{touched.email && errors.email && <Text style={login.errorMessage}>{errors.email}</Text>}</View>
            </View>
            <View style={login.inputContainer}>
                <Text style={login.textLabel}>Description</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    onSubmitEditing={handleSubmit}
                    secureTextEntry
                    autoCapitalize="none"
                    style={login.textInput}
                    placeholder="Description"
                    underlineColorAndroid="transparent"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    onChangeText={text => setFieldValue("description", text)}
                    onFocus={() => setTouched({ ...touched, description: true })}
                    value={values.description}
                />
                <View style={login.errorMessageContainer}>{touched.password && errors.password && <Text style={login.errorMessage}>{errors.password}</Text>}</View>
            </View>
            <View style={{ ...login.inputContainer, marginBottom: 0 }}>
                <Button
                    raised
                    loading={isSubmitting}
                    title="Update Account"
                    onPress={handleSubmit}
                    buttonStyle={login.buttonLocal}
                />
            </View>
        </KeyboardAvoidingView>
    )
};

export default EditAccountForm;
