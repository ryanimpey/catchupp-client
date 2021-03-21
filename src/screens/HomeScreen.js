import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet, Image, Alert, Text, TouchableOpacity } from "react-native";
import Post from "../components/Post";
import { handleError } from "../helpers";
import { POSTS } from "../helpers/api";
import { makeGetRequest } from "../helpers/requests";
import Loader from "../components/Loader";
import config from "../styles/config";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Async function to refresh posts on user request (swipe up)
    function onRefreshPosts() {
        setRefreshing(true);
        // Put in a setTimeout as users will think the request failed if the request is too quick!
        setTimeout(async () => {
            // Set refreshing before anything
            try {
                const posts = await retrievePosts();
                setPosts(posts);
            } catch (error) {
                // Handle any error (e.g. logging) and inform the user that an error occured
                handleError(error);
                Alert.alert("Error loading page", "Encountered an error loading all needed data. Please try again");
            }
            // Stop the component from refreshing
            setRefreshing(false);
        }, 500);
    }

    // Run when the component is first loaded onto our Screen Stack
    useEffect(() => {
        // Retrieve posts from our API endpoint
        retrievePosts()
            .then(posts => {
                if (Array.isArray(posts)) {
                    setPosts(posts);
                }
            })
            .catch(error => {
                // Handle any error (e.g. logging) and inform the user that an error occured
                handleError(error);
                Alert.alert("Error loading page", "Encountered an error loading all needed data. Please try again");
            })
            .finally(() => setLoading(false));
    }, []);

    // Update a post on the main screen from a post edited by the user from our <Post /> component callback
    const handlePostChange = newPost => {
        setPosts(posts.map(post => (post._id === newPost._id ? { ...post, ...newPost } : post)));
    };

    // Return a loading indicator if we're awaiting data
    if (loading) return <Loader />;

    // If no posts exist return a different screen informing the user that nothing exists yet
    if (!Array.isArray(posts) || !posts.length) {
        return (
            <View style={styles.noPosts}>
                <Text style={styles.noPostsText}>Follow more users to see posts here!</Text>
                <Feather name="image" size={40} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={{ width: "100%" }}>
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={onRefreshPosts}
                        data={posts}
                        keyExtractor={({ _id }) => _id}
                        renderItem={(item, index) => <Post {...index} {...item} key={index} handlePostChange={handlePostChange} />}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Home",
        headerTitle: (
            <View style={{ marginBottom: 5 }}>
                <Image style={{ width: 40, height: 40 }} source={require("../static/icon-alt.png")} />
            </View>
        ),
        headerRight: (
            <TouchableOpacity style={{ marginRight: config.spacing.half, marginBottom: config.spacing.quarter }} onPress={() => navigation.push("Inbox")}>
                <Feather name="inbox" size={20} />
            </TouchableOpacity>
        ),
    };
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
    },
    innerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    noPosts: {
        flex: 1,
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    noPostsText: {
        fontSize: config.font.size.base,
        paddingHorizontal: 64,
        textAlign: 'center',
        fontWeight: "700",
        color: config.colour.lightGray,
    },
    noPostsIcon: {
        marginTop: config.spacing.half,
        color: config.colour.gray,
        // fontSize: config.font.size.base * 2
    },
});

// Retrieve posts in an Async manner
function retrievePosts() {
    return new Promise((resolve, reject) => {
        makeGetRequest(POSTS)
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
}

export default HomeScreen;
