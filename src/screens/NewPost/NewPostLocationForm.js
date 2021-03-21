import React, {useEffect, useState} from "react";
import {View, Text, TextInput, KeyboardAvoidingView} from "react-native";
import {login} from "../../styles/login";
import {Button} from "react-native-elements";
import axios from "axios";

const NewPostLocationForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setTouched,
    setFieldValue,
    isSubmitting,
    onLocationChange,
    ...props
}) => {
    const [locationTimer, setLocationTimer] = useState(null);

    useEffect(() => {
        clearTimeout(locationTimer);

        if (!values.location) return;

        setLocationTimer(
            setTimeout(() => {
                (async () => {
                    let useGoogle = true;
                    const place = values.location;

                    const googleApiKey = "YOUR_GOOGLE_MAPS_API_KEY";
                    // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${googleApiKey}`;
                    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&key=${googleApiKey}`;

                    if (!useGoogle) {
                        const mapboxApiKey = "YOUR_MAPBOX_API_KEY";
                        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${mapboxApiKey}`;
                    }

                    const { data } = await axios.get(url);
                    !useGoogle ? onLocationChange(data.features) : onLocationChange(data.predictions);
                })();
            }, 500),
        );
    }, [values.location]);

    return (
        <KeyboardAvoidingView>
            <View style={login.inputContainer}>
                <Text style={login.textLabel}>Location</Text>
                <TextInput
                    onFocus={() => setTouched({ ...touched, location: true })}
                    onChangeText={text => setFieldValue("location", text)}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    underlineColorAndroid="transparent"
                    placeholder="Start typing to see results"
                    style={login.textInput}
                    autoFocus={true}
                />
                {touched.location && errors.location && <Text style={login.errorMessage}>{errors.location}</Text>}
            </View>
        </KeyboardAvoidingView>
    );
};

export default NewPostLocationForm;
