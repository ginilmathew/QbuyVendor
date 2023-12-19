import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useContext, useEffect } from 'react';
import reactotron from 'reactotron-react-native';
import AuthContext from '../contexts/Auth';
import { navigationRef } from '../Navigations/RootNavigation';
import DeviceInfo from 'react-native-device-info';
import { PermissionsAndroid, Platform } from 'react-native';
import firebase from '@react-native-firebase/app';



const Notification = () => {

	const auth = useContext(AuthContext)

	useEffect(() => {
		onAppBootstrap()
		messaging().onMessage(onMessageReceived);
		//messaging().setBackgroundMessageHandler(onMessageReceived);
	}, [])

    useEffect(() => {
      //getCurrentLocation()
      requestUserPermission()
      onAppBootstrap()
  }, [])



    async function requestUserPermission() {
      if (Platform.OS === "android") {
          const status = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);
      }
      else{
          const authStatus = await messaging().requestPermission();
          const enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
              //console.log(‘Authorization status:’, authStatus);
          }
      }
      //getCurrentLocation()
  }


	async function onAppBootstrap() {
		// Register the device with FCM
		// const firebaseConfig = {
		// 	apiKey: "AIzaSyDtuAsjMGgYeJpAUxo8Szp_-lx76yDyjs8",
		// 	authDomain: "qbuygreen-2185c.firebaseapp.com",
		// 	projectId: "qbuygreen-2185c",
		// 	storageBucket: "qbuygreen-2185c.appspot.com",
		// 	messagingSenderId: "678656967091",
		// 	appId: "1:678656967091:web:4117872d12f5c50b79cbc6",
		// 	measurementId: "G-HMHGCFHDZG",
		// 	databaseURL: ""
		// };
  

		// await firebase.initializeApp(firebaseConfig)
		await messaging().registerDeviceForRemoteMessages();
		await notifee.requestPermission()
		await notifee.createChannel({
			id: 'orders',
			name: 'Order',
			sound: 'order',
			importance: AndroidImportance.HIGH,
			visibility: AndroidVisibility.PUBLIC
		});

		await notifee.createChannel({
			id: 'default',
			name: 'Default Channel',
			sound: 'default',
			importance: AndroidImportance.DEFAULT,
			visibility: AndroidVisibility.PUBLIC
		});

		let bundleId = DeviceInfo.getBundleId();
		const type = bundleId.replace("com.qbuystoreapp.", "")

		messaging()
			.subscribeToTopic(`${type}_dev_vendor_general`)
			.then(() => console.log("Subscribed to topic:", `${type}_dev_vendor_general`))
			.catch((e) => {
				console.log(e);
			});



		// Get the token
		const token = await messaging().getToken();

		console.log({token})
		auth.setFcmToken(token)

		//reactotron.log({token}, "Notification Token")

		// Save the token
		//await postToApi('/users/1234/tokens', { token });
	}

	async function onMessageReceived(message) {
		reactotron.log({message})
		notifee.displayNotification({
			title: message?.notification?.title,
			body: message?.notification?.body,
			data: message?.data,
			android: {
				channelId: message?.data?.mode === "order" ? 'orders' : "default",
				vibration: true,
				sound: message?.data?.type === "admin" ? 'default' : 'order',
				smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
				// pressAction is needed if you want the notification to open the app when pressed
				pressAction: {
					id: 'default',
				},
				importance: AndroidImportance.HIGH,
				visibility: AndroidVisibility.PUBLIC,
				//sound: 'order'
			},
		});

	}

	useEffect(() => {
		return notifee.onForegroundEvent(({ type, detail }) => {
			//reactotron.log({detail})
			switch (type) {
				case EventType.DISMISSED:
					console.log('User dismissed notification', detail.notification);
					break;
				case EventType.PRESS:
					console.log('User pressed notification', detail.notification);
					if (detail?.notification?.data?.type === "admin") {
						navigationRef.navigate('HomeNav')
					} 
					else if(detail?.notification?.data?.type === "Accounts"){
						navigationRef.navigate('Account')
					}
					else {
						navigationRef.navigate('Orders')
					}
					break;
			}
		});
	}, []);




	return (
		null
	)
}

export default Notification













