import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CommonAuthBg = ({children}) => {
    return (
        <ImageBackground 
            style={styles.container} 
            source={require('../../Images/authBg.png')}
        >
            {children}
        </ImageBackground>
    )
}

export default CommonAuthBg

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    }
})