import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

const OrderHistoryCard = memo(({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.semiboldText}>Order ID {'#10765'}</Text>
                <Text style={styles.dateText}>{'22/05/2022 10:30am'}</Text>
            </View>
            <View style={styles.totalDetails}>
                <Text style={styles.semiboldText}>{'Total Bill'}</Text>
              
                <Text style={styles.boldText}>+ ₹ {item?.rate}</Text>
            </View>
        </View>
    )
})

export default OrderHistoryCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowOffset: { height: 1, width: 1 },
        marginBottom: 10,
        elevation: 1,
        marginHorizontal: 2,
        paddingBottom: 5
    },
    header: {
        flexDirection: 'row',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
        color: '#23233C'
    },
    totalDetails: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 9,
        color: '#23233C'
    },
    boldText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#2EA10C'
    },
    semiboldText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#23233C'
    },
    cod:{
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#EC4949',
        paddingHorizontal:20,
        paddingVertical:2
    }


})