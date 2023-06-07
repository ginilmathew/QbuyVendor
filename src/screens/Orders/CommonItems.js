import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CommonItems = memo(({ item }) => {
    return (
        <View style={{ flexDirection: 'row', borderColor: '#00000029', marginHorizontal: 10 }}>
            <View style={{ flex: 0.6 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>{item?.name}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C', flex: 0.4 }}>{item?.quantity}</Text>
            </View>
            <View style={{ flex: 0.1 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>₹ {item?.unitPrice}</Text>
            </View>
        </View>
    )
})

export default CommonItems

const styles = StyleSheet.create({
    mediumText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10
    }
})