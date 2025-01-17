import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity, Platform, TextInput } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonTexts from './CommonTexts'
import { useNavigation } from '@react-navigation/native'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const HeaderWithTitle = ({ title, backAction,   onPress}) => {

    const navigation = useNavigation()

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])
    return (
        <>
            <StatusBar backgroundColor={Platform.OS === 'android' ? '#58D36E' : null} />
            <View
                style={{ backgroundColor: '#58D36E', height: Platform.OS === 'android' ? 60 : 100, flexDirection: 'row', paddingLeft: 15, alignItems: 'flex-end', }}
            >
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}
                >
                    {backAction && <TouchableOpacity onPress={ onPress ? onPress : goBack}>
                        <Ionicons name={"chevron-back"} size={30} color='#fff' />
                    </TouchableOpacity>}
            
                    <CommonTexts
                        label={title}
                        color={'#fff'}
                        fontSize={21}
                        mt={2}
                    />
                </View>
            </View>
        </>
    )
}

export default HeaderWithTitle

const styles = StyleSheet.create({})