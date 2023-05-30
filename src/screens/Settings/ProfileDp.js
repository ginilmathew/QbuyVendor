import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CommonTexts from '../../Components/CommonTexts'

const ProfileDp = ({item}) => {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 100, height: 100, borderRadius: 12 }}
                source={require('../../Images/vegies.png')} alt='img'
            />
            <View style={{ marginLeft: 8, justifyContent: 'space-evenly',}}>
                <CommonTexts label={'Jacob FarmHouse'} fontSize={20} />
                <View >
                    <Text style={styles.regularText}>ID : {'#638237'}</Text>
                    <Text style={styles.regularText}>Franchisee : {'Qbuy Kollam'}</Text>
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
        marginBottom:15 
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 11, 
        color: '#8D8D8D',
        marginBottom:1.5
    }
})