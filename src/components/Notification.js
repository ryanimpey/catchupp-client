import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons"
import config from "../styles/config";

const Notification = ({ item, onPress }) => {
    let { title, text, timestamp, image } = item;

    return (
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", paddingHorizontal: 20, paddingVertical: 12 }}>
            <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={onPress} onLongPress={() => console.log('BRING UP CLEAR BUTTON')}>
                <View style={styles.avatar}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.bold}> {title} </Text>
                    <Text> {text}</Text>
                </View>
                <View style={styles.timestamp}>
                    <Text> {moment(timestamp).fromNow()}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => console.log('BRING UP CLEAR BUTTON')}>
                <View style={styles.options}>
                    <View style={styles.bold}>
                        <Feather name="more-vertical" size={20} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingBottom: 16
    },
    avatar: {
        width: 100,
    },
    content: {
        flex: 1,
        flexGrow: 1,
    },
    timestamp: {
        paddingLeft: config.spacing.quarter,
        flexShrink: 1,
    },
    options: {
        flexShrink: 1,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    bold: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Notification;
