import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { login } from "../../styles/login";
import { CheckBox } from "react-native-elements";
import DatePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";

const PostForm = ({ handleSubmit, handleChange, handleBlur, values, errors, touched, setTouched, setFieldValue, isSubmitting }) => {
    const [isPickerOpen, setPickerOpen] = useState(false);
    const [pickerTypeDate, setPickerType] = useState(true);

    // Re-usable function for toggling Modal visibility
    const togglePicker = () => setPickerOpen(!isPickerOpen);
    const togglePickerType = () => setPickerType(!pickerTypeDate);

    const handleDateChange = (event, selectedDate) => {
        console.log("handleDateChange!", selectedDate);
        setFieldValue("date", selectedDate);
    };

    const handleAllDayToggle = () => {
        setFieldValue("allDay", !values.allDay);
    };

    return (
        <React.Fragment>
            <Modal visible={isPickerOpen} animationType="slide" transparent={true}>
                <TouchableWithoutFeedback onPress={togglePicker}>
                    <View style={{ backgroundColor: "#000", flex: 1, opacity: 0.5 }}></View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        minHeight: 280,
                        backgroundColor: "white",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: values.allDay ? "flex-end" : "space-between",
                            paddingHorizontal: 16,
                            alignItems: "center",
                        }}
                    >
                        {!values.allDay && (
                            <TouchableOpacity onPress={togglePickerType}>
                                <Text style={{ color: "#0a84ff", fontSize: 16, textAlign: "left", paddingTop: 24 }}>
                                    {pickerTypeDate ? "Set Event Time" : "Set Event Date"}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={togglePicker}>
                            <Text style={{ color: "#0a84ff", fontSize: 16, textAlign: "right", paddingTop: 24 }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        style={{ paddingVertical: 16 }}
                        mode={pickerTypeDate ? "date" : "time"}
                        minimumDate={new Date()}
                        maximumDate={new Date(2029, 12, 12)}
                        value={values.date} //initial date from state
                        minuteInterval={5}
                        onChange={handleDateChange}
                    />
                </View>
            </Modal>
            <View style={styles.container}>
                <Text style={login.textLabel}>Date {!values.allDay && "And Time"}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "none",
                        borderColor: "#DDD",
                        borderWidth: 1,
                        paddingHorizontal: 16,
                    }}
                >
                    <TouchableOpacity onPress={togglePicker}>
                        <Text>{moment(values.date).format(values.allDay ? "MMM DD, YYYY" : "MMM DD, YYYY  hh:mm A")}</Text>
                    </TouchableOpacity>
                    <CheckBox
                        title="All Day?"
                        checked={values.allDay}
                        onPress={handleAllDayToggle}
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        style={{
                            width: "100%",
                            // alignSelf: "stretch",
                            margin: 0,
                        }}
                        containerStyle={{
                            backgroundColor: "#fff",
                            marginLeft: 0,
                            marginRight: 0,
                            height: 48,
                            marginBottom: 0,
                            marginTop: 0,
                            borderRadius: 0,
                            paddingLeft: 20,
                            borderWidth: 0,
                        }}
                        textStyle={{
                            fontWeight: "normal",
                        }}
                    />
                </View>
            </View>
            <View style={login.inputContainer}>
                <Text style={login.textLabel}>Description</Text>
                <TextInput
                    onBlur={handleBlur("description")}
                    onChangeText={handleChange("description")}
                    style={login.largeTextInput}
                    placeholder="Description"
                    underlineColorAndroid="transparent"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    numberOfLines={4}
                    multiline={true}
                />
                {touched.description && errors.description && <Text style={login.errorMessage}>{errors.description}</Text>}
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 10,
        padding: 0,
        marginBottom: 20,
    },
});
export default PostForm;
