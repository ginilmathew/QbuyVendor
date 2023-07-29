import React, { useState, useEffect, useContext } from "react";
import Context from "./index";
import customAxios from "../../CustomeAxios";
import Toast from 'react-native-toast-message'
import { mode } from "../../config/constants";
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import DeviceInfo from "react-native-device-info";
import LoaderContext from "../Loader";

const AuthProvider = (props) => {
    const [login, setLogin] = useState([]);
    const [otp, setOtp] = useState('');
    const [userData, setUserData] = useState({});
    const [fcmToken, setFcmToken] = useState(null);
    const [orderStatus, setOrderStatus] = useState([]);
    const [vendorCategoryList, setVendorCategoryList] = useState([]);
    const loading = useContext(LoaderContext)
    let bundleId = DeviceInfo.getBundleId();
    const type = bundleId.replace("com.qbuystoreapp.", "")

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

    const setPushDetails = async (data) => {
        try {
            const response = await customAxios.post("auth/update-devicetoken", data)
            if (response.data?.data) {
                getProfileDetails()
                console.log(response.data?.data);
                loading.setLoading(false)
                /* Toast.show({
                    text1: "Notification sound updated successfully",
                }); */
            }
        } catch (error) {
            loading.setLoading(false)
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
                "type": type,
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
                fcmToken,
                setOtp,
                setLogin,
                setUserData,
                getProfileDetails,
                getOrderStatus,
                venderCategories,
                setPushDetails,
                setFcmToken
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default AuthProvider;

