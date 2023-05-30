import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const UserImageName = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Image
                style={styles.imgBox}
                source={require('../../Images/vegies.png')} alt='img'
            />
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.textRegular}>{"Welcome"}</Text>
                <Text style={styles.textBold}>{"Jacob FarmHouse..."}</Text>
            </View>
        </View>
    )
}

export default UserImageName

const styles = StyleSheet.create({
    imgBox: { 
        width: 80, 
        height: 80, 
        borderRadius: 12, 
        marginTop: 15 
    },
    textBold: {
        fontFamily: 'Poppins-Bold',
        color: '#FF4646',
        fontSize: 18,
    },
    textRegular: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 18,
    },
})