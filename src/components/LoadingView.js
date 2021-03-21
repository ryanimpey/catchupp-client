import React from "react";
import {ActivityIndicator, View} from "react-native";

export default () => (
    <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator/>
        </View>
    </View>
);