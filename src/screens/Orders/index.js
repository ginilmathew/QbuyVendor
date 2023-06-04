import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CommonOrderCard from './CommonOrderCard'
import SelectTab from '../../Components/SelectTab'
import FilterBox from './FilterBox'
import OrderHistoryCard from './OrderHistoryCard'
import CommonDatePicker from '../../Components/CommonDatePicker'
import moment from 'moment';
import OrderHistoryDetailsBox from './OrderHistoryDetailsBox'
import Toast from 'react-native-toast-message'
import LoaderContext from '../../contexts/Loader'
import customAxios from '../../CustomeAxios'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

const filter = [
    {
        name: 'All',
        value: "all"
    },
    {
        name: 'New',
        value: "new"
    },
    {
        name: 'Preparing',
        value: "preparing"
    },
    {
        name: 'Ready',
        value: "ready"
    },
    {
        name: 'Picked Up',
        value: "pickedup"
    },
]

const Orders = ({ navigation, route }) => {

    const [currentTab, setCurrentTab] = useState(0)

    const [selected, setSelected] = useState("all")

    const [date, setDate] = useState(null)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [orders, setOrders] = useState([])
    const [orderHistory, setOrderHistory] = useState({})

    const { width, height } = useWindowDimensions()
    const loadingg = useContext(LoaderContext)
    const mode = route?.params?.mode

    useEffect(() => {
        if (mode === 'complete') {
            setCurrentTab(1)
        }
    }, [mode === 'complete'])

    useEffect(() => {
        setOrders([])
        getOrdersData(selected)
    }, [selected])

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

    const getOrdersData = async (url) => {
        //loadingg.setLoading(true)
        try {
            const response = await customAxios.get(`vendor/orders/${url}`)
            if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
                // console.log(response.data);
                setOrders(response.data.data)
            }
            //  loadingg.setLoading(false)
        } catch (error) {
            console.log("error", error);
            // loadingg.setLoading(false)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    useEffect(() => {
        setOrderHistory({})
        getOrdersHistoryData(date)
    }, [date])

    const getOrdersHistoryData = async (date) => {
        //loadingg.setLoading(true)
        try {
            const response = date ? await customAxios.post(`vendor/orders-history-filter`, { date: moment(date).format("DD-MM-YYYY") }) : await customAxios.get(`vendor/orders-history`)
            if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
                // console.log(response.data);
                setOrderHistory(response.data.data)
            }
            //  loadingg.setLoading(false)
        } catch (error) {
            console.log("error", error);
            // loadingg.setLoading(false)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    return (
        <>
            <HeaderWithTitle title={'Orders'} drawerOpen={openDrawer} />
            <View style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15, flex: 1 }}>
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
                <View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5, }} />

                {currentTab === 0 &&
                    <>
                        <View>
                            <ScrollView horizontal={true} style={{ marginTop: 5 }}>
                                {filter?.map((item, index) => (
                                    <FilterBox
                                        key={index}
                                        item={item}
                                        onPress={() => setSelected(item?.value)}
                                        selected={selected}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                        <ScrollView style={{ paddingTop: 15, marginBottom: 80 }} showsVerticalScrollIndicator={false}>
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
                            label={date ? moment(date).format("DD-MM-YYYY") : null}
                            openCalendar={openCalendar}
                            onConfirm={selectDate}
                            onCancel={calendarClose}
                            mt={15}
                            clearAction={() => {
                                selectDate(null)
                            }}
                        />
                        <ScrollView style={{ paddingTop: 10, marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                            <OrderHistoryDetailsBox data={orderHistory} />
                            {orderHistory?.orders?.map((item) => (
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