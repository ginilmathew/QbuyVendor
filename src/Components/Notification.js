import { View, Text, Platform, Pressable, Dimensions, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import messaging from '@react-native-firebase/messaging'
import isEmpty from 'lodash/isEmpty'


const HEIGHT = Dimensions.get("window").height
const WIDTH = Dimensions.get("window").width

const inputValue = Platform.OS == "android" ? -HEIGHT * 0.15 : -HEIGHT * 0.2
const outputValue = Platform.OS == "android" ? WIDTH * 0.025 : WIDTH * 0.025 + HEIGHT * 0.05

const Notification = () => {
    const animationValue1 = useSharedValue(inputValue)
    const [notificationData, setNotificationData] = useState({})

    useEffect(() => {
        //PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        messaging().getInitialNotification().then((data) => {
            // dispatch(commonAction.setRouteName(data == null ? "Home" : { name: "Home", params: { screen: "TabScreens", params: { screen: "NotificationScreen", initial: false, } } }))
        }
        )
        getToken()
        messaging().onTokenRefresh(fcmToken => {
            console.log("fcmToken", fcmToken);
        });
        messaging().onMessage(msg => {
            setNotificationData(msg.notification)
            clearTimeout(timeOut)
            startAnimation()
            timeOut
        })
        messaging().onNotificationOpenedApp(() => {
            // navigate("NotificationScreen")
        })
    }, [])

    const timeOut = setTimeout(() => {
        if (!isEmpty(notificationData)) {
            startAnimation(outputValue, inputValue)
            setTimeout(() => {
                !isEmpty(notificationData) && setNotificationData({})
            }, 200);
        }
    }, 3500);

    const startAnimation = (startValue = inputValue, endValue = outputValue) => {
        animationValue1.value = startValue
        animationValue1.value = withTiming(endValue, { duration: 500, easing: Easing.bezier(.73, -0.67, .26, 1.69) })
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            marginTop: animationValue1.value
        };
    });

    const getToken = async () => {
        if (Platform.OS == "ios") {
            const hasPermission = await messaging().hasPermission()
            if (hasPermission == messaging.AuthorizationStatus.NOT_DETERMINED) {
                await messaging().requestPermission()
            }
        } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        }
        const firebasebToken = await messaging().getToken()
        console.log("firebasebToken", firebasebToken);
    }

    return (<Animated.View style={[{ backgroundColor: "#FFF", margin: WIDTH * 0.025, borderRadius: WIDTH * 0.025, position: "absolute", top: 0, right: 0, left: 0 }, animatedStyle]}>
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={({ nativeEvent: { velocityY } }) => {
                if (!(velocityY > 0)) {
                    clearTimeout(timeOut)
                    startAnimation(outputValue, inputValue)
                    setTimeout(() => {
                        !isEmpty(notificationData) && setNotificationData({})
                    }, 200);
                }
            }}>
                <Pressable onPress={() => {
                    clearTimeout(timeOut)
                    startAnimation(outputValue, inputValue)
                    setTimeout(() => {
                        !isEmpty(notificationData) && setNotificationData({})
                    }, 200);
                }} style={{ padding: WIDTH * 0.025 }}>
                    <Text style={[{ color: "#000", fontSize: 14 }]}>{notificationData.title}</Text>
                    <Text numberOfLines={3} style={[{ color: "#000030", fontSize: 12, marginTop: WIDTH * 0.015, lineHeight: 15 }]}>{notificationData.body}</Text>
                </Pressable>
            </PanGestureHandler>
        </GestureHandlerRootView>
    </Animated.View>)
}

export default Notification