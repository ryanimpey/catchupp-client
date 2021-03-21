import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import { handleError, getUserAvatar } from "../helpers";
import Post from "../components/Post";
import { makeGetRequest, makePostRequest } from "../helpers/requests";
import { POSTS_USER, RELATIONSHIPS_FOLLOW, USER_OTHER_PROFILE } from "../helpers/api";
import config from "../styles/config";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { AccountHeader, EmptyComponent } from "../components/Account";

const AccountScreen = ({ navigation }) => {
    // React State Values
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Redux imports
    const account = useSelector(state => state.account);

    // Conditional variables for useEffect API retrieval
    const userId = (navigation.state.params && navigation.state.params.userId) || account._id;
    const [user, setUser] = useState(userId === account._id ? account : null);

    // Get user data from API on initial page load
    async function getUserData() {
        try {
            // If no user exists (i.e viewing another users profile) load user data first
            if (!user) {
                const { data: newUser } = await makeGetRequest(USER_OTHER_PROFILE(userId));
                setUser(newUser);
            }

            // Load all posts by this user from the API
            const { data: newPosts } = await makeGetRequest(POSTS_USER(userId));
            // Update state to reflect changes & allow user interaction
            setPosts(newPosts);
            setLoading(false);
        } catch (error) {
            // Handle any errors or exceptions that are thrown
            handleError(error);
        }
    }

    // Load user data on screen load
    useEffect(() => {
        getUserData();
    }, []);

    // Update navigation params on screen load
    useEffect(() => {
        if (!user) return;

        navigation.setParams({
            accountUsername: user.username,
            accountEditable: userId === account._id,
        });
    }, [user]);

    // update new post that has been altered
    const handlePostChange = newPost => {
        setPosts(posts.map(post => (post._id === newPost._id ? { ...post, ...newPost } : post)));
    };

    /* const handleFollow = async () => {
        try {
            //console.log("RELATIONSHIPS_FOLLOW(userId)", RELATIONSHIPS_FOLLOW(userId));
            const { data: follow } = await makePostRequest(RELATIONSHIPS_FOLLOW(userId));
            //console.log("follow", follow);
        } catch (error) {
            //console.log(error && error.message);
            handleError(error);
        }
    }; */

    if (loading) return <Loader />;

    console.log(posts);

    return (
        <SafeAreaView style={styles.container}>
            <AccountHeader user={user} posts={posts} account={account} />
            <PostViewSwitcher />
            <FlatList
                style={{ flex: 1 }}
                data={posts}
                keyExtractor={({ _id }) => _id}
                ListEmptyComponent={EmptyComponent}
                renderItem={(item, index) => <Post {...index} {...item} handlePostChange={handlePostChange} />}
            />
        </SafeAreaView>
    );
};

const PostViewSwitcher = () => {
    return (
        <View style={styles.switcherContainer}>
            <View style={styles.switcherHeader}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Previous</Text>
            </View>
            <View style={{width: 1, backgroundColor: '#eee', height: '100%'}} />
            <View style={styles.switcherHeader}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Upcoming</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
    },
    profileHeader: {
        padding: config.spacing.half,
    },
    switcherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    switcherHeader: {
        paddingVertical: 16,
        paddingHorizontal: 48
    }
});

AccountScreen.navigationOptions = ({ navigation }) => {
    return {
        // headerTitle: store.getState().account.username,
        headerTitle: navigation.getParam("accountUsername"),
        headerRight: navigation.getParam("accountEditable") ? (
            <TouchableOpacity style={{ marginRight: config.spacing.half, marginBottom: config.spacing.quarter }} onPress={() => navigation.push("Edit")}>
                <Feather name="edit" size={20} />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={{ marginRight: config.spacing.half, marginBottom: config.spacing.quarter }} onPress={() => navigation.push("Inbox")}>
                <Feather name="mail" size={20} />
            </TouchableOpacity>
        ),
    };
};

export default AccountScreen;
