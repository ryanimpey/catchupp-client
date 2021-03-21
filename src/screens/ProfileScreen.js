import React from "react";
import {Button, View} from 'react-native';


export default class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Profile',
	};

	render() {
		const {navigate} = this.props.navigation;
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-around',
				}}>
				<Button
					title="Go to Jane's profile"
					onPress={() => navigate('Profile', {name: 'Jane'})}
				/>
			</View>
		);
	}
}
