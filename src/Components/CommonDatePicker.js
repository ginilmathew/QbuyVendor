import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import CommonTexts from './CommonTexts';

const CommonDatePicker = ({date,onConfirm, onCancel, label, openCalendar, onPress, mb, mt, pb}) => {
    return (
        <>
            <View style={{ marginTop: mt ? mt : 20, marginHorizontal:1, marginBottom:mb, paddingBottom:pb }}>
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        flexDirection: 'row',
                        minHeight: 45,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        borderRadius: 7,
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        elevation: 2,
                        shadowOffset: { width: 1, height: 1 },
                    }}
                >
                    <CommonTexts label={label} />
                    <Ionicons name={'calendar'} size={28} color={"#5261E0"} />
                </TouchableOpacity>
            </View>
            <DatePicker
                mode='date'
                modal
                open={openCalendar}
                date={date}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    )
}

export default CommonDatePicker

const styles = StyleSheet.create({})