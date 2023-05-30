import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';

const CommonSelectDropdown = ({topLabel, mb, placeholder, data, value, onChange, search, height, mt, width, leftIcon, backgroundColor}) => {

    const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{marginBottom: mb, marginHorizontal:1, marginTop: mt, width:width}}>
        {/* {renderLabel()} */}
        <Text
            style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 11,
                marginLeft:5
            }}
        >{topLabel}</Text>
        <Dropdown
            renderLeftIcon={()=> (leftIcon)}
            style={{
                height: height ? height : 45,
                borderRadius: 8,
                paddingHorizontal: 8,
                backgroundColor: backgroundColor ? backgroundColor : '#fff',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 2,
                shadowOffset: { width: 1, height: 5 },
                marginTop:3
            }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search = {search ? search : null} 
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={!isFocus ? placeholder ? placeholder : '' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onChange}
            renderRightIcon={() => (
                <Ionicons name={ isFocus ? 'chevron-up-circle' : 'chevron-down-circle'} size={25} color={"#58D36E"} />
            )}
            itemTextStyle={styles.dropdownText}
        />    
    </View>
  )
}

export default CommonSelectDropdown

const styles = StyleSheet.create({

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 13,
        color:'#23233C'
    },
    placeholderStyle: {
        fontSize: 12,
        color:'#23233C',
        fontFamily:'Poppins-Regular'
    },
    selectedTextStyle: {
        fontSize: 12,
        fontFamily:'Poppins-Regular',
        color:'#23233C',
    },
 
    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color:'#23233C'
    },
    dropdownText: {
        fontSize: 13,
        fontFamily:'Poppins-Regular',
        color:'#23233C',
    },
})