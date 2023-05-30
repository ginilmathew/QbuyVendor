import { ImageBackground, NativeModules, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import CommonAuthBg from '../auth/CommonAuthBg';


const SplashScreen = ({ navigation }) => {

    return (
        <CommonAuthBg>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}>
                <Image
                    style={styles.logo}
                    source={require('../../Images/storeApp.png')}
                    resizeMode='contain'
                />
            </View>
        </CommonAuthBg>
    )
}

export default SplashScreen

const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 250,
        alignSelf: 'center',
    },
})