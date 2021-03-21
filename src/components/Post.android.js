import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { useActionSheet } from '@expo/react-native-action-sheet'
import HeartDot from "../static/heart-with-dot.svg";
import HeartDotGrey from "../static/heart-with-dot-grey-outline.svg";
import HeartDotRed from "../static/heart-with-dot-red.svg";
import config from "../styles/config";
import { handleError, getUserAvatar } from "../helpers";
import { makePostRequest } from "../helpers/requests";
import { POST_LIKE, REPORT_POST } from "../helpers/api";
import { HeartWithDotIcon, HeartWithDotOutlineIcon, HeartWithDotRedIcon } from "../svgs";

const Post = ({ item, index, navigation, account, handlePostChange }) => {
    const { _id: id, location, attendingDate, eventDate, longitude, latitude, commentCount, user, likes, latitudeDelta } = item;
    const [likedPending, setLikedPending] = useState(false);

    const ActionSheet = useActionSheet();

    const handleLike = async () => {
        try {
            setLikedPending(true);
            const { data: post } = await makePostRequest(POST_LIKE(id));
            handlePostChange && handlePostChange(post);
            setLikedPending(false);
        } catch (error) {
            handleError(error);
            setLikedPending(false);
        }
    };

    function handleActionSheetClick(index) {
        if (index === 1) {
            makePostRequest(REPORT_POST(id), { reporterId: account._id })
                .then(() => Alert.alert("Thank you!", "This post will be reviewed to ensure it complies with our terms of service!"))
                .catch(() => Alert.alert("Failed to report", "Sorry, we couldn't file a report at this time, please try again."));
        }
    }

    // Allows the reporting of a post via an Expo ActionSheet, which takes in a callback that provides the clicked index
    function displayOptionsActionSheet() {
        return ActionSheet.showActionSheetWithOptions(
            {
                options: ["Cancel", "Report Post"],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
            },
            handleActionSheetClick,
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ flexDirection: "row", flex: 1, marginBottom: 5 }}>
                    <Text style={styles.title}>{location}</Text>
                    <TouchableOpacity style={styles.options} onPress={displayOptionsActionSheet}>
                        <Feather name="more-vertical" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate({ routeName: "Account", params: { userId: String(user._id) } });
                        }}
                        style={styles.user}
                    >
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <View style={styles.avatarWrapper}>
                                <Image source={{ uri: getUserAvatar(user) }} style={styles.avatar} />
                            </View>
                            <Text style={{ fontWeight: "700" }}>{user.displayName}</Text>
                        </View>
                        <Text style={styles.userText}>{attendingDate}</Text>
                    </TouchableOpacity>
                    <View style={styles.timestamp}>
                        <Text> {moment(new Date(eventDate)).fromNow()}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.imagePadding}>
                <MapView
                    pitchEnabled={false}
                    rotateEnabled={false}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    style={{ alignSelf: "stretch", height: 200 }}
                    initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta: latitudeDelta * (Dimensions.get("window").width / 200) }}
                />
            </View>

            <View style={{ flex: 1, flexDirection: "row", padding: 10, paddingBottom: config.spacing.quarter, alignItems: "center" }}>
                <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleLike}>
                        {likes.indexOf(account._id) > -1 && <HeartWithDotRedIcon width="26" height="26" />}
                        {likes.indexOf(account._id) === -1 && !likedPending && <HeartWithDotIcon width="26" height="26" />}
                        {likes.indexOf(account._id) === -1 && likedPending && <HeartWithDotOutlineIcon width="26" height="26" />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Comments", {
                                postId: id,
                                commenting: true,
                            })
                        }
                    >
                        <View style={{ paddingLeft: config.spacing.base / 3.5 }}>
                            <Feather size={20} name="message-circle" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexGrow: 1, flex: 1, flexDirection: "row", marginLeft: "auto", justifyContent: "flex-end" }}>
                    {likes && likes.length > 0 && (
                        <TouchableOpacity
                            style={styles.likeText}
                            onPress={() =>
                                navigation.navigate("Likes", {
                                    postId: id,
                                })
                            }
                        >
                            <Text>
                                {likes.length} like{likes.length > 1 ? "s" : ""}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {commentCount > 0 && (
                        <TouchableOpacity
                            style={{ paddingLeft: config.spacing.half }}
                            key={index}
                            onPress={() =>
                                navigation.navigate("Comments", {
                                    postId: id,
                                })
                            }
                        >
                            <Text>
                                {commentCount} comment{commentCount > 1 ? "s" : ""}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={{ flex: 1, padding: config.spacing.half, paddingTop: config.spacing.quarter }}>
                <Text>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
        flexDirection: "column",
    },
    imagePadding: {
        width: "100%",
        overflow: "hidden",
    },
    likeText: {
        textAlign: "left",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    map: {
        flex: 1,
    },
    wrapper: {
        width: "100%",
        padding: config.spacing.half,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        // flex: 1,
        flexGrow: 1,
    },
    options: {},
    user: {
        paddingTop: 5,
        alignItems: "center",
        flexGrow: 1,
        flex: 1,
        flexDirection: "row",
    },
    timestamp: {},
    userText: {
        fontWeight: "500",
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 10,
        overflow: "hidden",
    },
    avatarWrapper: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        overflow: "hidden",
        marginRight: 6,
    },
});

const mapStateToProps = ({ account }) => ({ account });
export default withNavigation(connect(mapStateToProps)(Post));
