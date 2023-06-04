import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal, } from 'react-native'
import React, { useState, memo, useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import CommonModal from '../../Components/CommonModal';

import CommonStatusCard from '../../Components/CommonStatusCard';
import CommonItems from './CommonItems';
import TableHeading from './TableHeading';
import TotalBill from './TotalBill';
import moment from 'moment';

const CommonOrderCard = memo(({ item }) => {

    const { width } = useWindowDimensions()

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState(1);

    const openModal = useCallback(() => {
        setModalVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const onSubmit = useCallback(() => {
        setModalVisible(false)
        setStatus(2)
    }, [])

    const renderButton = (status) => {
        switch (status) {
            case 1:
                return (
                    <CustomButton
                        onPress={openModal}
                        label={'Accept Order'} bg='#576FD0' mx={8}
                    />
                )

            case 2:
                return (

                    <CustomButton
                        onPress={() => setStatus(3)}
                        label={'Order Ready'} bg='#C7B63E' mx={8}
                    />
                )
            case 3:
                return (

                    <CustomButton
                        onPress={() => navigation.navigate('Orders', { mode: 'complete' })}
                        label={'Order Picked up'} bg='#FF7B7B' mx={8}
                    />

                )


            default:
                return (
                    <CustomButton
                        onPress={() => setStatus(2)}
                        label={'Confirm Restaurant'}
                        bg='#58D36E'
                    />
                )
        }
    }

    const renderStatusLabel = (status) => {
        switch (status) {
            case 1:
                return (
                    null
                )
            case 2:
                return (
                    <CommonStatusCard label={'Preparing'} bg='#BCE4FF' labelColor={'#0098FF'} />
                )
            case 3:
                return (
                    <CommonStatusCard label={'Ready'} bg='#FFF082' labelColor={'#95840C'} />
                )
            default:
                return (
                    null
                )
        }
    }
    console.log(JSON.stringify(item));
    return (
        <>
            <View style={{ marginBottom: 20, paddingHorizontal: 1 }}>
                <Text style={styles.dateText}>{moment(item?.created_at).format("DD-MM-YYYY hh:mm A")}</Text>
                <View key={item?.id} style={styles.container}>
                    <View style={styles.containerHead}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.orderIdLabel}>{"Order ID "}</Text>
                            <Text style={styles.orderId}>{item?.order_id}</Text>
                        </View>
                        {renderStatusLabel(status)}
                    </View>

                    <TableHeading />

                    {item?.product_details?.map((item, index) => (<CommonItems item={item} key={index} />))}

                    {/*  <TotalBill value={item?.total_amount} label="Item Total" containerStyle={{ marginTop: 0, paddingVertical: 0 }} textStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, }} />
                    <TotalBill value={item?.delivery_charge} label="Delivery Fee" containerStyle={{ margin: 0, paddingVertical: 5 }} textStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, }} /> */}
                    <TotalBill value={item?.grand_total} />

                    {renderButton(status)}

                </View>
            </View>

            <CommonModal
                visible={modalVisible}
                onClose={closeModal}
            >
                <Ionicons name={'ios-alert-circle'} size={40} color={'#FF0000'} alignSelf='center' marginTop={-10} />
                <Text style={styles.lightText}>{'Are you sure you want to accept this order?'}</Text>
                <CustomButton
                    onPress={onSubmit}
                    label={'Confirm'} bg='#58D36E'
                    width={width / 3.5}
                    alignSelf='center'
                    my={10}
                />
            </CommonModal>

        </>
    )
})

export default CommonOrderCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#fff',
        paddingBottom: 10,
        shadowOffset: { height: 1, width: 1 },
        elevation: 1,
        shadowOpacity: 0.2
    },
    containerHead: {
        flexDirection: 'row',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 11,
        marginBottom: 3,
        // marginLeft: 1
    },
    orderIdLabel: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10,
    },
    orderId: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        color: '#23233C'
    },

    lightText: {
        fontFamily: 'Poppins-Light',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 30
    }

})