import React from "react";
import {View, Text, Image} from "react-native";
import title_large from "../styles/title_large";

export default ({title = null, subtitle = null, extra = null, onSubtitlePress = null}) => (
    <View style={title_large.container}>
        <View>
            <Text style={title_large.title}>{title}</Text>
            {typeof subtitle === 'string' && (
                <Text onPress={onSubtitlePress} numberOfLines={1} style={title_large.subTitle}>{subtitle}</Text>
            )}
            {typeof subtitle === 'object' && (subtitle)}
        </View>
        {extra}
    </View>
);