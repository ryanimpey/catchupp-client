import React, { useState, Fragment } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Image } from "react-native";
import NewPostLocationForm from "./NewPostLocationForm";
import { Formik } from "formik";
import { login } from "../../styles/login";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";

const NewPostLocationScreen = ({ navigation }) => {
    const [locations, setLocations] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <Formik validationSchema={newPostSchema} onSubmit={this.attemptLocalSignIn}>
                {props => (
                    <Fragment>
                        <NewPostLocationForm {...props} onLocationChange={setLocations} />
                        <Divider style={{ marginVertical: 10 }} />
                        <View>
                            {locations.length > 1 && <Text style={login.selectLocation}>Please select a location to continue</Text>}
                            <Divider style={{ marginVertical: 10 }} />
                            {locations.map((location, index) => {
                                const showLocation = location.description ? location.description : location.place_name;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                            navigation.navigate("NewPost", {
                                                location: showLocation,
                                            })
                                        }
                                    >
                                        <Text
                                            style={{
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                width: "100%",
                                                minWidth: "100%",
                                                maxWidth: "98%",
                                                paddingHorizontal: 20,
                                            }}
                                        >
                                            {showLocation}
                                        </Text>
                                        <Divider style={{ marginVertical: 10 }} />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </Fragment>
                )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: 20,
    },
});

const newPostSchema = Yup.object().shape({
    date: Yup.date().required(),
    allDay: Yup.boolean().required(),
    description: Yup.string().required(),
});

NewPostLocationScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: "Create New Post",
    };
};

export default withNavigation(NewPostLocationScreen);
