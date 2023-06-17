import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeNav from './HomeNav'
import Orders from '../screens/Orders'

import ProductsNav from './ProductsNav'
import Account from '../screens/Account'
import SettingsNav from './SettingsNav'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeNav'
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarActiveTintColor: '#58D36E',
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#AAD1A2',
                tabBarStyle: { height: 60, position: 'absolute', bottom: 20, borderRadius: 20, marginHorizontal: 25, elevation: 1, shadowOpacity: 0.1, },
                tabBarItemStyle: { justifyContent: 'center', height: 60, },
                tabBarIcon: ({ focused, color }) => {
                    if (route.name === 'HomeNav') {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                                <Ionicons name={'home'} size={27} color={color} />
                            </View>
                        )
                    }
                    else if (route.name === 'Orders') {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                                <FontAwesome5 name={'shopping-bag'} size={26} color={color} />
                            </View>
                        )
                    } else if (route.name === 'ProductsNav') {
                        return <>
                            <Image source={focused ? require('../Images/pdtGreen.jpeg') : require('../Images/pdtLite.jpeg')} resizeMode='contain' style={{ width: 30, height: 30 }} />
                        </>
                    }
                    else if (route.name === 'Account') {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                                <MaterialCommunityIcons name={'cash'} size={35} color={color} />
                            </View>
                        )
                    }
                    else if (route.name === 'SettingsNav') {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                                <Ionicons name={'settings'} size={26} color={color} />
                            </View>
                        )
                    }
                },
            })}
        >
            <Tab.Screen name="HomeNav" component={HomeNav} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="ProductsNav" component={ProductsNav} />
            <Tab.Screen name="Account" component={Account} />
            <Tab.Screen name="SettingsNav" component={SettingsNav} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})