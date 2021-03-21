import React from "react";
import { connect } from "react-redux";

import LoginScreen from "../screens/LoginScreen";

const PrivateRoute = ({ account, component: Component, ...props }) => (account ? <Component {...props} /> : <LoginScreen {...props} />);

const mapStateToProps = ({ account }) => ({ account });

export default connect(mapStateToProps)(PrivateRoute);
