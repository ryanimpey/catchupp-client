import React, { useEffect, useState, Fragment, useRef } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View, Text, Image, Dimensions, Alert } from "react-native";
import NewPostForm from "./NewPostForm";
import { Formik } from "formik";
import { loginSchema } from "../../schemas";
import { login } from "../../styles/login";
import { Divider, Text as RNText } from "react-native-elements";
import axios from "axios";
import MapView from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { POSTS, USER_PROFILE } from "../../helpers/api";
import { connect } from "react-redux";
// import {makeGetRequest} from "../../helpers/requests";
import { makePostRequest } from "../../helpers/requests";
import * as Yup from "yup";
import { handleError } from "../../helpers";

const NewPostScreen = ({ navigation, account }) => {
    const [searchedLocation, setSearchedLocation] = useState("");
    const [latitude, setLocationLat] = useState(0);
    const [longitude, setLocationLng] = useState(0);
    const [latitudeDelta, setDeltaLat] = useState(0);
    const [longitudeDelta, setDeltaLng] = useState(0);
    // console.log({locations});

    let scroll = useRef(null);

    useEffect(() => {
        (async () => {
            const googleApiKey = "AIzaSyAWZOPmZgNrH3EmmbSAIUerijrXcQdtstY";
            let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${navigation.state.params.location}&key=${googleApiKey}`;

            const { data } = await axios.get(url);
            const { viewport } = data.results[0].geometry;

            setSearchedLocation(navigation.state.params.location); // pass location name

            setLocationLat(data.results[0].geometry.location.lat); // pass latitude to map
            setLocationLng(data.results[0].geometry.location.lng); // pass longitude to map

            const ASPECT_RATIO = Dimensions.get("window").width / 200;
            const latDelta = viewport.northeast["lat"] - viewport.southwest["lat"];
            setDeltaLat(latDelta); // pass latitude delta to map
            setDeltaLng(latDelta * ASPECT_RATIO); // pass longitude delta to map
        })();
    }, []);

    const handleSubmit = async (values, actions) => {
        // Empty object for user data from API
        try {
            const { data: posts } = await makePostRequest(`${POSTS}`, {
                ...values,
                longitude,
                latitude,
                location: searchedLocation,
                latitudeDelta,
                eventDate: values.date,
            });

            setLocationLat(0);
            setLocationLng(0);
            setDeltaLat(0);
            setDeltaLng(0);
            setSearchedLocation("");
            navigation.navigate("Account");
            actions.setSubmitting(false);
        } catch (error) {
            handleError(error);
            actions.setSubmitting(false);
        }
        // fetch(EVENT, {
        // 	body: JSON.stringify(_data),
        // 	headers: {
        // 		Accept: "application/json", "Content-Type": "application/json",
        // 		Authorization: `Bearer ${account.access_token}`
        // 	},
        // 	method: "POST",
        // })
        // 	.then(response => response.json())
        // 	.then(response => {
        //
        // 		console.log({response});
        // 		if (response.error && response.errorName){
        // 			Alert.alert(response.errorName, response.errorMessage);
        // 		}
        // 		// return fetch(USER_PROFILE, {
        // 		// 	headers: {
        // 		// 		Accept: "application/json",
        // 		// 		"Content-Type": "application/json",
        // 		// 		Authorization: "Bearer " + response.access_token,
        // 		// 	},
        // 		// });
        // 	})
        // 	// .then(response => response.json())
        // 	// .then(response => {
        // 	// 	console.log({response})
        // 	// 	if (response) {
        // 	// 		user = {...user, ...response};
        // 	// 	} else {
        // 	// 		if (response.error && response.errorName){
        // 	// 			alert(response.errorName, response.errorMessage);
        // 	// 		}
        // 	// 	}
        // 	// 	// Return user object to our next .then()
        // 	// 	return user;
        // 	// })
        // 	// .then(user => this.props.accountLogin(user))
        // 	.catch(err => {
        // 		console.log(err);
        // 		console.log(err.name);
        // 		console.log(err.message);
        // 		alert("Failed to sign in", "Please check your details and try again")
        // 	})
        // 	.then(() => actions.setSubmitting(false));
        //actions.setSubmitting(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={"always"}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                innerRef={ref => (scroll = ref)}
            >
                <View style={styles.imagePadding}>
                    <Text style={login.textLabel}>Location: {searchedLocation}</Text>
                    {longitude !== 0 && longitudeDelta !== 0 && (
                        <MapView
                            pitchEnabled={false}
                            rotateEnabled={false}
                            zoomEnabled={false}
                            scrollEnabled={false}
                            style={{ alignSelf: "stretch", height: 200, marginBottom: 20 }}
                            // provider={'apple'}
                            maxZoomLevel={20}
                            minZoomLevel={0}
                            zoomControlEnabled={true}
                            initialRegion={{
                                latitude,
                                longitude,
                                latitudeDelta,
                                longitudeDelta,
                            }}
                        />
                    )}
                </View>

                <Formik initialValues={initialValues} validationSchema={newPostSchema} onSubmit={handleSubmit}>
                    {props => (
                        <Fragment>
                            <NewPostForm {...props} />
                            <Divider style={{ marginVertical: 10 }} />
                            <View style={{ ...login.inputContainer, marginBottom: 0 }}>
                                <Button raised loading={props.isSubmitting} title="Create Post" onPress={props.handleSubmit} buttonStyle={login.buttonLocal} />
                            </View>
                        </Fragment>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const initialValues = { date: new Date(), allDay: true, description: "" };

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        // marginTop: 20
    },

    imagePadding: {
        width: "100%",
        overflow: "hidden",
        minHeight: 220,
        paddingTop: 20,
    },
});

const newPostSchema = Yup.object().shape({
    date: Yup.date().required(),
    allDay: Yup.boolean().required(),
    description: Yup.string().required(),
});

NewPostScreen.navigationOptions = {
    headerTitle: "Create New Post",
};

const mapStateToProps = state => ({
    account: state.account,
});

export default connect(mapStateToProps)(NewPostScreen);
