import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderHistoryDetailsBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topBoxLeft}>
                    <Text style={styles.titleText}>Total Orders</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#1675C8'}}>5000</Text>
                </View>
         
                <View style={styles.topBoxRight}>
                    <Text style={styles.titleText}>Total Earnings</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#2EA10C'}}>12500</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomBoxLeft}>
                    <Text style={styles.titleText}>Promotion Cost</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#FF7B7B'}}>2300</Text>
                </View>
                <View style={styles.bottomBoxRight}>
                    <Text style={styles.titleText}>Total Payable</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#2EA10C'}}>12300</Text>
                </View>
            </View>
        </View>
    )
}

export default OrderHistoryDetailsBox

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowOffset: { height: 1, width: 1 },
        marginVertical: 15,
        elevation: 1,
        marginHorizontal: 1,
        height: 150,
        padding: 10
    },
    top: { 
        flex: 0.5, 
        borderBottomWidth: 1, 
        borderColor: '#F3F3F3', 
        flexDirection: 'row', 
        paddingBottom: 5 
    },
    topBoxLeft: { 
        flex: 0.5, 
        borderRightWidth: 1, 
        borderColor: '#F3F3F3', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    topBoxRight: { 
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    bottom: { 
        flex: 0.5, 
        flexDirection: 'row', 
        paddingTop: 5 
    },
    bottomBoxLeft: { 
        flex: 0.5, 
        borderRightWidth: 1, 
        borderColor: '#F3F3F3', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    bottomBoxRight: { 
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    titleText: {
        fontFamily:'Poppins-Regular', 
        fontSize:12, 
        color:'#000000'
    }
})