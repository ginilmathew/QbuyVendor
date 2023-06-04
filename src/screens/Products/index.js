import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import CommonDatePicker from '../../Components/CommonDatePicker'
import SelectTab from '../../Components/SelectTab';
import CustomSearch from '../../Components/CustomSearch';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FilterBox from '../Orders/FilterBox';
import CommonTexts from '../../Components/CommonTexts';
import ProductCard from './ProductCard';
import CommonSquareButton from '../../Components/CommonSquareButton';
import { useNavigation } from '@react-navigation/native';
import customAxios from '../../CustomeAxios';
import Toast from 'react-native-toast-message';

const Products = ({ navigation }) => {

    const { width } = useWindowDimensions()
    const [currentTab, setCurrentTab] = useState(0)
    const [selected, setSelected] = useState(0)

    const [filterResult, setFilterList] = useState([])

    const [filterHistoryList, setFilterHistoryList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState([])




    // const navigation = useNavigation()

    // console.log({pendingList})

    const schema = yup.object({
        name: yup.string().required('Name is required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const filterResults = (value) => {
        // let datas = product?.filter(item => item?.name?.toLowerCase().includes(value.toLowerCase())) 
        setSearchTerm(value)
        // setFilterList(datas)
    }

    const filterHistory = (value) => {
        let datas = productHistory?.filter(item => item?.name?.toLowerCase().includes(value.toLowerCase()))
        setFilterHistoryList(datas)
    }
    const productSearch = async () => {
        try {
            const response = await customAxios.post("vendor/product/search", {
                "type": "green",
                "search": searchTerm
            })
            console.log("response->", response?.data?.data);
            setFilterList(response?.data?.data)

        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }
    const venderCategories = async () => {
        try {
            const response = await customAxios.post("vendor/categories", {
                "type": "green",
            })
            console.log("response<->", response?.data?.data);
            if (response?.data) {
                setFilter(response?.data?.data)
                setSelected(response?.data?.data[0])
                setTimeout(() => {
                    productListing(response?.data?.data[0])
                }, 500)
            }



        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }
    const productListing = async (selected) => {
        try {
            const response = await customAxios.post("vendor/product/list", {
                "type": "green",
                "category_id": selected?._id
            })
            console.log("response->", response?.data?.data);
            setFilterList(response?.data?.data)

        } catch (error) {
            console.log("error-", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }
    const handleCategory = (item) => {
        setSelected(item)
        productListing(item)
    }

    useEffect(() => {
        // setFilterList(product)
        setFilterHistoryList(productHistory)
        venderCategories()
    }, [/* product, */ productHistory])

    useEffect(() => {
        if (searchTerm == "") {
            // setFilterList(product)
            venderCategories()
        }
    }, [searchTerm])



    // let filter = [
    //     {
    //         name: 'Fruits'
    //     },
    //     {
    //         name: 'Vegetables'
    //     },
    //     {
    //         name: 'Seeds'
    //     },
    //     {
    //         name: 'Fertilizers'
    //     },
    //     {
    //         name: 'Plants'
    //     },
    // ]

    // let product = [
    //     {
    //         id: '1',
    //         name: 'Tomato (500gm)',
    //         date: '22/05/2022',
    //         regular_price: 10,
    //         category: "Vegetables"
    //     },
    //     {
    //         id: '2',
    //         name: 'Potato (1kg)',
    //         date: '28/03/2022',
    //         regular_price: 10,
    //         category: "Vegetables"
    //     },
    //     {
    //         id: '3',
    //         name: 'Brinjal (1kg)',
    //         date: '12/11/2022',
    //         regular_price: 10,
    //         category: "Vegetables"
    //     },
    //     {
    //         id: '1',
    //         name: 'Tomato (500gm)',
    //         date: '22/05/2022',
    //         regular_price: 10,
    //         category: "Vegetables"
    //     },
    //     {
    //         id: '2',
    //         name: 'Potato (1kg)',
    //         date: '28/03/2022',
    //         regular_price: 10,
    //         category: "Vegetables"
    //     },
    //     {
    //         id: '3',
    //         name: 'Brinjal (1kg)',
    //         date: '12/11/2022',
    //         regular_price: 10,
    //         category: "Vegetables"
    //     },
    // ]


    let productHistory = [
        {
            id: '1',
            name: 'Tomato (500gm)',
            date: '22/05/2022',
            status: 'Pending Approval'
        },
        {
            id: '2',
            name: 'Potato (1kg)',
            date: '28/03/2022',
            status: 'Approved'

        },


    ]


    const selectCurrentPdt = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectPdtHistory = useCallback(() => {
        setCurrentTab(1)
    }, [])

    const addNewProduct = useCallback(() => {
        navigation.navigate('AddNewProduct')
    }, [])




    return (
        <>
            <HeaderWithTitle title={'Products'} />
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                    <SelectTab
                        label={"Current Products"}
                        onPress={selectCurrentPdt}
                        selected={currentTab === 0 ? true : false}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                    <SelectTab
                        label={"Product History"}
                        onPress={selectPdtHistory}
                        selected={currentTab === 1 ? true : false}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                </View>
                <View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5, marginHorizontal: 15 }} />

                {currentTab === 0 &&
                    <>
                        <CustomSearch
                            mb={2}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            placeholder='Search...'
                            onChangeText={(value) => filterResults(value)}
                            onpress={() => productSearch()}
                        />
                        <ScrollView
                            horizontal={true}
                            style={{ marginTop: 15, backgroundColor: '#F7F7F7', paddingLeft: 10, height: 80, }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {filter?.map((item, index) => (
                                <FilterBox
                                    key={index}
                                    item={item}
                                    onPress={() => handleCategory(item)}
                                    selected={selected}
                                />
                            ))}
                        </ScrollView>
                        <Text
                            style={{ fontFamily: 'Poppins-LightItalic', fontSize: 11, color: '#23233C', textAlign: 'right', marginRight: 20 }}
                        >2 of 2 items</Text>
                        <ScrollView style={{ marginBottom: 80, height: '100%' }}>
                            {filterResult?.map((item, index) => (<ProductCard item={item} key={index} />))}
                        </ScrollView>
                        <CommonSquareButton onPress={addNewProduct} position={'absolute'} bottom={100} right={25} iconName={'add'} />
                    </>
                }
                {currentTab === 1 &&
                    <>
                        <CustomSearch
                            mb={2}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            placeholder='Search...'
                            onChangeText={(value) => filterHistory(value)}
                        />
                        <Text style={{ fontFamily: 'Poppins-LightItalic', fontSize: 11, color: '#23233C', textAlign: 'right', marginRight: 20, marginTop: 10 }}>2 of 2 items</Text>
                        <ScrollView style={{ marginBottom: 80 }}>
                            {filterHistoryList?.map((item, index) => (<ProductCard item={item} key={index} />))}

                        </ScrollView>
                    </>
                }
            </View>
        </>
    )
}

export default Products

const styles = StyleSheet.create({
    tabContainer: {
        marginTop: 15,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    border: {
        backgroundColor: '#00000014',
        height: 2,
        marginTop: -1.5,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10
    }
})