import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, SafeAreaView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import TotalCard from './TotalCard';
import CommonTexts from '../../Components/CommonTexts';
import UserImageName from './UserImageName';
import CommonOrderCard from '../Orders/CommonOrderCard';
import dark from '../../Images/dark.png'
import light from '../../Images/light.png'
import LoaderContext from '../../contexts/Loader';
import reactotron from '../../ReactotronConfig';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import customAxios from '../../CustomeAxios';
import has from 'lodash/has';
import AuthContext from '../../contexts/Auth';


const Home = ({ navigation, }) => {

    const { height } = useWindowDimensions()

    const { getProfileDetails } = useContext(AuthContext)

    const isFocused = useIsFocused()

    const [homeData, setHomeData] = useState({})
    const [refreshing, setRefreshing] = useState(false)

    const getHomeDetails = async () => {
        try {
            const response = await customAxios.get("vendor/home")
            if (response && has(response, "data.data")) {
                setHomeData(response.data.data)
            }
            setRefreshing(false)
        } catch (error) {
            setRefreshing(false)
            console.log("error=>", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    const ViewAllOrders = useCallback(() => {
        navigation.navigate('Orders')
    }, [])

    useEffect(() => {
        getHomeDetails()
    }, [isFocused])

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <UserImageName />
                <ScrollView
                    style={{ backgroundColor: '#fff', paddingHorizontal: 15, }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            getHomeDetails()
                            getProfileDetails()
                        }}
                    />}
                >
                    <TotalCard label={'Orders Today'} count={homeData?.total_order || 0} bg='#58D36E' bgImg={light} />
                    <TotalCard label={'Revenue'} count={`₹ ${homeData?.total_revenue || 0}`} bg='#58D39D' bgImg={dark} />
                    <View style={styles.newOrders}>
                        <CommonTexts label={'New Orders'} fontSize={18} />
                        <TouchableOpacity onPress={ViewAllOrders}>
                            <Text style={styles.viewAllText}>{"View All >>"}</Text>
                        </TouchableOpacity>
                    </View>
                    {homeData?.orders?.length > 0 ? homeData?.orders?.map((item) => <CommonOrderCard onRefresh={() => getHomeDetails()} key={item?.id} item={item} />) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.4 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                    </View>}
                    <View style={{ height: 80 }} />
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
        marginBottom: 10
    }
})