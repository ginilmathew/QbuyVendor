import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ChooseSound = ({onPress, selected, item}) => {
    
    const [play, setPlay] = useState(false)

    const action = useCallback(() => {
        setPlay(!play)
    }, )
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
        >
            <Ionicons name={selected === item?._id ? 'ios-radio-button-on' : 'ios-radio-button-off'} color = {'#58D36E'} size={20}/>
            <View style={{flexDirection:'row', alignItems:'center',  flex:1}}>
                <Text   
                    style={{
                        color: '#23233C',
                        fontFamily: 'Poppins-Regular',
                        fontSize:12,
                        marginLeft:5
                    }}
                >{item?.name}</Text>
            </View>
            <TouchableOpacity
                onPress={action} 
            >
                <Ionicons name={play ? 'md-stop-circle' : 'md-play-circle' } color = {'#D122CB'} size={30} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ChooseSound

const styles = StyleSheet.create({
    container : {  
        flexDirection:'row', 
        alignItems:'center', 
        borderBottomWidth:0.5,
        paddingVertical:10,
        borderColor:'#00000029'
    },
   

})