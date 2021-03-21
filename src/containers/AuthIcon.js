import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons"

import { getUserAvatar } from "../helpers";

class AuthIcon extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        if (
            nextProps.account &&
            this.props.account &&
            (nextProps.account._id !== this.props.account._id || nextProps.account.avatar !== this.props.account.avatar)
        ) {
            return true;
        }

        if (nextProps.tintColor !== this.props.tintColor) {
            return true;
        }

        return false;
    };
    render() {
        if (this.props.account && this.props.account._id) {
            return (
                <Image
                    source={{
                        uri: getUserAvatar(this.props.account),
                    }}
                    resizeMode="stretch"
                    style={{ width: 25, height: 25, borderRadius: 12 }}
                />
            );
        }

        return <Feather name="user" size={25} color={this.props.tintColor} />;
    }
}

const mapStateToProps = ({ account }) => ({ account });

export default connect(mapStateToProps)(AuthIcon);
