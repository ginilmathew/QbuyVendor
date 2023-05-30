import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TotalBill = ({total}) => {
  return (
    <View
        style={{ flexDirection: 'row', marginHorizontal: 10, borderTopWidth: 0.5, borderColor: '#00000029', justifyContent: 'space-between', marginTop: 7, paddingVertical: 7 }}
    >
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C', }}>Total Bill</Text>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#2EA10C' }}>₹ {total}</Text>
    </View>

  )
}

export default TotalBill

const styles = StyleSheet.create({})