import { StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import ProfileDp from './ProfileDp';
import SettingsCard from './SettingsCard';
import Ionicons from 'react-native-vector-icons/Ionicons'


const Settings = ({ navigation }) => {

    const goProfile = useCallback(() => {
        navigation.navigate('Profile')
    }, [])

    const goNotificatnSound = useCallback(() => {
        navigation.navigate('NotificationSound')
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Settings'} />
            <ScrollView style={{flex:1, backgroundColor: '#F3F3F3', paddingHorizontal: 15,  }}>
                <ProfileDp/>
                <SettingsCard 
                    onPress={goProfile}
                    label={'Profile'} 
                    leftElement={<Ionicons name='person' color='#586DD3' size={20}/>}
                />
                <SettingsCard 
                    onPress={goNotificatnSound}
                    label={'Notification Sound'} 
                    leftElement={<Ionicons name='notifications' color='#586DD3' size={20}/>}
                />
                <SettingsCard 
                    label={'Support'} 
                    leftElement={<Ionicons name='headset' color='#586DD3' size={18}/>}
                />
                <SettingsCard
                    label={'Store Status'}
                    leftElement={<Image
                        style={styles.logo}
                        source={require('../../Images/storeBlue.jpeg')}
                        resizeMode='contain'
                    />}
                    toggle
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