import { StyleSheet } from "react-native";

export const login = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
    },
    logo: {
        maxHeight: 75,
        maxWidth: 75,
        marginTop: 75,
        marginBottom: 20,
        display: "flex",
        justifyContent: "center",
    },
    heading1: {
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
    },
    textInput: {
        minWidth: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
    },
    largeTextInput: {
        minWidth: "100%",
        height: 100,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
    },
    textInputDisabled: {
        minWidth: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        backgroundColor: "#eee",
    },
    textLabel: {
        color: "#666",
        marginBottom: 5,
        paddingLeft: 20,
        textAlign: "left",
        width: "100%",
    },
    selectLocation: {
        color: "#666",
        marginBottom: 5,
        paddingLeft: 20,
        textAlign: "left",
        width: "100%",
    },
    inputContainer: { marginBottom: 15, minWidth: "100%" },
    checkboxText: {
        margin: 0,
        padding: 0,
        fontSize: 12,
        color: "#02315d",
    },
    checkboxContainer: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        padding: 0,
        margin: 0,
        maxWidth: 200,
    },
    textSmall: {
        fontSize: 14,
        textAlign: "center",
    },
    textLink: {
        fontSize: 14,
        textAlign: "center",
        color: "#02315d",
    },
    buttonLocal: {
        backgroundColor: "#02315d",
        height: 45,
        padding: 5,
        borderRadius: 0,
    },
    buttonSocial: {
        borderRadius: 0,
        height: 45,
        padding: 5,
    },
    errorMessageContainer: {
        minHeight: 22,
    },
    errorMessage: {
        textTransform: "capitalize",
        color: "red",
        fontWeight: "600",
        paddingLeft: 20,
        paddingTop: 5,
    },
});
