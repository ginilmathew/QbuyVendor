import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CommonSquareButton = ({position, bottom, mt, right, onPress, iconName}) => {

    return (
        <TouchableOpacity
            style={{
                width: 45,
                height: 45,
                backgroundColor: '#58D36E',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: mt,
                position: position,
                bottom: bottom, 
                right: right
            }}
            onPress= {onPress}
        >
            <Ionicons name={iconName} color='#fff' size={30}  marginLeft={2}/>

        </TouchableOpacity>
    )
}

export default CommonSquareButton

const styles = StyleSheet.create({})