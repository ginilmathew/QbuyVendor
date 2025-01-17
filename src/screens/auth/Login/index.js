import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, Alert, Keyboard, } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Toast from 'react-native-toast-message'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DeviceInfo from 'react-native-device-info';
import has from 'lodash/has'

import CommonAuthBg from '../CommonAuthBg';
import CommonInput from '../../../Components/CommonInput';
import CommonAuthHeading from '../CommonAuthHeading';
import TermsAndPrivacyText from './TermsAndPrivacyText';
import CustomButton from '../../../Components/CustomButton';
import HelpAndSupportText from './HelpAndSupportText';
import CommonTexts from '../../../Components/CommonTexts';
import AuthContext from '../../../contexts/Auth';
import LoaderContext from '../../../contexts/Loader';
import customAxios from '../../../CustomeAxios';
import reactotron from '../../../ReactotronConfig';


const Login = ({ navigation }) => {

	const loginUser = useContext(AuthContext)
	const loadingg = useContext(LoaderContext)
	let loader = loadingg?.loading

	let user = loginUser?.login



	const schema = yup.object({
		mobile: yup.string().required('Phone number is required').min(10).max(10),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});



	const register = useCallback(() => {
		navigation.navigate('Register')
	}, [])

	const onSubmit = async (data) => {

		Keyboard.dismiss()
		loadingg.setLoading(true)
		//7952124568

		let bundleId = DeviceInfo.getBundleId();
		const type = bundleId.replace("com.qbuystoreapp.", "")

		try {
			const response = await customAxios.post("auth/vendorloginotp", { ...data, type })
			if (response) {
				loginUser.setLogin(data)
				navigation.replace('Otp', { type: "login" })
			}
			loadingg.setLoading(false)
		} catch (error) {
			// console.log("error=>", error);
			loadingg.setLoading(false)
			//if (has(error, "user_exist") && !error?.user_exist) {
			if (error?.message === "Vendor Not Found") {
				Alert.alert("Vendor not found",
					`Vendor for QBUY ${type} not found, Do you want to create new one?`,
					[
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{
							text: 'Register', onPress: () => {
								loginUser.setLogin(data)
								navigation.navigate('Register')
							}
						},
					]
				)
			} else if (error?.message === "Admin Not Approved User Account.You Can Login After Admin Approval") {
				Toast.show({
					type: 'error',
					text1: "Admin approval needed for logging in!",
					visibilityTime: 2000,
				});
			} else {
				Alert.alert("Message",
					error?.message,
					[
						{
							text: 'OK',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						}
					]
				)
			}
		}
	}


	return (
		<CommonAuthBg>

			<ScrollView style={{ flex: 1, paddingHorizontal: 40, }} keyboardShouldPersistTaps="always">

				<Image
					style={styles.logo}
					source={require('../../../Images/pandaLogo.png')}
					resizeMode='contain'
				/>

				<CommonAuthHeading
					label={'Welcome'}
					mt={20}
				/>

				<CommonTexts
					label={'Sign in with your mobile for an OTP'}
					mt={2}
				/>

				<CommonInput
					leftElement
					control={control}
					error={errors.mobile}
					fieldName="mobile"
					placeholder='Mobile Number'
					inputMode={'numeric'}
					mt={20}
					maxLength={10}
					icon={<Fontisto name='mobile' color='#58D36E' size={25} />}
				/>

				<TermsAndPrivacyText />

				<CustomButton
					onPress={handleSubmit(onSubmit)}
					bg='#58D36E'
					label={'Verify'}
					mt={20}
					loading={loadingg?.loading}
				/>

				<Text style={styles.textLight}>{"Need Support to Login?"}</Text>

				<HelpAndSupportText />

				{/* <Text style={styles.textLight}>{"New to the family?"}</Text>

				<TouchableOpacity onPress={register}>
					<Text style={styles.textRegister}>{"Register Here"}</Text>
				</TouchableOpacity> */}

			</ScrollView>

		</CommonAuthBg>
	)
}

export default Login

const styles = StyleSheet.create({

	logo: {
		width: 120,
		height: 130,
		marginTop: Platform.OS === 'android' ? 100 : 130,
		alignSelf: 'center',
	},
	textLight: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		fontSize: 11,
		textAlign: 'center',
		marginTop: 20
	},
	textRegister: {
		fontFamily: 'Poppins-Bold',
		color: '#FF4646',
		fontSize: 15,
		textAlign: 'center',
	},


})