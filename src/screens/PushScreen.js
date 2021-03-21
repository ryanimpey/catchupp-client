import React from 'react';
import { Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

// hi
const YOUR_PUSH_TOKEN = 'ExponentPushToken[ho6YSdEpcYgEG8tw5UtUft]';

export default class PushScreen extends React.Component {
	state = {
		notification: {},
		pushToken: ''
	};
	static navigationOptions = {
		title: 'Feed',
	};

	registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(
				Permissions.NOTIFICATIONS
			);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(
					Permissions.NOTIFICATIONS
				);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			let token = await Notifications.getExpoPushTokenAsync();
			this.setState({pushToken: token});
		} else {
			// alert('Must use physical device for Push Notifications');
		}
	};

	componentDidMount() {
		this.registerForPushNotificationsAsync();

		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		this._notificationSubscription = Notifications.addListener(
			this._handleNotification
		);
	}

	_handleNotification = notification => {
		this.setState({ notification: notification });
	};



	// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
	sendPushNotification = async () => {

		// alert(YOUR_PUSH_TOKEN);

		const message = {
			to: YOUR_PUSH_TOKEN,
			// sound: 'default',
			title: 'Original Title',
			body: 'And here is the body!',
			// data: { data: 'goes here' },
		};
		const response = await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Accept-Encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		});
		const data = response._bodyInit;
		console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
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
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text>Origin: {this.state.notification.origin}</Text>
					<Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
					<Text>Title: {JSON.stringify(this.state.notification.title)}</Text>
					<Text>Body: {JSON.stringify(this.state.notification.body)}</Text>
					<Text>pushToken: {this.state.pushToken}</Text>
				</View>
				<Button
					title={'Press to Send Notification'}
					onPress={() => this.sendPushNotification()}
				/>
				<Button
					title={'Set token'}
					onPress={() => this.registerForPushNotificationsAsync()}
				/>

				<Button
					title="Go to Jane's profile"
					onPress={() => navigate('Profile', {name: 'Jane'})}
				/>
			</View>
		);
	}
}

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'

    */
