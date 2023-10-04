import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import ProfileDp from './ProfileDp';
import SettingsCard from './SettingsCard';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AuthContext from '../../contexts/Auth';
import customAxios from '../../CustomeAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Settings = ({ navigation }) => {
    const authContext = useContext(AuthContext)
    const { userData } = authContext
    const goProfile = useCallback(() => {
        navigation.navigate('Profile')
    }, [])

    const goNotificatnSound = useCallback(() => {
        navigation.navigate('NotificationSound')
    }, [])

    const onStatusChange = useCallback(async (status) => {
        try {
            const response = await customAxios.post("vendor/store-change-status", { status: status ? "active" : "inactive" })
            console.log("response ", response.data);
            if (response?.data) {
                authContext.getProfileDetails()
                if (status === false) {
                    onLogout();
                }
            }
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }

    }, [])

    const onLogout = async () => {
        try {
            const response = await customAxios.post("auth/vendorlogout")
            if (response?.data) {
                handleLogout()
            }
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }

    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        authContext.setUserData({})
        navigation.replace('Login')
    }

    return (
        <>
            <HeaderWithTitle title={'Settings'} />
            <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3', paddingHorizontal: 15, }}>
                <ProfileDp />
                <SettingsCard
                    onPress={goProfile}
                    label={'Profile'}
                    leftElement={<Ionicons name='person' color='#586DD3' size={20} />}
                />
                <SettingsCard
                    onPress={goNotificatnSound}
                    label={'Notification Sound'}
                    leftElement={<Ionicons name='notifications' color='#586DD3' size={20} />}
                />
                <SettingsCard
                    label={'Support'}
                    leftElement={<Ionicons name='headset' color='#586DD3' size={18} />}
                />
                <SettingsCard
                    label={'Store Status'}
                    leftElement={<Image
                        style={styles.logo}
                        source={require('../../Images/storeBlue.jpeg')}
                        resizeMode='contain'
                    />}
                    toggle
                    value={userData?.status == "active"}
                    onPress={(status) => {
                        console.log("status", status);
                        onStatusChange(status)
                    }}
                />
                <SettingsCard
                    label={'Logout'}
                    showArrow={false}
                    onPress={() => {
                        Alert.alert("Logout",
                            "Are you sure you want to logout?",
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                { text: 'Logout', onPress: () => onLogout() },
                            ]
                        )
                    }}
                    leftElement={<Ionicons name='log-out' color='#586DD3' size={24} />}
                />

            </ScrollView>
        </>
    )
}

export default Settings

const styles = StyleSheet.create({

    logo: {
        width: 20,
        height: 20,
    },
})