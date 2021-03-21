import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Keyboard } from "react-native";
import { FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

import { makeGetRequest, makePostRequest } from "../helpers/requests";
import { COMMENT } from "../helpers/api";
import { handleError } from "../helpers";
import config from "../styles/config";
import Loader from "../components/Loader";

const CommentsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [commentHeight, setCommentHeight] = useState(0);

    useEffect(() => {
        // Exit early if no post ID is passed to the component
        if (!navigation.state.params.postId) {
            navigation.goBack();
            return;
        }

        // Attempt to retrieve comments from the API
        (async () => {
            try {
                const { data: comments } = await makeGetRequest(COMMENT(navigation.state.params.postId));
                setComments(comments);
                setLoading(false);
            } catch (error) {
                handleError(error);
            }
        })();
    }, []);

    const handleCommentSubmit = async () => {
        try {
            const { data: newComment } = await makePostRequest(COMMENT(navigation.state.params.postId), { text: comment });
            setComments([...comments, newComment]);
            setComment("");
        } catch (error) {
            handleError(error);
        }
    };

    if (loading) return <Loader />;

    return (
        <SafeAreaView style={styles.container}>
            {comments.length === 0 ? (
                <View style={styles.noComments}>
                    <Text style={styles.noCommentsText}>No comments yet</Text>
                    <Feather name="message-circle" size={40} />
                </View>
            ) : (
                <FlatList
                    style={{ flexGrow: 1 }}
                    data={comments}
                    keyExtractor={({ _id }) => _id}
                    renderItem={(item, index) => <Comment {...item} key={index} />}
                />
            )}
            <KeyboardAvoidingView behavior="height" style={{ height: "100%", position: "absolute", width: "100%" }} keyboardVerticalOffset={90}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            backgroundColor: config.colour.white,
                            flexDirection: "row",
                            borderTopWidth: 1,
                            borderColor: config.colour.lighterGray,
                            alignItems: "center",
                            paddingHorizontal: config.spacing.half,
                            paddingVertical: config.spacing.half,
                        }}
                    >
                        <TextInput
                            blurOnSubmit
                            scrollEnabled
                            value={comment}
                            multiline={true}
                            numberOfLines={3}
                            clearButtonMode="while-editing"
                            onChangeText={text => setComment(text)}
                            onSubmitEditing={() => Keyboard.dismiss}
                            autoFocus={navigation.state.params.commenting}
                            placeholder="Add your comment to the discussion!"
                            style={[styles.textInput, { height: Math.max(30, commentHeight) }]}
                            onContentSizeChange={({ nativeEvent }) => setCommentHeight(nativeEvent.contentSize.height)}
                        />
                        <SubmitButton onPress={handleCommentSubmit} hasComment={Boolean(comment)} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Component used alongside input bar for sending a message to the comment section
const SubmitButton = ({ onPress, hasComment }) => (
    <TouchableOpacity style={[styles.sendCommentButton, !hasComment ? styles.sendCommentButtonInactive : null]} onPress={onPress}>
        <Feather name="arrow-up" size={16} />
    </TouchableOpacity>
);

// Component used to display comments in a <FlatList />
const Comment = ({ item }) => {
    // Destructure comment details from the passed down item in <FlatList />
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

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        fontSize: 15,
        backgroundColor: config.colour.lighterGray,
        borderRadius: config.borderRadius.base * 4,
        paddingHorizontal: config.spacing.half,
        lineHeight: 18,
        marginRight: config.spacing.half,
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
        flexDirection: "column",
    },
    comment: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        padding: config.spacing.half,
        paddingBottom: config.spacing.quarter,
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
        backgroundColor: config.colour.lighterGray,
    },
    sendCommentIcon: {
        color: config.colour.white,
    },
    sendCommentIconInactive: {
        color: config.colour.lightGray,
    },
});

export default CommentsScreen;
