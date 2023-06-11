import { StyleSheet, Text, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import CommonDatePicker from '../../Components/CommonDatePicker'

import DetailsBox from '../../Components/DetailsBox';
import AccountCard from './AccountCard';
import customAxios from '../../CustomeAxios';
import Toast from 'react-native-toast-message';
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
const accountDataList={
    "total_earnings": 200,
    "settlement_list": [
        {
            "_id": "64537b1d4c28c40f10098142",
            "vendor_settlement_id": 1,
            "vendor_id": "646228ab4bf5fe2e320c3624",
            "transaction_date": "2023-05-04",
            "amount": "100",
            "payment_mode": "UPI",
            "transaction_id": "4412345",
            "updated_at": "2023-05-04T09:30:05.447000Z",
            "created_at": "2023-05-04T09:30:05.447000Z"
        },
        {
            "_id": "64537b1d4c28c40f10098143",
            "vendor_settlement_id": 1,
            "vendor_id": "646228ab4bf5fe2e320c3624",
            "transaction_date": "2023-05-04",
            "amount": "1004",
            "payment_mode": "UPI",
            "transaction_id": "4412345",
            "updated_at": "2023-05-04T09:30:05.447000Z",
            "created_at": "2023-05-04T09:30:05.447000Z"
        },
        {
            "_id": "64537b1d4c28c40f10098144",
            "vendor_settlement_id": 1,
            "vendor_id": "646228ab4bf5fe2e320c3624",
            "transaction_date": "2023-05-04",
            "amount": "1005",
            "payment_mode": "UPI",
            "transaction_id": "4412345",
            "updated_at": "2023-05-04T09:30:05.447000Z",
            "created_at": "2023-05-04T09:30:05.447000Z"
        },
        {
            "_id": "64537b1d4c28c40f10098145",
            "vendor_settlement_id": 1,
            "vendor_id": "646228ab4bf5fe2e320c3624",
            "transaction_date": "2023-05-04",
            "amount": "1009",
            "payment_mode": "UPI",
            "transaction_id": "4412345",
            "updated_at": "2023-05-04T09:30:05.447000Z",
            "created_at": "2023-05-04T09:30:05.447000Z"
        }
    ],
    "total_outstanding": 100
}

const Account = ({ navigation }) => {

    const [date, setDate] = useState(null)
    const [openCalendar, setOpenCalendar] = useState(false)
    const { width, height } = useWindowDimensions()
    const [accountData, setAccountData] = useState({})

    useEffect(() => {
        getAccountData()
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

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    useEffect(() => {
        setAccountData({})
        getAccountData(date)
    }, [date])
    const getAccountData = async (date) => {
        //loadingg.setLoading(true)
        try {
            const response = date ? await customAxios.post(`vendor/accounts-filter`, { date: moment(date).format("DD-MM-YYYY") }) : await customAxios.get(`vendor/accounts`)
            if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
                // console.log(response.data);
                // setAccountData(response.data.data)
                setAccountData(accountDataList)
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
            <HeaderWithTitle title={'Account'} drawerOpen={openDrawer} />
            <View style={{ flex: 1, backgroundColor: '#F3F3F3', paddingHorizontal: 15, }}>
                <CommonDatePicker
                    onPress={calendarOpen}
                    date={date ? date : new Date()}
                    label={date ? moment(date).format("DD-MM-YYYY") : null}
                    openCalendar={openCalendar}
                    onConfirm={selectDate}
                    onCancel={calendarClose}
                    clearAction={() => {
                        selectDate(null)
                    }}
                />
                <DetailsBox
                    count={accountData?.total_earnings || 0}
                    label='Total Earned'
                    alignSelf={'center'}
                />
                <DetailsBox
                    bg={'#fae1e1'}
                    bgBox={'#FF6565'}
                    count={accountData?.total_outstanding || 0}
                    label='Total Outstanding'
                    alignSelf={'center'}
                />
                <ScrollView style={{ backgroundColor: '#F3F3F3', marginBottom: 80, marginTop: 10 }} showsVerticalScrollIndicator={false}>
                    {accountData?.settlement_list?.length > 0 ? accountData?.settlement_list?.map((item) => (
                        <AccountCard item={item} key={item?.id} />
                    )) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.40 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                    </View>}
                </ScrollView>
            </View>
        </>
    )
}

export default Account

const styles = StyleSheet.create({
    tabContainer: {
        marginTop: 15,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    border: {
        backgroundColor: '#00000014',
        height: 2,
        marginTop: -1.5,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10
    }
})