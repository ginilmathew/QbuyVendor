import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomButton = ({ onPress, label, mt, ml, bg, width, alignSelf, disabled, my, mb, mx, leftIcon, rightIconName, loading }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                marginLeft: ml,
                marginTop: mt,
                backgroundColor: bg,
                borderRadius: 13,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 40,
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 5,
                width: width,
                alignSelf: alignSelf,
                marginVertical: my,
                marginBottom: mb,
                marginHorizontal: mx,
                flexDirection:'row'
            }}
            disabled={disabled}
        >
            {leftIcon}
            {!loading ? <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 15, marginTop: Platform.OS === 'android' ? 4 : 1 }}>{label}</Text> : <ActivityIndicator color={'#fff'}/>}
            {rightIconName&&<Ionicons name={rightIconName} color='#fff' size={25} position='absolute' right={15}/>}
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})