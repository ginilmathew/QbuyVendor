import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../../contexts/Auth'
import { IMG_URL } from '../../config/constants'

const UserImageName = () => {
    const { userData } = useContext(AuthContext)
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 15, }}>
            <Image
                style={styles.imgBox}
                source={{ uri: IMG_URL + userData?.original_store_logo }} alt='img'
            />
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.textRegular}>{"Welcome"}</Text>
                <Text style={styles.textBold}>{userData?.store_name}</Text>
                <Text style={[styles.textRegular, { fontSize: 12 }]}>{userData?.vendor_name}</Text>
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