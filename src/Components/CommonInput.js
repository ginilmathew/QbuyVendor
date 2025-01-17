import { StyleSheet, useWindowDimensions, TextInput, View, Image, Platform, Text } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { Controller } from 'react-hook-form'


const CommonInput = ({ placeholder, control, fieldName, error, inputMode, mt, icon, backgroundColor, topLabel, mb, placeholderTextColor, width, fontFamily, top, height, rightIcon, maxLength = 50, onChangeText, editable = true }) => {


    return (
        <>
            {topLabel && <Text
                style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 11,
                    marginLeft: 5,
                    marginTop: top
                }}
            >{topLabel}</Text>}
            <View
                style={{
                    backgroundColor: backgroundColor ? backgroundColor : '#fff',
                    borderRadius: 7,
                    marginTop: mt ? mt : 3,
                    // maxHeight: maxHeight ? maxHeight : 45,
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 2,
                    shadowOffset: { width: 1, height: 5 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 1,
                    marginBottom: mb
                }}
            >
                {icon && <View style={{ width: 30, alignItems: 'center' }}>
                    {icon}
                </View>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            minHeight={height ? height : 45}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#23233C'}
                            inputMode={inputMode}
                            paddingLeft={7}
                            fontFamily={fontFamily ? fontFamily : 'Poppins-Regular'}
                            fontSize={12}
                            color='#23233C'
                            width={width ? width : '100%'}
                            marginTop={Platform.OS === 'android' ? 5 : 1}
                            maxLength={maxLength}
                            editable={editable}
                        />
                    )}
                    name={fieldName}
                />
                {rightIcon && <View style={{ width: 30, alignItems: 'center', position: 'absolute', right: 5 }}>
                    {rightIcon}
                </View>}
            </View>
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
        </>

    )
}

export default memo(CommonInput);

const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 8
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 11,
    }
})
