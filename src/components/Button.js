import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import config from "../styles/config";

export default ({ children, style = {}, active = false, secondary = false, outline = false, ...props }) => {
    return (
        <TouchableOpacity
            style={[
                { ...styles.button, ...style },
                outline ? styles.buttonOutline : null,
                active ? styles.buttonActive : null,
                secondary ? styles.buttonSecondary : null,
                outline && secondary ? styles.buttonSecondaryOutline : null,
            ]}
            {...props}
        >
            <Text
                style={[
                    styles.buttonText,
                    outline ? styles.buttonTextOutline : null,
                    active ? styles.buttonTextActive : null,
                    secondary ? styles.buttonTextSecondary : null,
                    secondary && outline ? styles.buttonTextSecondaryOutline : null,
                    secondary && active ? styles.buttonTextSecondaryActive : null,
                ]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: config.spacing.half,
        paddingVertical: config.spacing.quarter,
        backgroundColor: config.colour.white,
        borderRadius: config.borderRadius.base,
    },
    buttonOutline: {
        borderWidth: 2,
        borderColor: config.colour.primary,
        backgroundColor: config.colour.white,
    },
    buttonSecondaryOutline: {
        borderColor: config.colour.secondary,
    },
    buttonActive: {
        backgroundColor: config.colour.primary,
    },
    buttonSecondary: {
        backgroundColor: config.colour.secondary,
    },

    buttonText: {
        fontWeight: "700",
        color: config.colour.white,
    },
    buttonTextOutline: {
        color: config.colour.primary,
    },
    buttonTextSecondaryOutline: {
        color: config.colour.secondary,
    },
    buttonTextActive: {
        color: config.colour.white,
    },
    buttonTextSecondary: {
        color: config.colour.black,
    },
    buttonTextSecondaryActive: {
        color: config.colour.white,
    },
});
