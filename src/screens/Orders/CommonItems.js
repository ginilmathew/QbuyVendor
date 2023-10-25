import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import reactotron from 'reactotron-react-native'

const CommonItems = memo(({ item }) => {

    reactotron.log(item, "Attribute")

    return (
        <View style={{ flexDirection: 'row', borderColor: '#00000029', marginHorizontal: 10 }}>

            {item?.variants?.title || item?.attributes?.name ? (<View style={{ flex: 0.5 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>{item?.name} ({item?.variants?.title} {item?.attributes?.name})</Text>
            </View>) : (<View style={{ flex: 0.5, }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>{item?.name}</Text>
            </View>)}

            <View style={{ flex: 0.3, alignItems: "center" }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C', flex: 0.4 }}>{item?.quantity}</Text>
            </View>
            <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>₹ {item?.vendor_seller_price}</Text>
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