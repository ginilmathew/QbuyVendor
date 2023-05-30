import { StyleSheet, Text, Switch, ScrollView, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SettingsCard = ({label, leftElement, onPress, toggle}) => {
    const [isEnabled, setIsEnabled] = useState(true);
    
    const toggleSwitch = useCallback(() => {
        setIsEnabled(previousState => !previousState)
    },[])

    return (
        <TouchableOpacity 
            onPress={toggle ? toggleSwitch : onPress}
            style={styles.container}
        >
            <View style={{flex:0.1}}>
                {leftElement}
            </View>
            <View style={{flex:1}}>
                <Text style={styles.mediumText}>{label}</Text>
            </View>
            <View>
                {toggle ? <Switch
                    trackColor={{ false: '#F3F3F3', true: '#c7f2cf' }}
                    thumbColor={isEnabled ? '#58D36E' : '#707070'}
                    ios_backgroundColor="#F3F3F3"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }], marginRight:-7 }}
                /> :<Ionicons name='md-arrow-forward' color='#58D36E' size={20}/>}
            </View>
        </TouchableOpacity>
    )
}
export default SettingsCard

const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        elevation:1, 
        marginHorizontal:2, 
        shadowOpacity:0.1, 
        shadowOffset:{height:1, width:1}, 
        backgroundColor:'#fff', 
        borderRadius:10, 
        marginBottom:15, 
        alignItems:'center', 
        minHeight:40, 
        paddingHorizontal:10 
    },
    mediumText: {
        fontFamily:'Poppins-Medium', 
        fontSize:14, 
        color:'#23233C'
    }
})