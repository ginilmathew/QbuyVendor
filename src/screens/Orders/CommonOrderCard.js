import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal, } from 'react-native'
import React, { useState, memo, useCallback, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import CommonModal from '../../Components/CommonModal';

import CommonStatusCard from '../../Components/CommonStatusCard';
import CommonItems from './CommonItems';
import TableHeading from './TableHeading';
import TotalBill from './TotalBill';
import moment from 'moment';
import LoaderContext from '../../contexts/Loader';
import customAxios from '../../CustomeAxios';
import Toast from 'react-native-toast-message'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import reactotron from 'reactotron-react-native';
import DeviceInfo from 'react-native-device-info';
const CommonOrderCard = memo((props) => {

    const { item, onRefresh } = props

reactotron.log({item})

    const { width } = useWindowDimensions()

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState({ visible: false });
    const loadingg = useContext(LoaderContext)

    const openModal = (data) => {
        setModalVisible({ visible: true, ...data })
    }

    const closeModal = useCallback(() => {
        setModalVisible({ visible: false })
    }, [])

    const onSubmit = async () => {
        loadingg.setLoading(true)
        try {
            let bundleId = DeviceInfo.getBundleId();
            const type = bundleId.replace("com.qbuystoreapp.", "")
            const response = await customAxios.post(`vendor/order-accept`, {
                "id": item?._id,
                "status": modalVisible?.status,
                type
            })
            if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
                Toast.show({
                    text1: response?.data?.message || "Order status changed successfully !!!"
                });
            }
            onRefresh && onRefresh()
            loadingg.setLoading(false)
            closeModal()
        } catch (error) {
            console.log("error", error);
            loadingg.setLoading(false)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    const renderButton = (status) => {

     
        switch (status) {


            case "created":
                return (<View style={{ flexDirection: "row" }}>
                    <CustomButton
                        onPress={() => openModal({ title: "Are you sure you want to accept this order?", bgColor: "#576FD0", status: "pending" })}
                        label={'Accept Order'} bg='#576FD0' ml={8}
                        style={{ flex: 1 }}
                    />
                    <CustomButton
                        style={{ flex: 1 }}
                        onPress={() => openModal({ title: "Are you sure you want to cancel this order?", bgColor: "#FF7B7B", status: "cancelled" })}
                        label={'Cancel Order'} bg='#FF7B7B' mx={8}
                    />
                </View>)

            case "pending":
                return (<CustomButton
                    onPress={() => openModal({ title: "Are you sure you want to start preparing this order?", bgColor: "#C7B63E", status: "preparing" })}
                    label={'Prepare Order'} bg='#C7B63E' mx={8}
                />)

            case "preparing":
                return (<CustomButton
                    onPress={() => openModal({ title: "Are you sure you want to complete preparing this order?", bgColor: "#C7B63E", status: "ready" })}
                    label={'Order Ready'} bg='#C7B63E' mx={8}
                />)
            case "ready":
                return (<CustomButton
                    onPress={() => openModal({ title: "Are you sure you want to complete this order?", bgColor: "#58D36E", status: "completed" })}
                    label={'Complete Order'} bg='#58D36E' mx={8}
                />)

            case "completed":
                return null
            //return (<CustomButton onPress={() => navigation.navigate('Orders', { mode: 'complete' })} label={'Order Completed'} bg='#58D36E' mx={8}/>)

            case "cancelled":
                return (<CustomButton
                    onPress={() => navigation.navigate('Orders', { mode: 'complete' })}
                    label={'Order Cancelled'} bg='#FF7B7B' mx={8}
                />)
            case "readyTopickup":
                return (
                    <CustomButton
                    onPress={null}
                    label={'Ready To PickUp'} bg='#58D36E' mx={8}
                />
                )    

            default:
                return (
                    <CustomButton
                        onPress={() => { }}
                        label={status}
                        bg='#58D36E'
                    />
                )
        }
    }

    const renderStatusLabel = (status) => {
        switch (status) {
            case "created":
                return <CommonStatusCard label={status} bg='#BCE4FF' labelColor={'#0098FF'} />
            case "pending":
                return <CommonStatusCard label={status} bg='#FFF082' labelColor={'#A99500'} />
            case "completed":
                return <CommonStatusCard label={status} bg='#CCF1D3' labelColor={'#58D36E'} />
            case "cancelled":
                return <CommonStatusCard label={status} bg='#FFC9C9' labelColor={'#FF7B7B'} />
            default:
                return <CommonStatusCard label={status} bg='#FFF082' labelColor={'#A99500'} />
        }
    }

    return (
        <>
            <View style={{ marginBottom: 20, paddingHorizontal: 1 }}>
                <Text style={styles.dateText}>{moment(item?.created_at).format("DD-MM-YYYY hh:mm A")}</Text>
                <View key={item?.id} style={styles.container}>
                    <View style={styles.containerHead}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.orderIdLabel}>{"Order ID :"}</Text>
                            <Text style={styles.orderId}>{item?.order_id}</Text>
                        </View>
                     
                        {renderStatusLabel(item?.order_status)}
                    </View>

                    <TableHeading />

                    {item?.product_details?.map((item, index) => (<CommonItems item={item} key={index} />))}

                    {/* <TotalBill value={item?.total_amount} label="Item Total" containerStyle={{ marginTop: 0, paddingBottom: 0, paddingTop: 5 }} textStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, }} /> */}
                    {/* <TotalBill value={item?.delivery_charge} label="Delivery Fee" containerStyle={{ marginTop: 0, paddingBottom: 0, paddingTop: 5 }} textStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, }} /> */}
                    {item?.grand_total && <TotalBill value={item?.vendor_order_total_price} />}
                    {item?.order_status === "ready" ? renderButton("readyTopickup") : renderButton(item?.order_status) }
                    


                </View>
            </View>

            <CommonModal
                visible={modalVisible?.visible}
                onClose={() => closeModal()}
            >
                <Ionicons name={'ios-alert-circle'} size={40} color={'#FF0000'} alignSelf='center' marginTop={-10} />
                <Text style={styles.lightText}>{modalVisible?.title || ""}</Text>
                <CustomButton
                    onPress={onSubmit}
                    label={'Confirm'}
                    bg={modalVisible?.bgColor || '#58D36E'}
                    width={width / 3.5}
                    alignSelf='center'
                    my={10}
                    loading={loadingg?.loading}
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