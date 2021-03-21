import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import { makeGetRequest } from "../helpers/requests";
import { LIKES } from "../helpers/api";
import { handleError } from "../helpers";
import config from "../styles/config";
import Loader from "../components/Loader";

const LikesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                // escape comments if no postId was given
                if (!navigation.state.params.postId) {
                    navigation.goBack();
                    return;
                }

                const { data: likes } = await makeGetRequest(LIKES(navigation.state.params.postId));
                setLikes(likes);
                setLoading(false);
            } catch (error) {
                handleError(error);
            }
        })();
    }, []);

    if (loading) return <Loader />;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                {likes.length > 0 ? (
                    <FlatList
                        style={{ flexGrow: 1 }}
                        data={likes}
                        keyExtractor={({ _id }) => _id}
                        renderItem={(item, index) => <Like {...item} key={index} />}
                    />
                ) : (
                    <View style={styles.noComments}>
                        <Text style={styles.noCommentsText}>No likes yet</Text>
                        <Feather name="thumbs-up" size={40} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const Like = ({ item }) => {
    const { timestamp, text, user = "" } = item;

    return (
        <View style={styles.comment}>
            <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
                <Text style={styles.commentContentUsername}>{user && user.username}</Text>
                <Text style={styles.commentText}>{text}</Text>
            </View>
            <Text style={styles.commentTimestamp}>{moment(new Date(timestamp)).fromNow()}</Text>
        </View>
    );
};

LikesScreen.navigationOptions = {
    headerTitle: "Likes",
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
        flexDirection: "column",
    },
    comment: {
        // borderTopWidth: 1,
        // borderTopColor: config.colour.lighterGray,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        // paddingLeft: config.spacing.half,
        // paddingRight: config.spacing.half,
        // paddingTop: config.spacing.half
        padding: config.spacing.half,
        paddingBottom: config.spacing.quarter
    },
    commentAvatar: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        overflow: "hidden",
    },
    commentContent: {
        flexGrow: 1,
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        paddingLeft: config.spacing.quarter,
    },
    commentContentUsername: {
        fontWeight: "700",
        paddingRight: config.spacing.quarter,
    },
    commentText: {},
    commentTimestamp: {
        flexShrink: 1,
    },
    noComments: {
        flex: 1,
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    noCommentsText: {
        fontSize: config.font.size.base * 1.5,
        fontWeight: "700",
        color: config.colour.lightGray,
    },
    noCommentsIcon: {
        marginTop: config.spacing.half,
        color: config.colour.gray,
        // fontSize: config.font.size.base * 2
    },
    sendCommentButton: {
        backgroundColor: config.colour.primary,
        borderRadius: 15,
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    sendCommentButtonInactive: {
        backgroundColor: config.colour.lighterGray
    },
    sendCommentIcon: {
        color: config.colour.white,
    },
    sendCommentIconInactive: {
        color: config.colour.lightGray,
    },
});

export default withNavigation(LikesScreen);
