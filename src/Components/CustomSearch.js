import { StyleSheet, TextInput, Image, View } from 'react-native'
import React, { useState } from 'react'

import { Controller } from 'react-hook-form'
import CommonSquareButton from './CommonSquareButton'

const CustomSearch
    = ({ placeholder, control, fieldName, error, bgColor, placeHoldeColor, icon, width, keyboardType, heights, weight, label ,mt,mb,paddingLeft,onpress,onChangeText,readonly}) => {

        const [show, setShow] = useState(true)
        const handleClick = () => setShow(!show);

        return (

            <>
            <View 
                style={{
                    backgroundColor:'#fff', 
                    borderRadius:15, 
                    marginTop: 20, 
                    shadowOpacity:0.1, 
                    shadowRadius:5,
                    elevation:2,
                    shadowOffset: {width: 1,height: 5},
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginHorizontal:20
                }}
            >
               
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            isReadOnly={readonly}
                            mt={mt}
                            mb={mb}
                            width={width}
                            onBlur={onBlur}
                            onChangeText={onChangeText?onChangeText:onChange}
                            value={value}
                            variant="unstyled"
                            // color={inputColor ? inputColor : '#fff'}
                            placeholder={placeholder}
                            backgroundColor={'#fff'}
                            placeholderTextColor={placeHoldeColor ? placeHoldeColor : '#0C256C21'}
                            borderColor={0}
                            keyboardType={keyboardType}
                            paddingLeft={20}
                            flex={1}
                            fontFamily= 'Poppins-SemiBold'
                            fontSize={12}
                            borderRadius={15}
                            color='#000'
                        />
                    )}
                    name={fieldName}
                />
                {/* <View style={styles.search}>
                    <Ionicons name='search' color='#fff'  size={25}/> 

                </View> */}
                <CommonSquareButton iconName={'search'}/>
            </View>
            {error && <Text fontFamily={"body"} fontWeight={500} color={"red.500"} fontSize={11}>{error?.message}</Text>}
            </>
        )
    }

export default CustomSearch


const styles = StyleSheet.create({
   
})