import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, Keyboard, } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DeviceInfo from 'react-native-device-info';

import CommonAuthBg from '../CommonAuthBg';
import CommonInput from '../../../Components/CommonInput';
import CustomButton from '../../../Components/CustomButton';
import CommonAuthHeading from '../CommonAuthHeading';
import CommonTexts from '../../../Components/CommonTexts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import customAxios from '../../../CustomeAxios';
import AuthContext from '../../../contexts/Auth';
import CommonMultiSelectDropdown from '../../../Components/CommonMultiSelectDropdown';
import Toast from 'react-native-toast-message';

const Register = ({ navigation }) => {

	const [selectedCategories, setSelectedCategory] = useState([]);
	const { vendorCategoryList, login } = useContext(AuthContext)
	const schema = yup.object({
		vendor_name: yup.string().required('Vendor name is required'),
		vendor_email: yup.string().email().required('Vendor email is required'),
		store_name: yup.string().required('Store name is required'),
		location: yup.string().required('Location is required'),
		license_number: yup.string().required('License number is required'),
		category_id: yup.array().of(yup.string()).min(1).required("Category is required")
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue, setError, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});


	const onLogin = useCallback(() => {
		navigation.navigate('Login')
	}, [])

	const onSubmit = async (data) => {

		Keyboard.dismiss()

		let bundleId = DeviceInfo.getBundleId();
		const type = bundleId.replace("com.qbuystoreapp.", "")
		let category_id = []
		vendorCategoryList.map(item => {
			if (data.category_id.includes(item._id)) {
				category_id.push({ id: item?._id, name: item?.name, image: item?.image })
			}
		})
		try {
			const response = await customAxios.post(`auth/vendorregister`, {
				"vendor_name": data?.vendor_name,
				"vendor_email": data?.vendor_email,
				"vendor_mobile": login?.mobile,
				"store_name": data?.store_name,
				"location": data?.location,
				category_id,
				"kyc_details": { "license_number": data?.license_number },
				type
			})
		
			if (response?.status) {
				navigation.replace('Otp', { type: "register" })
			}
		} catch (error) {
			Toast.show({
                type: 'error',
                text1: JSON.parse(error)
            });

		}
	}

	return (
		<CommonAuthBg>

			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 40, }} keyboardShouldPersistTaps="always">

				<Image
					style={styles.logo}
					source={require('../../../Images/pandaLogo.png')}
					resizeMode='contain'
				/>

				<CommonAuthHeading
					label={'Join Our Fam!'}
					mt={15}
				/>
				<CommonTexts
					label={'Fill in the required details to register'}
					mt={2}
				/>
				<CommonInput
					leftElement
					control={control}
					error={errors.vendor_name}
					fieldName="vendor_name"
					placeholder='Vendor Name'
					//inputMode={'none'}
					mt={20}
					icon={<Ionicons name='person' color='#58D36E' size={25} />}
				/>
				<CommonInput
					leftElement
					control={control}
					error={errors.vendor_email}
					fieldName="vendor_email"
					placeholder='Vendor Email'
					inputMode={'email'}
					mt={20}
					icon={<Ionicons name='mail' color='#58D36E' size={25} />}
				/>
				<CommonInput
					leftElement
					control={control}
					error={errors.store_name}
					fieldName="store_name"
					placeholder='Store Name'
					//inputMode={'none'}
					mt={20}
					icon={<Image source={require('../../../Images/storeIcon.jpeg')} style={{ width: 25, height: 25 }} resizeMode='contain' />}
				/>
				<CommonInput
					leftElement
					control={control}
					error={errors.location}
					fieldName="location"
					placeholder='Store Address'
					mt={20}
					icon={<Ionicons name='location' color='#58D36E' size={25} />}
				/>
				{/* <CommonSelectDropdown
					data={data}
					value={values}
					// setValue={setValues}
					placeholder='Store Category'
					leftIcon={<MaterialCommunityIcons name='shape' color='#58D36E' size={22} marginRight={10} marginLeft={-3} />}
					mt={7}
					onChange={item => {
						setValue('type', item?.value)
					}}
				/> */}
				<CommonMultiSelectDropdown
					data={vendorCategoryList}
					placeholder='Category'
					mt={7}
					leftIcon={<MaterialCommunityIcons name='shape' color='#58D36E' size={22} marginRight={10} marginLeft={-3} />}
					labelField="name"
					valueField="_id"
					value={selectedCategories}
					onChange={value => {
						setSelectedCategory(value)
						setValue("category_id", value)
						clearErrors()
					}}
					error={errors.category_id}
				/>
				<CommonInput
					leftElement
					control={control}
					error={errors.license_number}
					fieldName="license_number"
					placeholder='License Number'
					//inputMode={'none'}
					mt={20}
					icon={<Entypo name='v-card' color='#58D36E' size={18} marginTop={1.5} />}
				/>

				<CustomButton
					onPress={handleSubmit(onSubmit, err => console.log(err))}
					bg='#58D36E'
					label={'Register'}
					mt={30}
				/>

				{/* <Text style={styles.lightText}>Already part of the Qbuy Panda family?</Text><TouchableOpacity onPress={onLogin}>
					<Text style={styles.textBold}>{"Login Here"}</Text>
				</TouchableOpacity>*/}
			</ScrollView>
		</CommonAuthBg>
	)
}

export default Register

const styles = StyleSheet.create({
	logo: {
		width: 70,
		height: 80,
		marginTop: Platform.OS === 'android' ? 30 : 50,
		alignSelf: 'center',
	},
	textStyle: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		fontSize: 11,
		textAlign: 'center',
		marginTop: 50
	},
	textBold: {
		fontFamily: 'Poppins-Bold',
		color: '#FF4646',
		fontSize: 15,
		textAlign: 'center',
		marginTop: 10
	},
	lightText: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		textAlign: 'center',
		fontSize: 11,
		marginTop: 30
	},
	tabContainer: {
		marginTop: 20,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between'
	},
	border: {
		backgroundColor: '#00000014',
		height: 2,
		marginTop: -1.5
	}
})