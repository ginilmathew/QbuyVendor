import { Alert, Image, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './Navigations'
import AuthProvider from './contexts/Auth/AuthContext'
import LoadProvider from './contexts/Loader/loaderContext'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';
import store from './Redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Notification from './Components/Notification'
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDtuAsjMGgYeJpAUxo8Szp_-lx76yDyjs8",
    authDomain: "qbuygreen-2185c.firebaseapp.com",
    projectId: "qbuygreen-2185c",
    storageBucket: "qbuygreen-2185c.appspot.com",
    messagingSenderId: "678656967091",
    appId: "1:678656967091:web:4117872d12f5c50b79cbc6",
    measurementId: "G-HMHGCFHDZG",
    databaseURL: ""
  };
  

firebase.initializeApp(firebaseConfig)

const App = () => {
    /*     useEffect(async () => {
             await AsyncStorage.removeItem("token")
        }, [])  */

        useEffect(() => {

            async function notificationPermission(){
                if(Platform.OS === 'ios'){
                    const authStatus = await messaging().requestPermission();
                    const enabled =
                      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                  
                    if (enabled) {
                      console.log('Authorization status:', authStatus);
                    }
                }
                else{
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                }
            }

            notificationPermission()
        }, [])


       

    return (
        <Provider store={store}>
            <LoadProvider>
                <AuthProvider>
                    <Navigation />
                    <Toast
                        position='bottom'
                        bottomOffset={20}
                    />
                    <Notification />
                </AuthProvider>
            </LoadProvider>
        </Provider>
    )
}

export default App

const styles = StyleSheet.create({

})