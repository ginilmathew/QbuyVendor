import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TableHeading = () => {
  return (
    <View
        style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomWidth: 0.5, borderColor: '#00000029', paddingBottom: 3, marginVertical: 5 }}
    >
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C', flex: 0.75 }}>Product</Text>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C', flex: 0.4 }}>Qty</Text>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C' }}>Price</Text>
    </View>
  )
}

export default TableHeading

const styles = StyleSheet.create({})