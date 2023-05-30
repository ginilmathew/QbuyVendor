import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import TotalCard from './TotalCard';
import CommonTexts from '../../Components/CommonTexts';
import UserImageName from './UserImageName';
import CommonOrderCard from '../Orders/CommonOrderCard';
import dark from '../../Images/dark.png'
import light from '../../Images/light.png'
import LoaderContext from '../../contexts/Loader';
import reactotron from '../../ReactotronConfig';


const Home = ({ navigation, }) => {

    const{height} = useWindowDimensions()

    const loadingg = useContext(LoaderContext)


    const orders = [
        {
            id: '1',
            customerName: 'Raj',
            addr: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
            name: '#10765',
            hotel: [
                {
                    id: '1',
                    name: 'Brinjal',
                    qty: 1,
                    rate: 120
                },
                {
                    id: '2',
                    name: 'Tomato',
                    qty: 1,
                    rate: 110

                },


            ],
        },
        {
            id: '2',
            name: '#87452',
            hotel: [
                {
                    id: '1',
                    name: 'Cabbage',
                    qty: 1,
                    rate: 150

                },
            ],
        },
        {
            id: '3',
            name: '#87452',
            hotel: [
                {
                    id: '1',
                    name: 'Cabbage',
                    qty: 1,
                    rate: 150

                },
            ],
        },
        {
            id: '4',
            name: '#87452',
            hotel: [
                {
                    id: '1',
                    name: 'Cabbage',
                    qty: 1,
                    rate: 150

                },
            ],
        },

    ]


    const ViewAllOrders = useCallback(() => {
        navigation.navigate('Orders')
    }, [])

    return (
        <>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>

                <ScrollView 
                    style={{ backgroundColor: '#fff', paddingHorizontal: 15, }} 
                    showsVerticalScrollIndicator={false}
                >
                    <UserImageName/>
                    <TotalCard label={'Orders Today'} count={251} bg='#58D36E' bgImg={light}/>
                    <TotalCard label={'Revenue'} count={'₹ 5250'} bg='#58D39D' bgImg={dark}/>
                    <View style={styles.newOrders}>
                        <CommonTexts label={'New Orders'} fontSize={18} />
                        <TouchableOpacity onPress={ViewAllOrders}>
                            <Text style={styles.viewAllText}>{"View All >>"}</Text>
                        </TouchableOpacity>
                    </View>
                    {orders?.map((item)=>(
                        <CommonOrderCard key={item?.id} item={item}/>
                    ))}
                    <View style={{height:80}}/>
                </ScrollView>

            </SafeAreaView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
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
    viewAllText: {
        fontFamily: 'Poppins-Medium',
        color: '#118826',
        fontSize: 11,
    },

    newOrders: { 
        flexDirection: 'row', 
        marginTop: 10, 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom:10
    }
})