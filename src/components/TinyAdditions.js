import React from "react";
import { WebBrowser } from "expo";
import DatePicker from "@react-native-community/datetimepicker";
import { View, Text, TextInput as ReactNativeTextInput, TouchableOpacity } from "react-native";
import globalStyles from "../styles/global";
import list_item from "../styles/list_item";
import display from "../styles/display";
import _startCase from "lodash/startCase";

export const PaddedView = ({ children, paddingVertical = true }) => (
    <View style={[globalStyles.paddingHorizontalFourty, paddingVertical && globalStyles.paddingVerticalTwenty]}>{children}</View>
);

export const ListItem = ({
    isTrue = true,
    textTrue = "",
    textFalse = "",
}) => (
    <View style={list_item.container}>
        <Text style={[globalStyles.textDark, list_item.text]}>{isTrue ? textTrue : textFalse}</Text>
    </View>
);

export const TextInput = ({
    required = false,
    label = "",
    placeholder = "",
    onChangeText = null,
    defaultValue = null,
    value = null,
    placeholderSameAsLabel = false,
    onFocus = null,
    multiline = false,
    error = null,
    secure = false,
    onBlur = null,
    onSubmitEditing = null,
    ...props
}) => (
    <View style={globalStyles.textInputContainer}>
        <View style={[display.flex, display.flexDirectionRow]}>
            <Text style={[globalStyles.textDark, globalStyles.paddingBottomFive]}>{label}</Text>
            {required && <Text style={[globalStyles.textDark, globalStyles.requiredLabel]}>*</Text>}
        </View>
        <ReactNativeTextInput
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholderSameAsLabel ? label : placeholder}
            underlineColorAndroid="transparent"
            onChangeText={onChangeText}
            defaultValue={defaultValue}
            value={value}
            blurOnSubmit={true}
            multiline={multiline}
            onFocus={onFocus}
            secureTextEntry={secure}
            onBlur={onBlur}
            style={[globalStyles.textInput, globalStyles.textDark, multiline && globalStyles.textInputMultiline]}
            {...props}
        />
        {error && <Text style={[globalStyles.textDark, globalStyles.paddingTopTen, { color: "red" }]}>{_startCase(error)}</Text>}
    </View>
);

export const DatePickerInput = ({ required = false, label = "", error = null, ...props }) => (
    <View style={globalStyles.datePickerContainer}>
        <View style={[display.flex, display.flexDirectionRow]}>
            <Text style={[globalStyles.textDark, globalStyles.paddingBottomFive]}>{label}</Text>
            {required && <Text style={[globalStyles.textDark, globalStyles.requiredLabel]}>*</Text>}
        </View>
        <DatePicker {...props} style={[globalStyles.datePickerInput]} customStyles={{ dateInput: { borderWidth: 0 }, dateText: globalStyles.textDark }} />
        {error && <Text style={[globalStyles.textDark, globalStyles.paddingTopTen, { color: "red" }]}>{_startCase(error)}</Text>}
    </View>
);

export const CountryPickerInput = ({ required = false, onLabelPress = null, label = "", labelPressText = "Why?", onPress = null, value, error = null }) => (
    <View style={globalStyles.textInputContainer}>
        <View style={[display.flex, display.flexDirectionRow]}>
            <Text style={[globalStyles.textDark, globalStyles.paddingBottomFive]}>{label}</Text>
            {required && <Text style={[globalStyles.textDark, globalStyles.requiredLabel]}>*</Text>}
            <Text style={[globalStyles.textDark, globalStyles.requiredLabel2, globalStyles.paddingLeftTen]} onPress={onLabelPress}>
                {labelPressText}
            </Text>
        </View>
        <Text onPress={onPress} style={[globalStyles.textInputDropDown, globalStyles.textDark]}>
            {value}
        </Text>
        {error && <Text style={[globalStyles.textDark, globalStyles.paddingTopTen, { color: "red" }]}>{_startCase(error)}</Text>}
    </View>
);

export const TextLink = ({ url, text = null, children }) => (
    <TouchableOpacity onPress={async () => await WebBrowser.openBrowserAsync(url)}>
        <Text style={[globalStyles.textLink, globalStyles.paddingVerticalFive]}>{text || children}</Text>
    </TouchableOpacity>
);