import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useContext, useEffect } from 'react';
import reactotron from 'reactotron-react-native';
import AuthContext from '../contexts/Auth';


const Notification = () => {

    const auth = useContext(AuthContext)

    // useEffect(() => {
    //     onAppBootstrap()
    //     messaging().onMessage(onMessageReceived);
    //     //messaging().setBackgroundMessageHandler(onMessageReceived);
    // }, [])


    async function onAppBootstrap() {
        // Register the device with FCM
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
            importance: AndroidImportance.DEFAULT,
            visibility: AndroidVisibility.PUBLIC
        });
      
        // Get the token
        const token = await messaging().getToken();
        auth.setFcmToken(token)
    
        reactotron.log({token}, "Notification Token")
      
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
                channelId: message?.notification?.android?.channelId,
                vibration: true,
                sound:'order',
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
      
   
    

  return (
    null
  )
}

export default Notification













