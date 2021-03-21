import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";

import Notification from "../components/Notification";
import Loader from "../components/Loader";
import { handleError } from "../helpers";
import { makeGetRequest } from "../helpers/requests";
import { NOTIFICATIONS } from "../helpers/api";

const NotificationsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data: notifications } = await makeGetRequest(NOTIFICATIONS);
                setNotifications(notifications);
                setLoading(false);
            } catch (error) {
                handleError(error);
            }
        })();
    }, []);

    // Handle navigation to the comment screen when a notification is interacted with
    const onNotificationPress = ({item}) => navigation.navigate({ routeName: "Comments", params: { postId: String(item._id) } });

    if (loading) return <Loader />;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <FlatList
                    data={notifications}
                    keyExtractor={({ _id }) => _id}
                    renderItem={item => <Notification onPress={() => onNotificationPress(item)} {...item} />}
                />
            </View>
        </SafeAreaView>
    );
};

NotificationsScreen.navigationOptions = {
    title: "Notifications",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
});

export default NotificationsScreen;
