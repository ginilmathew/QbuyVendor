import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import CommonTexts from '../../Components/CommonTexts'
import AuthContext from '../../contexts/Auth'
import { IMG_URL } from '../../config/constants'

const ProfileDp = ({ item }) => {
    const { userData } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 100, height: 100, borderRadius: 12 }}
                source={{ uri: IMG_URL + userData?.original_store_logo }} alt='img'
            />
            <View style={{ marginLeft: 8, justifyContent: 'space-evenly', }}>
                <CommonTexts label={userData?.vendor_name} fontSize={20} />
                <View >
                    <Text style={styles.regularText}>ID : {'#' + userData?.vendor_id}</Text>
                    <Text style={styles.regularText}>Franchisee : {userData?.store_name}</Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileDp

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        elevation: 1,
        marginHorizontal: 2,
        shadowOpacity: 0.1,
        shadowOffset: { height: 1, width: 1 },
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#8D8D8D',
        marginBottom: 1.5
    }
})