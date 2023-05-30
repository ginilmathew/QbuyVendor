import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import CommonDatePicker from '../../Components/CommonDatePicker'

import DetailsBox from '../../Components/DetailsBox';
import AccountCard from './AccountCard';

const Account = ({ navigation }) => {

    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)



    let datas = [
        {
            id: '1',
            status: 'Completed',
            date : '25/05/2022 11:30am'
        },
        {
            id: '2',
            status: 'Completed',
            date : '22/01/2.23 10:25'
        },
  
      

    
    ]

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

    return (
        <>
            <HeaderWithTitle title={'Account'} drawerOpen={openDrawer} />
            <View style={{flex:1, backgroundColor: '#F3F3F3', paddingHorizontal: 15,  }}>
                <CommonDatePicker
                    onPress={calendarOpen}
                    date={ date ? date : new Date()}
                    label={moment(date).format("DD-MM-YYYY")}
                    openCalendar={openCalendar}
                    onConfirm={selectDate}
                    onCancel={calendarClose}
                />
                <DetailsBox
                    count={150000}
                    label='Total Earned'
                    alignSelf={'center'}
                />
                <DetailsBox
                    bg={'#fae1e1'}
                    bgBox={'#FF6565'}
                    count={25000}
                    label='Total Outstanding'
                    alignSelf={'center'}
                    
                />
                <ScrollView style={{ backgroundColor: '#F3F3F3', marginBottom:80,marginTop:10 }} showsVerticalScrollIndicator={false}>
                    {datas?.map((item) => (
                        <AccountCard item={item} key={item?.id} />
                    ))}
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
        marginBottom:10
    }
})