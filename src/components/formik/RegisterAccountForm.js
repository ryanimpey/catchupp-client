import React from "react";
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Modal, SafeAreaView, Dimensions, Picker, Alert, TextInput } from "react-native";
import { login } from "../../styles/login";
import { Button } from "react-native-elements";
import { why_country_string } from "../../helpers/strings";
import { TextInput as CustomTextInput, CountryPickerInput } from "../../components/TinyAdditions";
import globalStyles from "../../styles/global";
import { Keyboard } from "react-native";

const { width } = Dimensions.get("window");

export default ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setTouched,
    setFieldValue,
    isSubmitting,
    isModalVisible,
    countries,
    ...props
}) => {
    const _updatePicker = itemValue => {
        if (itemValue === "GB" || itemValue === "US") {
            setFieldValue("countryCode", itemValue);
            setFieldValue("countryName", itemValue === "US" ? "United States of America" : "United Kingdom");
            return;
        }
        setFieldValue("countryCode", itemValue);
        // let result = countries.find(country => country.code === itemValue);
        // if (!!result && result.name) {
        //     setFieldValue("countryName", result.name);
        // }
    };

    const _whyCountryAlert = () => Alert.alert("Why do we need this?", why_country_string);
    return (
        <KeyboardAvoidingView>
            <CustomTextInput
                onSubmitEditing={() => Keyboard.dismiss}
                onBlur={() => setTouched({ ...touched, firstName: true })}
                onChangeText={text => setFieldValue("firstName", text)}
                label="First Name"
                placeholderSameAsLabel={true}
                required={true}
                value={values.firstName}
                error={touched.firstName && errors.firstName && errors.firstName}
            />
            <CustomTextInput
                onSubmitEditing={() => Keyboard.dismiss}
                onBlur={() => setTouched({ ...touched, lastName: true })}
                onChangeText={text => setFieldValue("lastName", text)}
                label="Last Name"
                placeholderSameAsLabel={true}
                required={true}
                value={values.lastName}
                error={touched.lastName && errors.lastName && errors.lastName}
            />
            <CustomTextInput
                autoCapitalize="none"
                autoCompleteType="email"
                onSubmitEditing={() => Keyboard.dismiss}
                onBlur={() => setTouched({ ...touched, email: true })}
                onChangeText={text => setFieldValue("email", text)}
                label="Email Address"
                placeholderSameAsLabel={true}
                required={true}
                value={values.email}
                error={touched.email && errors.email && errors.email}
            />
            <CustomTextInput
                onSubmitEditing={() => Keyboard.dismiss}
                onBlur={() => setTouched({ ...touched, username: true })}
                onChangeText={text => setFieldValue("username", text)}
                label="Username"
                placeholderSameAsLabel={true}
                required={true}
                value={values.username}
                error={touched.username && errors.username && errors.username}
            />
            <CustomTextInput
                autoCapitalize="none"
                autoCompleteType="password"
                onSubmitEditing={() => Keyboard.dismiss}
                onBlur={() => setTouched({ ...touched, password: true })}
                onChangeText={text => setFieldValue("password", text)}
                label="Password (7+ characters)"
                placeholder="Password"
                required={true}
                secure={true}
                value={values.password}
                error={touched.password && errors.password && errors.password}
            />
            <CountryPickerInput
                required
                label="Country of Residence"
                onLabelPress={_whyCountryAlert}
                onPress={() => props.toggleModal()}
                value={values.countryName}
            />
            <Button
                loading={isSubmitting}
                title="Create account"
                onPress={handleSubmit}
                buttonStyle={login.buttonLocal}
            />
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => this.setState({ isModalVisible: false })}>
                <SafeAreaView
                    style={{
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: "white",
                        width,
                        borderTopWidth: 1,
                        borderTopColor: "#C7C7C7",
                    }}
                >
                    <View style={{ display: "flex", alignItems: "center" }}>
                        <Text style={[globalStyles.sectionTitle, globalStyles.paddingTopTwenty]}>Select a country</Text>
                        <Picker style={{ width: "100%" }} selectedValue={values.countryCode} onValueChange={_updatePicker}>
                            <Picker.Item label="United States of America" value="US" />
                            <Picker.Item label="United Kingdom" value="GB" />
                            {countries.map(({ code, name }) => (
                                <Picker.Item key={code} label={name} value={code} />
                            ))}
                        </Picker>
                    </View>
                    <View style={[globalStyles.paddingBottomFourty, globalStyles.paddingHorizontalFourty]}>
                        <Button
                            buttonStyle={{ backgroundColor: "#21A0CC", borderRadius: 5, height: 45 }}
                            title="Confirm"
                            onPress={() => props.toggleModal()}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </KeyboardAvoidingView>
    );
};
