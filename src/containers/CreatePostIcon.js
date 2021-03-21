import React, { Component } from "react";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";

class CreatePostIcon extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.account._id !== this.props.account._id) {
            return true;
        }

        if (nextProps.account.avatar !== this.props.account.avatar) {
            return true;
        }

        if (nextProps.tintColor !== this.props.tintColor) {
            return true;
        }

        return false;
    };

    render() {
        return this.props.account ? <Feather name="plus" size={25} color={this.props.tintColor} /> : null;
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

export default connect(mapStateToProps)(CreatePostIcon);
