import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CommonOrderCard from './CommonOrderCard'
import SelectTab from '../../Components/SelectTab'
import FilterBox from './FilterBox'
import OrderHistoryCard from './OrderHistoryCard'
import CommonDatePicker from '../../Components/CommonDatePicker'
import moment from 'moment';
import OrderHistoryDetailsBox from './OrderHistoryDetailsBox'

const Orders = ({ navigation, route }) => {

    const [currentTab, setCurrentTab] = useState(0)

    const [selected, setSelected] = useState(0)

    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)

    const { width, height } = useWindowDimensions()

    const mode = route?.params?.mode

    console.log({ mode })


    useEffect(() => {
        if (mode === 'complete') {
            setCurrentTab(1)
        }
    }, [mode === 'complete'])

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

    let filter = [
        {
            name: 'All'
        },
        {
            name: 'New'
        },
        {
            name: 'Preparing'
        },
        {
            name: 'Ready'
        },
        {
            name: 'Picked Up'
        },
    ]

    let orderHistory = [
        {
            id: '1',
            date: '22/05/2022',
            rate: 250
        },
        {
            id: '2',
            date: '28/03/2022',
            rate: 125
        },
        {
            id: '3',
            date: '12/11/2022',
            rate: 51
        },
        {
            id: '4',
            date: '02/03/2023',
            rate: 329
        },
        {
            id: '5',
            date: '01/02/2023',
            rate: 297
        },
    ]


    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    const selectNewOrders = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectOrderHistory = useCallback(() => {
        setCurrentTab(1)
    }, [])



    const calendarOpen = useCallback(() => {
        setOpenCalendar(true)
    }, [])

    const calendarClose = useCallback(() => {
        setOpenCalendar(false)
    }, [])

    const selectDate = useCallback((date) => {
        setOpenCalendar(false)
        setDate(date)
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Orders'} drawerOpen={openDrawer} />
            <View style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15, flex:1}}>
                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <SelectTab
                        label={"New Orders"}
                        onPress={selectNewOrders}
                        selected={currentTab === 0 ? true : false}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                    <SelectTab
                        label={"Order History"}
                        onPress={selectOrderHistory}
                        selected={currentTab === 1 ? true : false}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                </View>
                <View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5,  }} />

                {currentTab === 0 &&
                    <>
                        <ScrollView horizontal={true} style={{marginTop:5}}>
                            {filter?.map((item, index) => (
                                <FilterBox
                                    key={index}
                                    item={item}
                                    onPress={() => setSelected(item?.name)}
                                    selected={selected}
                                />
                            ))}
                        </ScrollView>
                        <ScrollView style={{ paddingTop: 15, marginBottom:80}} showsVerticalScrollIndicator={false}>
                            {orders?.map((item) => (
                                <CommonOrderCard key={item?.id} item={item} />
                            ))}
                        </ScrollView>
                    </>
                }

                {currentTab === 1 &&
                    <>
                        <CommonDatePicker
                            onPress={calendarOpen}
                            date={date ? date : new Date()}
                            label={moment(date).format("DD-MM-YYYY")}
                            openCalendar={openCalendar}
                            onConfirm={selectDate}
                            onCancel={calendarClose}
                            mt={15}
                        />
                        <ScrollView style={{ paddingTop: 10, marginBottom:80 }} showsVerticalScrollIndicator={false}>
                            <OrderHistoryDetailsBox/>
                            {orderHistory?.map((item) => (
                                <OrderHistoryCard item={item} key={item?.id} />
                            ))}
                            
                        </ScrollView>
                    </>
                }
            </View>
        </>
    )
}

export default Orders

const styles = StyleSheet.create({
    filterBox: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowOffset: { height: 1, width: 1 },
        elevation: 1,
        shadowOpacity: 0.2,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterLabel: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 10,
        paddingHorizontal: 15
    }
})