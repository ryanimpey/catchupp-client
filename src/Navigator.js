import { createAppContainer, createSwitchNavigator, withNavigation } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createStackNavigator, StackViewTransitionConfigs } from "react-navigation-stack";
import React from "react";
import moment from "moment";

import { appDefaultBottomTabNavigationOptions } from "./helpers/navigator";
import { setTopLevelNavigator } from "./helpers/navigator";

// Screen Imports
import NotificationsScreen from "./screens/NotificationsScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MessagesScreen from "./screens/MessagesScreen";
import SearchScreen from "./screens/SearchScreen";
import EditScreen from "./screens/EditScreen";
import NewPostScreen from "./screens/NewPost/NewPostScreen";
import NewPostLocationScreen from "./screens/NewPost/NewPostLocationScreen";
import AccountScreen from "./screens/AccountScreen";
import CommentsScreen from "./screens/CommentsScreen";
import LikesScreen from "./screens/LikesScreen";
import LoginScreen from "./screens/LoginScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import InboxScreen from "./screens/InboxScreen";

moment.updateLocale("en", {
    relativeTime: {
        past: "%s ",
        s: "%ds",
        m: "%dm",
        mm: "%dm",
        h: "%dh",
        hh: "%dh",
        d: "%dd",
        dd: "%dd",
        M: "%dmo",
        MM: "%dmo",
        y: "%dy",
        yy: "%dy",
    },
});

const MessagesNavigator = createStackNavigator(
    {
        Messages: MessagesScreen,
    },
    {
        headerMode: "float",
    },
);

const AccountNavigator = createStackNavigator(
    {
        Account: AccountScreen,
        Edit: EditScreen,
        Register: RegisterScreen,
    },
    {
        headerMode: "float",
    },
);

const NewPostNavigator = createStackNavigator(
    {
        NewPostLocation: NewPostLocationScreen,
        NewPost: NewPostScreen,
    },
    {
        headerMode: "float",
        initialRouteName: "NewPostLocation",
    },
);

const InboxNavigator = createSwitchNavigator({
    Inbox: InboxScreen,
    Messages: MessagesScreen,
});

const HomeNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Comments: {
            screen: CommentsScreen,
            navigationOptions: {
                headerTitle: "Comments",
            },
        },
        Likes: LikesScreen,
        Account: AccountScreen,
        Inbox: InboxNavigator,
    },
    {
        headerMode: "float",
    },
);

const SearchNavigator = createStackNavigator(
    {
        Search: SearchScreen,
    },
    {
        headerMode: "none",
    },
);

const NotificationsNavigator = createStackNavigator(
    {
        Notifications: NotificationsScreen,
    },
    {
        headerMode: "float",
    },
);

const AppStack = createBottomTabNavigator(
    {
        // Messages: {
        //     screen: MessagesNavigator,
        // },
        Home: {
            screen: HomeNavigator,
        },
        Account: {
            screen: AccountNavigator,
            navigationOptions: {},
        },
        Plus: {
            screen: NewPostNavigator,
        },
        Search: {
            screen: SearchNavigator,
        },
        Notifications: {
            screen: NotificationsNavigator,
        },
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: appDefaultBottomTabNavigationOptions,
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeTintColor: "#02315d",
            inactiveTintColor: "#A7A7A9",
        },
    },
);

const AuthStack = createStackNavigator({ Login: LoginScreen, Register: RegisterScreen, ForgotPassword: ForgotPasswordScreen });

const Navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: "AuthLoading",
    },
);

const AppContainer = createAppContainer(Navigator);

export default () => (
    <AppContainer
        ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef);
        }}
    />
);
