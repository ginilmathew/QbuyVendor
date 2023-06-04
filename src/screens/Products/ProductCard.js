import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback, memo } from 'react'
import CommonTexts from '../../Components/CommonTexts'
import  Toast  from 'react-native-toast-message';
import customAxios from '../../CustomeAxios';

const ProductCard = memo(({ item }) => {

    const [isEnabled, setIsEnabled] = useState(item?.status == "active");

    const toggleSwitch = (data) => {
        setIsEnabled(!isEnabled)
        handleStatus()
    };

    const handleStatus = async () => {
        try {
            const response = await customAxios.post("vendor/product/status", {
                "product_id": item?._id,
                "status": isEnabled ? "inactive" : "active"
            })
            console.log("response->", response?.data?.data);
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    return (
        <View
            style={{ padding: 15, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#00000014' }}
        >
            <Image
                style={{ width: 70, height: 70, borderRadius: 10, }}
                source={require('../../Images/tomato.jpeg')}

            />
            <View style={{ justifyContent: 'space-between', marginLeft: 10, flex: 1 }}>
                <View>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: isEnabled ? '#23233C' : '#A5A5A5' }}>{item?.name}</Text>
                    <Text style={{ fontFamily: 'Poppins-LightItalic', fontSize: 13, color: isEnabled ? '#23233C' : '#A5A5A5' }}>{/* Vegetables */}{item?.category}</Text>
                </View>
                <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 14, color: isEnabled ? '#089321' : '#A5A5A5' }} > ₹ {/* 48 */}{item?.regular_price}</Text>
            </View>

            {item?.status ? <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity>
                    <CommonTexts label={'EDIT'} color='#089321' fontSize={13} />
                </TouchableOpacity>
                <Switch
                    trackColor={{ false: '#f0c9c9', true: '#c7f2cf' }}
                    thumbColor={isEnabled ? '#58D36E' : '#D35858'}
                    ios_backgroundColor="#f0c9c9"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
            </View> :
                <View style={{ flex: 0.7, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <CommonTexts label={item?.status} color={item?.status === 'active' ? '#3FB415' : '#B48415'} />
                </View>}

        </View>
    )
})

export default ProductCard

const styles = StyleSheet.create({})