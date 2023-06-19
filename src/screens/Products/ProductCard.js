import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect, useCallback, memo } from 'react'
import CommonTexts from '../../Components/CommonTexts'
import Toast from 'react-native-toast-message';
import customAxios from '../../CustomeAxios';
import { IMG_URL } from '../../config/constants';
import { useNavigation } from '@react-navigation/native';
import CommonStatusCard from '../../Components/CommonStatusCard';

const ProductCard = ({ item, onRefresh = () => { } }) => {

    //const [isEnabled, setIsEnabled] = useState(item?.status == "active");
    const navigation = useNavigation()
    const toggleSwitch = (value) => {
        if (item?.approval_status == "approved") {
            handleStatus(value)
        } else {
            Toast.show({
                type: 'error',
                text1: "Unable to change the status",
                text2: "Status change will be available once the Admin approves the product"
            });
        }

    };

    const handleStatus = async (value) => {
        try {
            const response = await customAxios.post("vendor/product/status", {
                "product_id": item?._id,
                "status": value ? "active" : "inactive"
            })
            //setIsEnabled(value)
            onRefresh()
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    const renderStatusLabel = (status) => {
        switch (status) {
            /*  case "created":
                 return <CommonStatusCard label={status} bg='#BCE4FF' labelColor={'#0098FF'} /> */
            case "pending":
                return <CommonStatusCard label={status} bg='#FFF082' labelColor={'#A99500'} />
            case "approved":
                return <CommonStatusCard label={status} bg='#CCF1D3' labelColor={'#58D36E'} />
            case "rejected":
                return <CommonStatusCard label={status} bg='#FFC9C9' labelColor={'#FF7B7B'} />
            default:
                return null; {/* <CommonStatusCard label={status} bg='#FFF082' labelColor={'#A99500'} /> */ }
        }
    }
    return (
        <View
            style={{ padding: 15, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#00000014' }}
        >
            <Image
                style={{ width: 70, height: 70, borderRadius: 10, }}
                source={{ uri: IMG_URL + item?.product_image }}

            />
            <View style={{ justifyContent: 'space-between', marginLeft: 10, flex: 1 }}>
                <View>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: item?.status == "active" ? '#23233C' : '#A5A5A5' }}>{item?.name}</Text>
                    <Text style={{ fontFamily: 'Poppins-LightItalic', fontSize: 13, color: item?.status == "active" ? '#23233C' : '#A5A5A5' }}>{item?.category?.name}</Text>
                </View>
                <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 14, color: item?.status == "active" ? '#089321' : '#A5A5A5' }} > ₹ {item?.seller_price}</Text>
                {renderStatusLabel(item?.approval_status)}
            </View>

            {item?.status ? <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable onPress={() => {
                    navigation.navigate('AddNewProduct', { item })
                }}>
                    <CommonTexts label={'EDIT'} color='#089321' fontSize={13} />
                </Pressable>
                <Switch
                    // disabled={item?.approval_status != "approved"}
                    trackColor={{ false: '#f0c9c9', true: '#c7f2cf' }}
                    thumbColor={item?.status == "active" ? '#58D36E' : '#D35858'}
                    ios_backgroundColor="#f0c9c9"
                    onValueChange={toggleSwitch}
                    value={item?.status == "active"}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
            </View> :
                <View style={{ flex: 0.7, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <CommonTexts label={item?.status} color={item?.status === 'active' ? '#3FB415' : '#B48415'} />
                </View>}

        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({})