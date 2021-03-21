import AuthIcon from "../containers/AuthIcon";
import React from "react";
import { NavigationActions } from "react-navigation";
import { Feather } from "@expo/vector-icons";

export const appDefaultBottomTabNavigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === "Account") {
            return <AuthIcon tintColor={tintColor} focused={focused} />;
        }

        // You can return any component that you like here!
        return <Feather name={getIconName(routeName)} size={25} color={tintColor} />;
    },
});

const getIconName = routeName => {
    switch (routeName) {
        case "Search":
            return `search`;
        case "Account":
            return null;
        case "Listings":
            return `anchor`;
        case "Wishlist":
            return `star`;
        case "Messages":
            return `inbox`;
        case "Plus":
            return `plus`;
        case "Notifications":
            return `bell`;
        default:
            return `home`;
    }
};

// global navigation without props anywhere
let _navigator;

export const setTopLevelNavigator = navigatorRef => {
    _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
};