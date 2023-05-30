import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonInput from '../../../Components/CommonInput';
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown';
import CustomButton from '../../../Components/CustomButton';


const AddNewProduct = ({ navigation }) => {

    const { width } = useWindowDimensions()

	const [filePath, setFilePath] = useState(null);
    const [values, setValues] = useState(null);

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        price: yup.string().required('Price is required'),

    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });



    const data = [
        { label: 'Vegetable', value: '1' },
        { label: 'Fruit', value: '2' },
        { label: 'Fertilizer', value: '3' },
    ];

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
                setFilePath(res)
            }
        });
    },[])

    const onSubmit = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Add New Product'} backAction />
            <ScrollView style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal:15 }}>

                <TouchableOpacity
                    onPress={imageGalleryLaunch}
					style={styles.imageContainer}
				>
					{filePath ? <Image
						style={{ width: '100%', height: 200, borderRadius: 20 }}
						alignSelf='center'
						source={{ uri: Platform.OS === 'android' ? filePath?.assets?.[0]?.uri : filePath?.assets?.[0]?.uri}} alt='img'
					/> :
						<View style={{marginTop:50}}>
						
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


                <CommonInput
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    backgroundColor='#F2F2F2'
                    topLabel={'Product Name'}
                    top={15}
                />
                <CommonSelectDropdown
                    topLabel={'Category'}
                    data={data}
                    value={values}
                    setValue={setValues}
                    backgroundColor='#F2F2F2'
                    mt={15}
                />
                <CommonInput
                    control={control}
                    error={errors.price}
                    fieldName="price"
                    backgroundColor='#F2F2F2'
                    topLabel={'Price'}
                    top={15}
                    rightIcon={<Text style={{fontFamily:'Poppins-ExtraBold', fontSize:30, color:'#58D36E'}}>₹</Text>}
                />

                <CustomButton label={'Submit'} bg='#58D36E' mt={25} onPress={onSubmit}/>

               
                        

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
        backgroundColor:'#F2F2F2',
        height: 200,
	},
	openCam: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
        marginTop:10
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
 
})