import React, { useState, useEffect } from "react";
import Context from "./index";
import customAxios from "../../CustomeAxios";
import Toast from 'react-native-toast-message'
import { mode } from "../../config/constants";
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

const AuthProvider = (props) => {
    const [login, setLogin] = useState([]);
    const [otp, setOtp] = useState('');
    const [userData, setUserData] = useState({});
    const [orderStatus, setOrderStatus] = useState([]);
    const [vendorCategoryList, setVendorCategoryList] = useState([]);

    const getProfileDetails = async () => {
        try {
            const response = await customAxios.get("vendor/profile")
            setUserData(response?.data?.data)
        } catch (error) {
            console.log("error<=>", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    const getOrderStatus = async () => {
        try {
            const response = await customAxios.get("common/order-status-list")
            setOrderStatus(response?.data?.data)
        } catch (error) {
            console.log("error<=>", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    const venderCategories = async () => {
        try {
            const response = await customAxios.post("vendor/categories", {
                "type": userData?.type,
            })
            if (response && has(response, "data.data")) {
                setVendorCategoryList(response?.data?.data)
            }
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    return (
        <Context.Provider
            value={{
                ...props,
                login,
                otp,
                userData,
                orderStatus,
                vendorCategoryList,
                setOtp,
                setLogin,
                setUserData,
                getProfileDetails,
                getOrderStatus,
                venderCategories
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default AuthProvider;

