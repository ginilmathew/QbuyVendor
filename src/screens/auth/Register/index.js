import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonAuthBg from '../CommonAuthBg';
import CommonInput from '../../../Components/CommonInput';
import CustomButton from '../../../Components/CustomButton';
import CommonAuthHeading from '../CommonAuthHeading';
import CommonTexts from '../../../Components/CommonTexts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonPicker from '../../../Components/CommonPicker';
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown';
import SelectTab from '../../../Components/SelectTab';


const Register = ({ navigation }) => {

	const [values, setValues] = useState(null);

	const data = [
		{ label: 'Green', value: 'green' },
		{ label: 'Fashion', value: 'fashion' },
		{ label: 'Panda', value: 'panda' },
	];

	const schema = yup.object({
		vendor_name: yup.string().required('Vendor name is required'),
		vendor_email: yup.string().email().required('Vendor name is required'),
		storeName: yup.string().required('Store name is required'),
		location: yup.string().required('Location is required'),
		ownerName: yup.string().required('Owner name is required'),
		lNumber: yup.string().required('License number is required'),
		storeCategory: yup.string().required('Store category is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
		resolver: yupResolver(schema)
	});


	const onLogin = useCallback(() => {
		navigation.navigate('Login')
	}, [])

	const onSubmit = useCallback((data) => {

		let datas = {
			storeName: data?.storeName,
			location: data?.location,
			ownerName: data?.ownerName,
			storeCat: data?.storeCategory,
			lNumber: data?.lNumber
		}

		console.log({ datas })
		navigation.navigate('Login')

	}, [])


	return (
		<CommonAuthBg>

			<ScrollView style={{ flex: 1, paddingHorizontal: 40, }}>

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
					inputMode={'numeric'}
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
					inputMode={'numeric'}
					mt={20}
					icon={<Image source={require('../../../Images/storeIcon.jpeg')} style={{ width: 25, height: 25 }} resizeMode='contain' />}
				/>
				<CommonInput
					leftElement
					control={control}
					error={errors.location}
					fieldName="location"
					placeholder='Location'
					mt={20}
					icon={<Ionicons name='location' color='#58D36E' size={25} />}
				/>
				<CommonSelectDropdown
					data={data}
					value={values}
					// setValue={setValues}
					placeholder='Store Category'
					leftIcon={<MaterialCommunityIcons name='shape' color='#58D36E' size={22} marginRight={10} marginLeft={-3} />}
					mt={7}
					onChange={item => {
						setValues(item.label);
						setValue('storeCategory', item.label)
						setError('storeCategory', '')
					}}
				/>

				<CommonInput
					leftElement
					control={control}
					error={errors.lNumber}
					fieldName="lNumber"
					placeholder='License Number'
					inputMode={'numeric'}
					mt={20}
					icon={<Entypo name='v-card' color='#58D36E' size={18} marginTop={1.5} />}
				/>

				<CustomButton
					onPress={handleSubmit(onSubmit)}
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