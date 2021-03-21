import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

import config from "../styles/config";
import { makeGetRequest } from "../helpers/requests";
import { POSTS_RECENT } from "../helpers/api";

import Post from "../components/Post";

const SearchScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        makeGetRequest(POSTS_RECENT)
            .then(({ data }) => setPosts(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <SafeAreaView>
            <View>
                <SearchBar
                    round
                    onSubmitEditing={() => console.log("Searched for", search)}
                    returnKeyType="search"
                    searchIcon={{ size: 24 }}
                    onChangeText={text => setSearch(text)}
                    onClear={() => setSearch("")}
                    placeholder="Search..."
                    value={search}
                    containerStyle={styles.searchBarContainerStyle}
                    inputContainerStyle={styles.searchBarInputContainerStyle}
                    inputStyle={styles.searchBarInputStyle}
                />
            </View>
            <Text style={styles.titleText}>New Events</Text>
            <FlatList
                refreshing={refreshing}
                /* onRefresh={onRefreshPosts} */
                data={posts}
                keyExtractor={({ _id }) => _id}
                renderItem={(item, index) => <Post {...index} {...item} key={index} handlePostChange={(...all) => console.log(all)} />}
            />
            <View style={styles.searchContainer}></View>
        </SafeAreaView>
    );
};

SearchScreen.navigationOptions = {
    headerTitle: "Search",
};

const styles = StyleSheet.create({
    searchBarContainerStyle: {
        backgroundColor: config.colour.white,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: config.spacing.quarter,
        paddingRight: config.spacing.quarter,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    searchBarInputContainerStyle: {
        backgroundColor: config.colour.lighterGray,
    },
    searchBarInputStyle: {
        color: config.colour.gray,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    searchContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
    },
});

// const styles = StyleSheet.create({
// 	search: {
//
// 	},
// });

export default SearchScreen;
