import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";

import { useDispatch } from "react-redux";
import { useNavigation } from "react-navigation-hooks";
import { logoutUser } from "../actions/user";
import { removeToken } from "../actions/device";
import { getUserAvatar, handleError } from "../helpers";
import Button from "./Button";
import config from "../styles/config";
import { makePostRequest, makeGetRequest } from "../helpers/requests";
import { RELATIONSHIPS_FOLLOW, RELATIONSHIPS_FOLLOWING_USER } from "../helpers/api";

// Header component rendered above user posts list
export const AccountHeader = ({ user, posts, account }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isFollowing, setFollowing] = useState(false);

    useEffect(() => {
        makeGetRequest(RELATIONSHIPS_FOLLOWING_USER(user._id))
            .then(({ data }) => setFollowing(data.count))
            .catch(err => console.log(err));
    }, [user._id]);

    function onUserLogout() {
        dispatch(logoutUser());
        dispatch(removeToken());
        return navigation.navigate("Login");
    }

    function onFollowPress() {
        makePostRequest(RELATIONSHIPS_FOLLOW(user._id))
            .then(({ data }) => setFollowing(Boolean(data.confirmed)))
            .catch(err => console.log(err));
    }

    return (
        <View style={{ padding: config.spacing.half, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" }}>
            <View style={{ flex: 1, padding: config.spacing.quarter }}>
                <View>
                    <Image source={{ uri: getUserAvatar(user) }} style={styles.image} />
                </View>
            </View>
            <View style={{ flexDirection: "column", flex: 2.5 }}>
                <View style={{ flexDirection: "row", marginBottom: config.spacing.quarter }}>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: "column" }}>
                        <View style={{ marginBottom: config.spacing.quarter }}>
                            <Text style={{ paddingRight: config.spacing.quarter }}>Previous</Text>
                            <Text style={styles.location}>{Array.isArray(posts) && posts.length > 1 ? posts[1].location : "Nothing Yet!"}</Text>
                        </View>
                        <View>
                            <Text style={{ paddingRight: config.spacing.quarter }}>Next</Text>
                            <Text style={styles.location}>{Array.isArray(posts) &&  posts.length > 0 ? posts[0].location : "Nothing Yet!"}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0, flexShrink: 1, paddingRight: config.spacing.half }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={styles.bold}>4</Text>
                                <Text style={styles.label}>places</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={styles.bold}>11</Text>
                                <Text style={styles.label}>followers</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={styles.bold}>5</Text>
                                <Text style={styles.label}>following</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {user._id === account._id ? (
                    <Button secondary style={{ flex: 0, marginTop: config.spacing.quarter }} onPress={onUserLogout}>
                        Sign out
                    </Button>
                ) : (
                    <FollowButton isFollowing={isFollowing} onPress={onFollowPress} />
                )}
            </View>
        </View>
    );
};

export const FollowButton = ({ isFollowing, onPress }) =>
    isFollowing ? (
        <Button outline style={{ flex: 0, marginTop: config.spacing.quarter }} onPress={() => Alert.alert("TODO: Finish this")}>
            Unfollow
        </Button>
    ) : (
        <Button outline style={{ flex: 0, marginTop: config.spacing.quarter }} onPress={onPress}>
            Follow
        </Button>
    );

export const EmptyComponent = () => {
    // Import Navigation State with react-navigation hook
    const navigation = useNavigation();

    // Return JSX to be displayed when no posts exist
    return (
        <View style={styles.noPosts}>
            <Text style={styles.noPostsText}>You haven't created any events yet!</Text>
            <TouchableOpacity onPress={() => navigation.navigate("NewPostLocationScreen")}>
                <Button secondary style={{ marginTop: config.spacing.half }}>
                    Create an event
                </Button>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 100,
        overflow: "hidden",
        height: 72,
        width: 72,
    },
    label: {
        textAlign: "right",
    },
    bold: {
        fontWeight: "bold",
        paddingRight: config.spacing.quarter,
    },
    location: {
        fontWeight: "bold",
    },
    noPosts: {
        flex: 1,
        alignItems: "center",
        padding: config.spacing.half,
    },
    noPostsText: {
        fontSize: config.font.size.base,
    },
});
