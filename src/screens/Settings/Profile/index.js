import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import CommonReadonlyBox from '../../../Components/CommonReadonlyBox'
import CommonTexts from '../../../Components/CommonTexts'
import AuthContext from '../../../contexts/Auth'
import { IMG_URL } from '../../../config/constants'

const Profile = ({ navigation }) => {

    const { width } = useWindowDimensions()
    const { userData } = useContext(AuthContext)
    return (
        <>
            <HeaderWithTitle title={'Profile'} backAction />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView style={{ backgroundColor: '#fff', marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 15, }}>
                        <View style={{ alignSelf: 'center', marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
                            <Image
                                style={{ width: 100, height: 100, borderRadius: 12 }}
                                source={{ uri: IMG_URL + userData?.original_store_logo }} alt='img'
                            />
                            <CommonTexts label={userData?.store_name} fontSize={15} mt={5} />
                            <Text style={{ fontSize: 10, color: '#909091', }}>{userData?.vendor_name}</Text>
                            <Text style={{ fontSize: 10, color: '#909091', }}>ID : #{userData?.vendor_id}</Text>
                        </View>
                        <CommonReadonlyBox
                            topLabel={'Franchisee'}
                            label={userData?.franchisee?.name}
                        />
                        <CommonReadonlyBox
                            topLabel={'Location'}
                            label={userData?.store_address}
                        />
                        <CommonReadonlyBox
                            topLabel={'Owner Name'}
                            label={userData?.vendor_name}
                        />
                        <CommonReadonlyBox
                            topLabel={'Store Name'}
                            label={userData?.store_name}
                        />
                        <CommonReadonlyBox
                            topLabel={'Phone Number'}
                            label={userData?.vendor_mobile}
                        />
                        <CommonReadonlyBox
                            topLabel={'Email'}
                            label={userData?.vendor_email}
                        />
                        <CommonReadonlyBox
                            topLabel={'Store Category'}
                            label={userData?.category_id.map((item) => item.name).join(", ") || ""}
                        />
                    </View>
                    <View style={styles.border} />
                    <View style={{ paddingHorizontal: 15, }}>
                        <CommonTexts label={'KYC'} fontSize={12} mb={8} />
                        <CommonReadonlyBox
                            topLabel={'Aadhaar Number'}
                            label={userData?.kyc_details?.aadhar_card_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'PAN Card Number'}
                            label={userData?.kyc_details?.pan_card_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'FFSSAI'}
                            label={userData?.kyc_details?.ffsai_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'License Number'}
                            label={userData?.kyc_details?.license_number}
                        />
                    </View>
                    <View style={styles.border} />
                    <View style={{ paddingHorizontal: 15, }}>
                        <CommonTexts label={'Bank Details '} fontSize={12} mb={8} />
                        <CommonReadonlyBox
                            topLabel={'Bank Name'}
                            label={'State Bank of India'}
                        />
                        <CommonReadonlyBox
                            topLabel={'IFSC Code'}
                            label={'SBI000884'}
                        />
                        <CommonReadonlyBox
                            topLabel={'Account Number'}
                            label={'8877456544156'}
                        />
                        <CommonReadonlyBox
                            topLabel={'Account Name'}
                            label={'Ben Johnson'}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    border: {
        height: 4,
        backgroundColor: '#0D4E810D',
        marginVertical: 10
    }
})