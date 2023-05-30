import { StyleSheet, Text, View, Modal, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { Children } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from './CustomButton'

const CommonModal = ({ onClose, visible, children, mt}) => {

    const { width } = useWindowDimensions()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            style={{}}
        >
            <View
                style={{ width: width - 30, backgroundColor: '#fff', borderRadius: 15, marginTop: mt ? mt : 250, alignSelf: 'center', shadowOffset: { height: 1, width: 1 }, elevation: 1, shadowOpacity: 0.2 }}
            >
                <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', padding: 10, zIndex:1 }}>
                    <Ionicons name={'close-circle'} size={28} color={'#000'} />
                </TouchableOpacity>
                {children}
            </View>
        </Modal>
    )
}

export default CommonModal

const styles = StyleSheet.create({})