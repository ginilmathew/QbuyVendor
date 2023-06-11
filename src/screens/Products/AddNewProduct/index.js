import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonInput from '../../../Components/CommonInput';
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown';
import CustomButton from '../../../Components/CustomButton';
import AuthContext from '../../../contexts/Auth';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import customAxios from '../../../CustomeAxios';
import Toast from 'react-native-toast-message';
import { IMG_URL, mode } from '../../../config/constants';
import LoaderContext from '../../../contexts/Loader';
const AddNewProduct = ({ navigation }) => {

    const { width } = useWindowDimensions()
    const { vendorCategoryList = [] } = useContext(AuthContext)
    const { setLoading, loading } = useContext(LoaderContext)

    const [filePath, setFilePath] = useState(null);
    const [values, setValues] = useState(null);

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        price: yup.number().required('Price is required'),
        category: yup.object({
            _id: yup.string().required("Category is required"),
            name: yup.string().required("Category is required")
        }),
        image: yup.object({
            fileName: yup.string().required("Image is required"),
            uri: yup.string().required("Image is required"),
            type: yup.string().required("Image is required"),
            fileSize: yup.string(),
            height: yup.string(),
            width: yup.string(),
        })
    }).required();

    const { control, handleSubmit, formState: { errors, }, setValue, clearErrors, getValues } = useForm({
        resolver: yupResolver(schema),
    });

    const imageGalleryLaunch = useCallback(() => {
        let options = {
            title: "Select Images/Videos",
            mediaType: "mixed",
            selectionLimit: 1,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },

        };
        launchImageLibrary(options, (res) => {

            if (res.didCancel) {
                // console.log('User cancelled image picker');
            } else if (res.error) {
                setFilePath(null)
            } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
                // alert(res.customButton);
            } else {
                // const source = { uri: res.uri };
                setFilePath(res?.assets[0])
                setValue("image", res?.assets[0])
                clearErrors()
            }
        });
    }, [])

    const onSubmit = useCallback(async (data) => {
        setLoading(true)
        try {
            let body = new FormData()
            body.append("type", mode)
            body.append("store", JSON.stringify({ "_id": "646b146b1c9d7d6fac0d9463", "name": "G-Store" }))
            body.append("franchisee", JSON.stringify({ "_id": "646b12d5adbbc8eaaa0bcd15", "name": "Test Franchise" }))
            body.append("name", data.name)
            body.append("category", JSON.stringify(data.category))
            body.append("price", data.price)
            body.append("image", {
                uri: data?.image?.uri,
                type: data?.image?.type,
                name: data?.image?.fileName,
            })

            const response = await customAxios.post("vendor/product/create", body)
            if (response?.data) {
                Toast.show({
                    text1: response?.data?.message
                });
                setTimeout(() => {
                    navigation.goBack()
                }, 500);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Add New Product'} backAction />
            <ScrollView style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 15 }}>

                <TouchableOpacity
                    onPress={imageGalleryLaunch}
                    style={styles.imageContainer}
                >
                    {filePath ? <Image
                        style={{ width: '100%', height: 200, borderRadius: 20 }}
                        alignSelf='center'
                        source={{ uri: filePath?.uri }} alt='img'
                    /> :
                        <View style={{ marginTop: 50 }}>
                            <TouchableOpacity
                                onPress={imageGalleryLaunch}
                                style={styles.openCam}
                            >
                                <Ionicons name='ios-cloud-upload' color='#58D36E' size={45} />
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#707070', }}>Upload Image</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
                {!isEmpty(errors?.image?.fileName) && <Text style={styles.errorText}>{errors?.image?.fileName?.message || ""}</Text>}
                <CommonInput
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    backgroundColor='#F2F2F2'
                    topLabel={'Product Name'}
                    top={15}
                />
                <CommonSelectDropdown
                    error={errors.category?._id}
                    topLabel={'Category'}
                    data={vendorCategoryList}
                    value={getValues("category")}
                    backgroundColor='#F2F2F2'
                    mt={15}
                    labelField="name"
                    valueField="_id"
                    onChange={value => {
                        console.log(value);
                        delete value?._index
                        setValue("category", { _id: value._id, name: value?.name })
                        clearErrors()
                    }}
                />
                <CommonInput
                    control={control}
                    error={errors.price}
                    fieldName="price"
                    backgroundColor='#F2F2F2'
                    topLabel={'Price'}
                    top={15}
                    rightIcon={<Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 30, color: '#58D36E' }}>₹</Text>}
                />

                <CustomButton label={'Submit'} bg='#58D36E' mt={25} onPress={handleSubmit(onSubmit, (err) => {
                    //console.log(err);
                })}
                    loading={loading}
                />
            </ScrollView>
        </>
    )
}

export default AddNewProduct

const styles = StyleSheet.create({
    textBold: {
        fontFamily: 'Poppins-Bold',
        color: '#FF4646',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    imageContainer: {
        borderRadius: 20,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        height: 200,
    },
    openCam: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    closeBtn: {
        position: 'absolute',
        backgroundColor: "#FF4B4B",
        borderRadius: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        right: -12,
        zIndex: 1,
        top: -15
    },
    unableSubmit: {
        fontFamily: 'Poppins-Light',
        color: '#8D8D8D',
        textAlign: 'center',
        fontSize: 11,
        marginTop: 40
    },
    logo: {
        width: 100,
        height: 150,
        alignSelf: 'center',
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 11,
    }
})