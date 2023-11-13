/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'



const TermsAndPrivacyText = () => {

    const Url = {
        privacy: 'https://qbuypanda.com/usage/privacy',
        terms: 'https://qbuypanda.com/usage/toc',

    };


    const LinktoOpen = (url) => {
        Linking.openURL(Url[url]);
    };


    return (
        <View style={ { alignItems: 'center' } }>
            <View style={ { flexDirection: 'row', marginTop: 20 } }>
                <Text style={ styles.text1 }>{ "By Sign in, you agree to QbuyPanda's" }</Text>
                <Text style={ styles.text2 } onPress={ () => LinktoOpen('terms') }>{ " Terms of Use" }</Text>
            </View>
            <View style={ { flexDirection: 'row', } }>
                <Text style={ styles.text1 }>{ "and" }</Text>
                <Text style={ styles.text2 } onPress={ () => LinktoOpen('privacy') }>{ " Privacy Policy" }</Text>
            </View>
        </View>
    )
}

export default TermsAndPrivacyText

const styles = StyleSheet.create({
    text1: {
        fontFamily: 'Poppins-Light',
        color: '#8D8D8D',
        fontSize: 11,
    },
    text2: {
        fontFamily: 'Poppins-Light',
        color: '#0800FF',
        fontSize: 11,
    }
})